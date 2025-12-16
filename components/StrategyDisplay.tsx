import React from 'react';
import { Copy, Check } from 'lucide-react';

interface StrategyDisplayProps {
  content: string;
}

// A simple Markdown parser for our specific needs to avoid heavy dependencies in this environment
const MarkdownContent: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split by double newline to handle paragraphs
  const lines = text.split('\n');

  return (
    <div className="space-y-4 text-stone-800 leading-relaxed">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-serif font-bold text-rose-900 mt-8 mb-4 border-b border-rose-100 pb-2">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-serif font-bold text-stone-900 mt-6 mb-2">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-lg font-bold text-stone-800 mt-4 mb-2">{line.replace('#### ', '')}</h4>;
        }
        
        // List items
        if (line.trim().startsWith('•') || line.trim().startsWith('- ')) {
           return (
            <div key={index} className="flex gap-3 ml-2 my-1">
              <span className="text-rose-600 font-bold">•</span>
              <span className="flex-1">{line.replace(/^[•-]\s*/, '')}</span>
            </div>
           );
        }

        // Ordered lists (simple detection)
        if (/^\d+\./.test(line.trim())) {
           return (
            <div key={index} className="flex gap-3 ml-2 my-2 font-medium">
              <span className="text-rose-800">{line.match(/^\d+\./)?.[0]}</span>
              <span className="flex-1">{line.replace(/^\d+\.\s*/, '')}</span>
            </div>
           );
        }

        // Bold text parsing for lines (simple)
        const parts = line.split(/(\*\*.*?\*\*)/g);
        if (line.trim() === '') return <div key={index} className="h-2"></div>;

        return (
          <p key={index} className="text-stone-700">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};

export const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
          <span className="text-3xl">✨</span>
        </div>
        <p className="text-lg font-medium">Ready to build your strategy.</p>
        <p className="text-sm max-w-xs text-center">Fill in the brand details on the left and click Generate to summon Gemini 3.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full relative group">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="bg-white/80 backdrop-blur shadow-sm border border-stone-200 p-2 rounded-lg hover:bg-white text-stone-600 hover:text-rose-700 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
      
      <div className="bg-white shadow-xl shadow-stone-200/50 rounded-2xl p-8 lg:p-12 min-h-[50vh] border border-stone-100">
         <div className="prose prose-stone prose-rose max-w-none">
            <MarkdownContent text={content} />
         </div>
      </div>
    </div>
  );
};