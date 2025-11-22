'use client';  
import { useState } from 'react';  
  
export default function OptimizationModal({ isOpen, onClose, onApply }) {  
  const [selectedOptions, setSelectedOptions] = useState([]);  
  const [customInput, setCustomInput] = useState('');  
  const [useCustom, setUseCustom] = useState(false);  
  
  // 预定义的优化选项  
  const optimizationOptions = [  
    { id: 'layout', label: '优化布局' },  
    { id: 'color', label: '优化配色' },  
    { id: 'font', label: '优化字体' },  
    { id: 'alignment', label: '对齐元素' },  
  ];  
  
  if (!isOpen) return null;  
  
  return (  
    <div className="fixed inset-0 z-60 flex items-center justify-center">  
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />  
        <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6">  
            
        {/* 标题 */}  
        <h2 className="text-lg font-semibold mb-4">优化选项</h2>  
            
        {/* 模式切换 - 第一部分 */}  
        <div className="mb-4 flex items-center space-x-4">  
            <label className="flex items-center cursor-pointer">  
            <input  
                type="radio"  
                checked={!useCustom}  
                onChange={() => setUseCustom(false)}  
                className="mr-2"  
            />  
            <span className="text-sm text-gray-700">从列表选择</span>  
            </label>  
            <label className="flex items-center cursor-pointer">  
            <input  
                type="radio"  
                checked={useCustom}  
                onChange={() => setUseCustom(true)}  
                className="mr-2"  
            />  
            <span className="text-sm text-gray-700">自定义输入</span>  
            </label>  
        </div>  
    
        {/* 复选框列表 - 你问的这段代码放在这里 */}  
        {!useCustom && (  
            <div className="space-y-2 mb-4">  
            {optimizationOptions.map((option) => (  
                <label key={option.id} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded">  
                <input  
                    type="checkbox"  
                    checked={selectedOptions.includes(option.id)}  
                    onChange={(e) => {  
                    if (e.target.checked) {  
                        setSelectedOptions([...selectedOptions, option.id]);  
                    } else {  
                        setSelectedOptions(selectedOptions.filter(id => id !== option.id));  
                    }  
                    }}  
                    className="mr-3"  
                />  
                <span className="text-sm text-gray-700">{option.label}</span>  
                </label>  
            ))}  
            </div>  
        )}  
    
        {/* 自定义输入框 - 第三部分 */}  
        {useCustom && (  
            <div className="mb-4">  
            <textarea  
                value={customInput}  
                onChange={(e) => setCustomInput(e.target.value)}  
                placeholder="请输入优化要求..."  
                rows={4}  
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"  
            />  
            </div>  
        )}  
    
        {/* 操作按钮 */}  
        <div className="flex justify-end gap-2">  
            <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">  
            取消  
            </button>  
            <button  
            onClick={() => {  
                const result = useCustom ? customInput : selectedOptions.join(', ');  
                onApply(result);  
                onClose();  
            }}  
            disabled={useCustom ? !customInput.trim() : selectedOptions.length === 0}  
            className="px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-800 disabled:bg-gray-400"  
            >  
            应用优化  
            </button>  
        </div>  
        </div>  
    </div>  
    );
}