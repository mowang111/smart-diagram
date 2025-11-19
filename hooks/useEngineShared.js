'use client';

import { useState, useCallback } from 'react';
import { historyManager } from '@/lib/history-manager';
import { getConfig, isConfigValid } from '@/lib/config';
// 在 useEngineShared.js 顶部导入  
import { promptTemplateManager } from '@/lib/prompt-template-manager';
import { CONTINUATION_SYSTEM_PROMPT, createContinuationPrompt } from '@/lib/prompts/drawio';

/**
 * 共享的引擎逻辑 Hook
 * 提供两个引擎（Draw.io 和 Excalidraw）的通用功能
 */
export function useEngineShared() {
  // 生成唯一对话 ID
  const newConversationId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // 共享状态
  const [usedCode, setUsedCode] = useState('');
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [conversationId, setConversationId] = useState(newConversationId());
  const [lastError, setLastError] = useState(null);

  /**
   * 将图片文件转为 base64
   */
  const fileToBase64 = useCallback(
    (file) =>
      new Promise((resolve) => {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result || '';
            const base64 =
              typeof result === 'string' ? result.split(',')[1] : '';
            resolve(base64 || '');
          };
          reader.onerror = () => resolve('');
          reader.readAsDataURL(file);
        } catch {
          resolve('');
        }
      }),
    [],
  );

  /**
   * 构建 multimodal 用户消息
   * @param {string} textContent - 文本内容
   * @param {Array} attachments - 附件数组
   * @returns {Object} 用户消息对象
   */
  const buildUserMessage = useCallback(
    async (textContent, attachments = []) => {
      const userMessage = {
        role: 'user',
        content: textContent,
      };

      // 处理图片附件
      if (Array.isArray(attachments) && attachments.length > 0) {
        const imageAttachments = attachments.filter(
          (att) => att.kind === 'image',
        );
        if (imageAttachments.length > 0) {
          const encodedImages = await Promise.all(
            imageAttachments.map(async ({ file, type, name }) => ({
              data: await fileToBase64(file),
              mimeType: (file && file.type) || type || 'image/png',
              name: (file && file.name) || name || 'image',
            })),
          );

          userMessage.content = [
            { type: 'text', text: textContent },
            ...encodedImages.map((img) => ({
              type: 'image_url',
              image_url: {
                url: `data:${img.mimeType};base64,${img.data}`,
              },
            })),
          ];
        }
      }

      return userMessage;
    },
    [fileToBase64],
  );

  /**
   * 构建完整的 messages 数组
   * @param {Object} systemMessage - 系统消息
   * @param {Object} userMessage - 用户消息
   * @param {Array} currentMessages - 当前消息历史
   * @param {number} historyLimit - 历史消息限制条数
   * @returns {Array} 完整的消息数组
   */
  // 修改 buildFullMessages 函数  
  const buildFullMessages = useCallback(  
    (systemMessage, userMessage, currentMessages, historyLimit = 3) => {  
      // 获取当前激活的模板  
      const activeTemplate = promptTemplateManager.getActiveTemplate();  
        
      // 如果有激活的模板,使用模板的 systemPrompt 覆盖默认的  
      const finalSystemMessage = activeTemplate   
        ? { role: 'system', content: activeTemplate.systemPrompt }  
        : systemMessage;  
        
      const history = currentMessages  
        .filter(  
          (m) =>  
            ['user', 'assistant'].includes(m.role) &&  
            typeof m.content === 'string',  
        )  
        .slice(-historyLimit);  
    
      return [finalSystemMessage, ...history, userMessage];  
    },  
    [],  
  );

  /**
   * 调用 LLM 流式接口并处理响应
   * @param {Object} llmConfig - LLM 配置
   * @param {Array} fullMessages - 完整消息数组
   * @returns {Promise<string>} 累积的生成内容
   */
  const callLLMStream = useCallback(async (llmConfig, fullMessages) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    // 如果启用了访问密码模式，则通过请求头传递 access-password，
    // 由服务端根据环境变量自动注入 apiKey
    if (typeof window !== 'undefined') {
      try {
        const usePassword =
          localStorage.getItem('smart-diagram-use-password') === 'true';
        const accessPassword =
          localStorage.getItem('smart-diagram-access-password') || '';
        if (usePassword && accessPassword) {
          headers['x-access-password'] = accessPassword;
        }
      } catch {
        // ignore
      }
    }

    const response = await fetch('/api/llm/stream', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        config: llmConfig,
        messages: fullMessages,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'LLM 请求失败';
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // Failed to parse error response, use status text
        errorMessage = `请求失败 (${response.status}): ${response.statusText}`;
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    return response;
  }, []);

  /**
   * 处理 SSE 流式响应
   * @param {Response} response - Fetch 响应对象
   * @param {Function} onChunk - 每次接收到内容时的回调
   * @returns {Promise<string>} 完整累积的内容
   */
  const processSSEStream = useCallback(async (response, onChunk) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedCode = '';
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const events = buffer.split('\n\n');
      buffer = events.pop() || '';

      for (const evt of events) {
        if (!evt.startsWith('data: ')) continue;
        const jsonStr = evt.slice(6);
        if (jsonStr === '[DONE]') continue;

        try {
          const data = JSON.parse(jsonStr);
          if (data?.error) {
            throw new Error(data.error);
          }
          if (typeof data?.content === 'string') {
            accumulatedCode += data.content;
            if (onChunk) onChunk(accumulatedCode);
          }
        } catch (e) {
          console.error('SSE 解析错误:', e);
          throw new Error(`流式响应解析失败: ${e.message}`);
        }
      }
    }

    return accumulatedCode;
  }, []);

  /**
   * 处理 SSE 流式响应（备用解析方式，按行分割）
   * @param {Response} response - Fetch 响应对象
   * @param {Function} onChunk - 每次接收到内容时的回调
   * @returns {Promise<string>} 完整累积的内容
   */
  const processSSEStreamAlt = useCallback(async (response, onChunk) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedCode = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const t = line.trim();
        if (!t || t === 'data: [DONE]') continue;
        if (t.startsWith('data: ')) {
          try {
            const data = JSON.parse(t.slice(6));
            if (data.content) {
              accumulatedCode += data.content;
              if (onChunk) onChunk(accumulatedCode);
            } else if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            console.error('SSE 解析错误:', e);
            throw new Error(`流式响应解析失败: ${e.message}`);
          }
        }
      }
    }

    return accumulatedCode;
  }, []);

  /**
   * 新建对话：重置状态
   */
  const handleNewChat = useCallback(() => {
    setMessages([]);
    setUsedCode('');
    setStreamingContent('');
    setLastError(null);
    setConversationId(newConversationId());
  }, []);

  /**
   * 恢复历史对话基础逻辑
   * @param {Object} history - 历史记录对象
   * @param {Function} applyCodeFn - 应用代码的函数
   */
  const restoreHistoryBase = useCallback(
    async (history, applyCodeFn) => {
      try {
        setConversationId(history.id);

        const msgs = await historyManager.getConversationMessages(history.id);
        setMessages(msgs || []);

        if (applyCodeFn) {
          await applyCodeFn(history.usedCode || '');
        }
      } catch (error) {
        console.error('Restore history error:', error);
      }
    },
    [],
  );

  /**
   * 验证 LLM 配置是否有效
   * @param {Function} showNotification - 通知函数
   * @returns {Object|null} 返回有效的配置对象，或 null
   */
  const validateConfig = useCallback((showNotification) => {
    const activeConfig = getConfig();
    if (!isConfigValid(activeConfig)) {
      if (showNotification) {
        showNotification({
          title: '配置缺失',
          message: '请先在右上角配置 LLM',
          type: 'error',
        });
      }
      return null;
    }

    const baseConfig = {
      type: activeConfig.type,
      baseUrl: activeConfig.baseUrl,
      model: activeConfig.model,
    };

    // 本地配置模式下才需要在前端携带 apiKey；
    // 访问密码模式下 apiKey 仅存在于服务端环境变量中。
    if (typeof window === 'undefined') {
      return { ...baseConfig, apiKey: activeConfig.apiKey };
    }

    try {
      const usePassword =
        localStorage.getItem('smart-diagram-use-password') === 'true';
      if (!usePassword) {
        return { ...baseConfig, apiKey: activeConfig.apiKey };
      }
    } catch {
      // 读取失败时退回到直接返回 apiKey（用于本地配置）
      return { ...baseConfig, apiKey: activeConfig.apiKey };
    }

    // 访问密码模式：不在前端传播 apiKey
    return baseConfig;
  }, []);

  const handleContinueGeneration = useCallback(  
    async (incompleteCode) => {  
      if (isGenerating) return;  
        
      setIsGenerating(true);  
      setStreamingContent('');  
        
      try {  
        const continuationPrompt = createContinuationPrompt(incompleteCode);  
          
        const systemMessage = {  
          role: 'system',  
          content: CONTINUATION_SYSTEM_PROMPT  
        };  
          
        const userMessage = {  
          role: 'user',  
          content: continuationPrompt  
        };  
          
        const fullMessages = [systemMessage, userMessage];  
          
        const config = validateConfig();  
        if (!config) {  
          setMessages(prev => [...prev, {  
            role: 'system',  
            content: '❌ 请先配置 LLM'  
          }]);  
          return;  
        }  
          
        const response = await callLLMStream(config, fullMessages);  
        const continuedCode = await processSSEStream(  
          response,  
          (chunk) => setStreamingContent(chunk)  
        );  

        // 确保 incompleteCode 不包含 markdown 标记  
        const cleanContinueCode = continuedCode.replace(/```(xml|json)?\s*/gi, '').replace(/```\s*$/gi, ''); 
          
        const fullCode = incompleteCode + '\n' + cleanContinueCode;  
          
        // 修改这里:更新最后一条 assistant 消息,而不是添加新消息  
        setMessages(prev => {  
          const newMessages = [...prev];  
          // 从后往前找到最后一条 assistant 消息  
          for (let i = newMessages.length - 1; i >= 0; i--) {  
            if (newMessages[i].role === 'assistant') {  
              // 更新这条消息的内容  
              newMessages[i] = {  
                ...newMessages[i],  
                content: fullCode  
              };  
              break;  
            }  
          }  
          return newMessages;  
        });  
        console.log('Full continued code:', fullCode);
        setUsedCode(fullCode);  
          
      } catch (error) {  
        console.error('Continue generation failed:', error);  
        setMessages(prev => [...prev, {  
          role: 'system',  
          content: `❌ 继续生成失败: ${error.message}`  
        }]);  
      } finally {  
        setIsGenerating(false);  
        setStreamingContent('');  
      }  
    },  
    [isGenerating, validateConfig, callLLMStream, processSSEStream]  
  );

  return {
    // 状态
    usedCode,
    setUsedCode,
    messages,
    setMessages,
    isGenerating,
    setIsGenerating,
    streamingContent,
    setStreamingContent,
    conversationId,
    setConversationId,
    lastError,
    setLastError,

    // 工具函数
    fileToBase64,
    buildUserMessage,
    buildFullMessages,
    callLLMStream,
    processSSEStream,
    processSSEStreamAlt,
    validateConfig,

    // 操作
    handleNewChat,
    restoreHistoryBase,
    handleContinueGeneration,  // 新增这一行  
  };
}
