import React, { useState, useRef, useEffect } from 'react';
import { InputPanel } from './components/InputPanel';
import { StrategyDisplay } from './components/StrategyDisplay';
import { SocialTemplate } from './components/SocialTemplate';
import { MarketingInputs, StreamStatus } from './types';
import { DEFAULT_INPUTS } from './constants';
import { generateMarketingStrategyStream } from './services/geminiService';
import { LayoutDashboard, PenTool } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<MarketingInputs>(DEFAULT_INPUTS);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [status, setStatus] = useState<StreamStatus>(StreamStatus.IDLE);
  const [activeTab, setActiveTab] = useState<'strategy' | 'social'>('strategy');
  const contentEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (status === StreamStatus.streaming && contentEndRef.current && activeTab === 'strategy') {
        // Optional: Scroll to bottom while generating
    }
  }, [generatedContent, status, activeTab]);

  const handleGenerate = async () => {
    if (status === StreamStatus.streaming) return;

    // Ensure we are on the strategy tab when generating
    setActiveTab('strategy');
    setGeneratedContent('');
    setStatus(StreamStatus.streaming);

    try {
      await generateMarketingStrategyStream(inputs, (chunk) => {
        setGeneratedContent(prev => prev + chunk);
      });
      setStatus(StreamStatus.COMPLETED);
    } catch (error) {
      console.error(error);
      setStatus(StreamStatus.ERROR);
      setGeneratedContent(prev => prev + "\n\n[Error generating strategy. Please verify API Key and try again.]");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 flex-col lg:flex-row">
      
      {/* Navigation Sidebar (Desktop) */}
      <div className="hidden lg:flex flex-col w-20 bg-stone-900 text-stone-300 items-center py-6 gap-6 z-20 shadow-xl shrink-0">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-rose-900 text-white flex items-center justify-center font-bold font-serif text-lg shadow-lg mb-4">
            G3
         </div>
         
         <button 
           onClick={() => setActiveTab('strategy')}
           className={`p-3 rounded-xl transition-all ${activeTab === 'strategy' ? 'bg-white/10 text-white shadow-inner' : 'hover:bg-white/5 hover:text-white'}`}
           title="Strategy Engine"
         >
           <LayoutDashboard size={24} />
         </button>

         <button 
           onClick={() => setActiveTab('social')}
           className={`p-3 rounded-xl transition-all ${activeTab === 'social' ? 'bg-white/10 text-white shadow-inner' : 'hover:bg-white/5 hover:text-white'}`}
           title="Social Studio"
         >
           <PenTool size={24} />
         </button>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-stone-900 z-50 border-b border-stone-800 p-3 flex items-center justify-between shadow-md">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center font-bold font-serif text-sm">G3</div>
            <span className="font-serif font-bold text-stone-100">Strategist</span>
         </div>
         <div className="flex gap-2 bg-stone-800 p-1 rounded-lg">
             <button 
                onClick={() => setActiveTab('strategy')}
                className={`p-2 rounded-md transition-all ${activeTab === 'strategy' ? 'bg-stone-700 text-white' : 'text-stone-400'}`}
             >
               <LayoutDashboard size={18} />
             </button>
             <button 
                onClick={() => setActiveTab('social')}
                className={`p-2 rounded-md transition-all ${activeTab === 'social' ? 'bg-stone-700 text-white' : 'text-stone-400'}`}
             >
               <PenTool size={18} />
             </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex h-full overflow-hidden relative pt-14 lg:pt-0">
        
        {activeTab === 'strategy' ? (
          <>
            {/* Strategy Layout */}
            <div className="hidden lg:block h-full shrink-0">
              <InputPanel 
                  inputs={inputs} 
                  setInputs={setInputs} 
                  onGenerate={handleGenerate}
                  status={status}
              />
            </div>

            <div className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-stone-50">
              <main className="p-4 lg:p-12 pb-32">
                <StrategyDisplay content={generatedContent} />
                <div ref={contentEndRef} />
              </main>
              
              {/* Mobile FAB for Inputs */}
              <div className="lg:hidden fixed bottom-6 right-6 z-30">
                 <button 
                   onClick={() => document.getElementById('mobile-inputs')?.classList.toggle('translate-y-full')}
                   className="bg-rose-900 text-white p-4 rounded-full shadow-xl"
                 >
                   <LayoutDashboard />
                 </button>
              </div>

              {/* Mobile Inputs Drawer */}
              <div 
                 id="mobile-inputs" 
                 className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white shadow-2xl transform transition-transform duration-300 translate-y-full rounded-t-2xl h-[80vh] flex flex-col"
              >
                  <div className="p-2 flex justify-center border-b border-stone-100" onClick={() => document.getElementById('mobile-inputs')?.classList.add('translate-y-full')}>
                    <div className="w-12 h-1.5 bg-stone-300 rounded-full my-2"></div>
                  </div>
                  <InputPanel 
                    inputs={inputs} 
                    setInputs={setInputs} 
                    onGenerate={() => {
                       handleGenerate();
                       document.getElementById('mobile-inputs')?.classList.add('translate-y-full');
                    }}
                    status={status}
                  />
              </div>
            </div>
          </>
        ) : (
          /* Social Studio Layout */
          <SocialTemplate />
        )}

      </div>
    </div>
  );
};

export default App;