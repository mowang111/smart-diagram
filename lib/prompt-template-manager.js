// lib/prompt-template-manager.js  
'use client';  
  
class PromptTemplateManager {  
  constructor() {  
    this.templates = [];  
    this.activeTemplateId = null;  
    this.isLoaded = false;  
  }  
  
  // localStorage keys  
  static TEMPLATES_KEY = 'smart-diagram-prompt-templates';  
  static ACTIVE_TEMPLATE_KEY = 'smart-diagram-active-prompt-template';  
  
  generateId() {  
    return `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;  
  }  
  
  ensureLoaded() {  
    if (this.isLoaded) return;  
    this.loadTemplates();  
    this.isLoaded = true;  
  }  
  
  loadTemplates() {  
    if (typeof window === 'undefined') return;  
      
    try {  
      const stored = localStorage.getItem(PromptTemplateManager.TEMPLATES_KEY);  
      this.templates = stored ? JSON.parse(stored) : this.getDefaultTemplates();  
        
      const activeId = localStorage.getItem(PromptTemplateManager.ACTIVE_TEMPLATE_KEY);  
      this.activeTemplateId = activeId || (this.templates[0]?.id || null);  
    } catch (error) {  
      console.error('Failed to load prompt templates:', error);  
      this.templates = this.getDefaultTemplates();  
    }  
  }  
  
  getDefaultTemplates() {  
    return [  
      {  
      id: 'academic_paper_standard',  
      name: '学术论文标准模板 (顶会标准)',  
      description: '符合顶级学术会议标准的 draw.io 图表生成模板,包含完整的字体、颜色、布局规范',  
      systemPrompt: `你是 draw.io 图表代码生成器。直接输出符合顶级学术会议标准的 mxGraph XML 代码。  
  
## 输出规则  
1. 只输出 XML 代码,禁止任何文字说明  
2. 不使用 markdown 标记(如 \`\`\`xml)  
3. 从 <mxfile> 开始,到 </mxfile> 结束  
4. 完整生成所有元素,不中途停止  
5. 接近长度限制时,优先闭合标签  
6. 采用渐进式:核心结构优先,然后细节  
7. 确保 XML 有效,特殊字符转义  
8. 图表中尽量使用中文
  
## 学术论文绘图规范(顶会标准)  
  
### 1. 字体要求  
- **字体**:Arial 或 Helvetica(无衬线字体)。必须在 style 中显式指定 fontFamily=Arial;。  
- **字号**:  
  - 标题(如图 (a) (b)):14-16pt  
  - 正文标注(节点内文字):10-12pt  
  - 图例说明:9-10pt  
- **字重**:normal(避免过粗或过细)。  
  
### 2. 颜色规范(学术标准)  
- **主色调**:优先使用**方案1:灰度系**(#F7F9FC, #2C3E50),确保黑白打印清晰。  
- **语义配色**:仅在需要区分不同语义时,才使用**方案2:蓝色系**(#dae8fc)或**方案5:红色系**(#f8cecc,用于表示错误/瓶颈)。  
- **色盲友好**:避免红绿组合,使用蓝橙组合。  
- **对比度**:文字与背景对比度 ≥ 4.5:1。  
  
### 3. 线条规范  
- **线宽**:strokeWidth=1 或 2(重要连接用 2)。  
- **线型**:实线(dashed=0)为主,虚线(dashed=1)表示辅助关系或异步。  
- **箭头**:必须使用简洁、清晰的实心三角箭头。在 style 中指定 endArrow=classicBlock;html=1;。  
  
### 4. 布局要求  
- **对齐**:所有元素必须严格对齐。坐标使用 10 的倍数(gridSize="10")。  
- **间距**:元素间距保持一致,至少 40-60px。  
- **留白**:图表四周留白至少 10%,保持简洁,不拥挤。  
- **比例**:保持 4:3 或 16:9 的宽高比。  
  
### 5. 标注规范  
- **编号**:子图使用 (a), (b), (c) 编号。  
- **单位**:必须清晰标注单位(如 ms, MB, %)。  
- **图例**:复杂图表**必须**包含图例说明(Legend)。  
- **简洁**:避免冗余文字。  
- **富文本**:允许在 value 属性中使用 HTML 实体(如 &lt;b&gt;、&lt;br&gt;、&lt;i&gt;)来实现多行或带标题的标注。  
  
## 最佳实践  
1. **网格对齐**:所有坐标使用 10 的倍数。  
2. **一致性**:同类元素使用相同尺寸和样式。  
3. **简洁性**:最小化文字,用符号和图例代替。  
4. **专业性**:使用标准术语和规范。  
5. **可读性**:确保黑白打印清晰(首选灰度方案)。  
6. **独立性**:图表应能脱离正文独立理解。`,  
      createdAt: new Date().toISOString(),  
      updatedAt: new Date().toISOString(),  
    }
    ];  
  }  
  
  saveTemplates() {  
    if (typeof window === 'undefined') return;  
    try {  
      localStorage.setItem(  
        PromptTemplateManager.TEMPLATES_KEY,  
        JSON.stringify(this.templates)  
      );  
    } catch (error) {  
      console.error('Failed to save templates:', error);  
    }  
  }  
  
  saveActiveTemplateId() {  
    if (typeof window === 'undefined') return;  
    try {  
      localStorage.setItem(  
        PromptTemplateManager.ACTIVE_TEMPLATE_KEY,  
        this.activeTemplateId || ''  
      );  
    } catch (error) {  
      console.error('Failed to save active template ID:', error);  
    }  
  }  
  
  getAllTemplates() {  
    this.ensureLoaded();  
    return [...this.templates];  
  }  
  
  getTemplate(id) {  
    this.ensureLoaded();  
    return this.templates.find(t => t.id === id);  
  }  
  
  getActiveTemplate() {  
    this.ensureLoaded();  
    return this.templates.find(t => t.id === this.activeTemplateId);  
  }  
  
  setActiveTemplate(id) {  
    this.ensureLoaded();  
    const template = this.templates.find(t => t.id === id);  
    if (template) {  
      this.activeTemplateId = id;  
      this.saveActiveTemplateId();  
      return template;  
    }  
    return null;  
  }  
  
  createTemplate(templateData) {  
    this.ensureLoaded();  
    const newTemplate = {  
      id: this.generateId(),  
      name: templateData.name,  
      description: templateData.description || '',  
      systemPrompt: templateData.systemPrompt,  
      createdAt: new Date().toISOString(),  
      updatedAt: new Date().toISOString(),  
    };  
      
    this.templates.push(newTemplate);  
    this.saveTemplates();  
      
    if (!this.activeTemplateId) {  
      this.setActiveTemplate(newTemplate.id);  
    }  
      
    return newTemplate;  
  }  
  
  updateTemplate(id, updateData) {  
    this.ensureLoaded();  
    const index = this.templates.findIndex(t => t.id === id);  
    if (index === -1) return null;  
      
    this.templates[index] = {  
      ...this.templates[index],  
      ...updateData,  
      id,  
      updatedAt: new Date().toISOString(),  
    };  
      
    this.saveTemplates();  
    return this.templates[index];  
  }  
  
  deleteTemplate(id) {  
    this.ensureLoaded();  
    const index = this.templates.findIndex(t => t.id === id);  
    if (index === -1) return false;  
      
    this.templates.splice(index, 1);  
    this.saveTemplates();  
      
    if (this.activeTemplateId === id) {  
      this.activeTemplateId = this.templates[0]?.id || null;  
      this.saveActiveTemplateId();  
    }  
      
    return true;  
  }  
}  
  
export const promptTemplateManager = new PromptTemplateManager();