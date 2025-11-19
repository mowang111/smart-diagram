// components/PromptTemplateManager.jsx  
'use client';  
  
import { useState, useEffect } from 'react';  
import { promptTemplateManager } from '@/lib/prompt-template-manager';  
  
export default function PromptTemplateManager({ isOpen, onClose }) {  
  const [templates, setTemplates] = useState([]);  
  const [activeTemplateId, setActiveTemplateId] = useState(null);  
  const [editingTemplate, setEditingTemplate] = useState(null);  
  const [isCreating, setIsCreating] = useState(false);  
  const [notification, setNotification] = useState(null);  
  const [confirmDialog, setConfirmDialog] = useState(null);  
  
  useEffect(() => {  
    if (isOpen) {  
      loadTemplates();  
    }  
  }, [isOpen]);  
  
  const loadTemplates = () => {  
    const allTemplates = promptTemplateManager.getAllTemplates();  
    const activeTemplate = promptTemplateManager.getActiveTemplate();  
    setTemplates(allTemplates);  
    setActiveTemplateId(activeTemplate?.id || null);  
  };  
  
  const handleCreateNew = () => {  
    setEditingTemplate({  
      name: '',  
      description: '',  
      systemPrompt: '',  
    });  
    setIsCreating(true);  
  };  
  
  const handleEdit = (template) => {  
    setEditingTemplate({ ...template });  
    setIsCreating(false);  
  };  
  
  const handleSave = (templateData) => {  
    try {  
      if (isCreating) {  
        promptTemplateManager.createTemplate(templateData);  
        setNotification({  
          type: 'success',  
          message: '模板创建成功',  
        });  
      } else {  
        promptTemplateManager.updateTemplate(editingTemplate.id, templateData);  
        setNotification({  
          type: 'success',  
          message: '模板更新成功',  
        });  
      }  
      setEditingTemplate(null);  
      loadTemplates();  
    } catch (error) {  
      setNotification({  
        type: 'error',  
        message: `操作失败: ${error.message}`,  
      });  
    }  
  };  
  
  const handleDelete = (template) => {  
    setConfirmDialog({  
      title: '删除模板',  
      message: `确定要删除模板 "${template.name}" 吗？`,  
      onConfirm: () => {  
        promptTemplateManager.deleteTemplate(template.id);  
        setNotification({  
          type: 'success',  
          message: '模板已删除',  
        });  
        setConfirmDialog(null);  
        loadTemplates();  
      },  
      onCancel: () => setConfirmDialog(null),  
    });  
  };  
  
  const handleSetActive = (template) => {  
    promptTemplateManager.setActiveTemplate(template.id);  
    setActiveTemplateId(template.id);  
    setNotification({  
      type: 'success',  
      message: `已切换到模板: ${template.name}`,  
    });  
  };  
  
  if (!isOpen) return null;  
  
  return (  
    <div className="fixed inset-0 z-60 flex items-center justify-center">  
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />  
        
      <div className="relative bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">  
        {/* Header */}  
        <div className="flex items-center justify-between px-5 py-3 border-b">  
          <h2 className="text-lg font-semibold">Prompt 模板管理</h2>  
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">  
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
            </svg>  
          </button>  
        </div>  
  
        {/* Body */}  
        <div className="flex-1 overflow-y-auto p-5">  
          {editingTemplate ? (  
            <TemplateEditor  
              template={editingTemplate}  
              isCreating={isCreating}  
              onSave={handleSave}  
              onCancel={() => setEditingTemplate(null)}  
            />  
          ) : (  
            <>  
              <div className="flex justify-between items-center mb-4">  
                <p className="text-sm text-gray-600">  
                  共 {templates.length} 个模板  
                </p>  
                <button  
                  onClick={handleCreateNew}  
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"  
                >  
                  + 新建模板  
                </button>  
              </div>  
  
              <div className="space-y-3">  
                {templates.map((template) => (  
                  <div  
                    key={template.id}  
                    className={`border rounded-lg p-4 ${  
                      template.id === activeTemplateId  
                        ? 'border-blue-500 bg-blue-50'  
                        : 'border-gray-200'  
                    }`}  
                  >  
                    <div className="flex items-start justify-between">  
                      <div className="flex-1">  
                        <div className="flex items-center gap-2 mb-1">  
                          <h3 className="font-medium">{template.name}</h3>  
                          {template.id === activeTemplateId && (  
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">  
                              当前使用  
                            </span>  
                          )}  
                        </div>  
                        {template.description && (  
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>  
                        )}  
                        <p className="text-xs text-gray-500 line-clamp-2">  
                          {template.systemPrompt}  
                        </p>  
                      </div>  
                        
                      <div className="flex items-center gap-2 ml-4">  
                        {template.id !== activeTemplateId && (  
                          <button  
                            onClick={() => handleSetActive(template)}  
                            className="p-2 text-gray-600 hover:text-blue-600"  
                            title="设为当前模板"  
                          >  
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />  
                            </svg>  
                          </button>  
                        )}  
                        <button  
                          onClick={() => handleEdit(template)}  
                          className="p-2 text-gray-600 hover:text-gray-900"  
                          title="编辑"  
                        >  
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />  
                          </svg>  
                        </button>  
                        <button  
                          onClick={() => handleDelete(template)}  
                          className="p-2 text-gray-600 hover:text-red-600"  
                          title="删除"  
                        >  
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />  
                          </svg>  
                        </button>  
                      </div>  
                    </div>  
                  </div>  
                ))}  
              </div>  
            </>  
          )}  
        </div>  
      </div>  
  
      {/* Notification */}  
      {notification && (  
        <div className="fixed bottom-4 right-4 z-70">  
          <div className={`px-4 py-3 rounded-lg shadow-lg ${  
            notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'  
          }`}>  
            <p className={`text-sm ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>  
              {notification.message}  
            </p>  
          </div>  
        </div>  
      )}  
  
      {/* Confirm Dialog */}  
      {confirmDialog && (  
        <div className="fixed inset-0 z-70 flex items-center justify-center">  
          <div className="absolute inset-0 bg-black/50" onClick={confirmDialog.onCancel} />  
          <div className="relative bg-white rounded-lg p-6 max-w-sm mx-4">  
            <h3 className="text-lg font-semibold mb-2">{confirmDialog.title}</h3>  
            <p className="text-gray-600 mb-4">{confirmDialog.message}</p>  
            <div className="flex justify-end gap-2">  
              <button  
                onClick={confirmDialog.onCancel}  
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"  
              >  
                取消  
              </button>  
              <button  
                onClick={confirmDialog.onConfirm}  
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"  
              >  
                确认删除  
              </button>  
            </div>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}  
  
// 模板编辑器组件  
function TemplateEditor({ template, isCreating, onSave, onCancel }) {  
  const [formData, setFormData] = useState(template);  
  const [error, setError] = useState('');  
  
  const handleSubmit = () => {  
    if (!formData.name || !formData.systemPrompt) {  
      setError('模板名称和系统提示词为必填项');  
      return;  
    }  
    onSave(formData);  
  };  
  
  return (  
    <div className="space-y-4">  
      <h3 className="text-lg font-semibold">{isCreating ? '新建模板' : '编辑模板'}</h3>  
        
      {error && (  
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded">  
          <p className="text-sm text-red-800">{error}</p>  
        </div>  
      )}  
  
      <div>  
        <label className="block text-sm font-medium text-gray-700 mb-1">  
          模板名称 <span className="text-red-500">*</span>  
        </label>  
        <input  
          type="text"  
          value={formData.name}  
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}  
          placeholder="例如：技术文档模板"  
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"  
        />  
      </div>  
  
      <div>  
        <label className="block text-sm font-medium text-gray-700 mb-1">  
          描述  
        </label>  
        <input  
          type="text"  
          value={formData.description}  
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}  
          placeholder="简要描述此模板的用途"  
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"  
        />  
      </div>  
  
      <div>  
        <label className="block text-sm font-medium text-gray-700 mb-1">  
          系统提示词 <span className="text-red-500">*</span>  
        </label>  
        <textarea  
          value={formData.systemPrompt}  
          onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}  
          placeholder="输入系统提示词..."  
          rows={8}  
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"  
        />  
      </div>  
  
      <div className="flex justify-end gap-2">  
        <button  
          onClick={onCancel}  
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"  
        >  
          取消  
        </button>  
        <button  
          onClick={handleSubmit}  
          className="px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-800"  
        >  
          {isCreating ? '创建' : '保存'}  
        </button>  
      </div>  
    </div>  
  );  
}