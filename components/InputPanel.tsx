import React from 'react';
import { MarketingInputs, StreamStatus } from '../types';
import { Wine, Target, Rocket, MessageCircle } from 'lucide-react';

interface InputPanelProps {
  inputs: MarketingInputs;
  setInputs: React.Dispatch<React.SetStateAction<MarketingInputs>>;
  onGenerate: () => void;
  status: StreamStatus;
}

export const InputPanel: React.FC<InputPanelProps> = ({ inputs, setInputs, onGenerate, status }) => {
  
  const handleChange = (field: keyof MarketingInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const isGenerating = status === StreamStatus.streaming;

  return (
    <div className="w-full lg:w-96 bg-white border-r border-stone-200 h-full flex flex-col shadow-xl z-10">
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-bold font-serif">
            G3
          </div>
          <h1 className="text-xl font-bold font-serif text-stone-800 tracking-tight">Strategy Engine</h1>
        </div>
        <p className="text-xs text-stone-500 ml-10">Powered by Gemini 3 Pro • v1.1</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Product Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Wine size={16} className="text-rose-600" />
            Product / Service
          </label>
          <textarea
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none h-24 text-stone-700"
            value={inputs.product}
            onChange={(e) => handleChange('product', e.target.value)}
            placeholder="Describe your product..."
          />
        </div>

        {/* Audience Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Target size={16} className="text-rose-600" />
            Target Audience
          </label>
          <textarea
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none h-24 text-stone-700"
            value={inputs.audience}
            onChange={(e) => handleChange('audience', e.target.value)}
            placeholder="Who are you selling to?"
          />
        </div>

        {/* Goal Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Rocket size={16} className="text-rose-600" />
            Launch Goal
          </label>
          <input
            type="text"
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-stone-700"
            value={inputs.launchGoal}
            onChange={(e) => handleChange('launchGoal', e.target.value)}
            placeholder="e.g. Brand Awareness"
          />
        </div>

        {/* Tone Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <MessageCircle size={16} className="text-rose-600" />
            Brand Tone
          </label>
          <textarea
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none h-20 text-stone-700"
            value={inputs.brandTone}
            onChange={(e) => handleChange('brandTone', e.target.value)}
            placeholder="e.g. Professional, Witty..."
          />
        </div>
      </div>

      <div className="p-6 border-t border-stone-100 bg-white">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
            ${isGenerating 
              ? 'bg-stone-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-rose-700 to-rose-900 hover:shadow-rose-900/20'
            }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Strategizing...
            </>
          ) : (
            'Generate Strategy'
          )}
        </button>
      </div>
    </div>
  );
};