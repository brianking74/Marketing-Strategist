
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, Award, Quote, Download, Palette, Star, MessageSquare, Plus, Check, Image as ImageIcon, Wine, Hash, Smartphone, Square, Tag, Banknote, DollarSign, Facebook, Instagram, Share2, X, Send, Loader2, Link } from 'lucide-react';

interface TemplateData {
  wineName: string;
  tagline: string;
  badgeText: string;
  rrpPrice: string;
  offerPrice: string;
  quote: string;
  quoteAuthor: string;
  score: string;
  award: string;
  accentColor: string;
  bgImage: string | null;
  bottleImage: string | null;
  hashtags: string;
}

const DEFAULT_DATA: TemplateData = {
  wineName: "Château Margaux 2015",
  tagline: "Experience the elegance of Bordeaux.",
  badgeText: "New Arrival",
  rrpPrice: "$1,500",
  offerPrice: "$1,250",
  quote: "An absolute masterpiece of balance and density. The finish goes on for minutes.",
  quoteAuthor: "James Suckling",
  score: "99",
  award: "Double Gold",
  accentColor: "#881337",
  bgImage: null,
  bottleImage: null,
  hashtags: "#ChaliceAndCru #FineWine #Bordeaux #SommelierSelect"
};

const COLOR_OPTIONS = [
  { name: 'Bordeaux', hex: '#881337' },
  { name: 'Crimson', hex: '#991b1b' },
  { name: 'Burnt Orange', hex: '#ea580c' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Olive', hex: '#65a30d' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Cyan', hex: '#0891b2' },
  { name: 'Ocean', hex: '#0c4a6e' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Fuchsia', hex: '#c026d3' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Black', hex: '#171717' },
];

export const SocialTemplate: React.FC = () => {
  const [data, setData] = useState<TemplateData>(DEFAULT_DATA);
  const [previewTab, setPreviewTab] = useState<'both' | 'square' | 'portrait'>('both');
  const [isSocialConnected, setIsSocialConnected] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postStatus, setPostStatus] = useState<'idle' | 'posting' | 'success'>('idle');
  
  const bgInputRef = useRef<HTMLInputElement>(null);
  const bottleInputRef = useRef<HTMLInputElement>(null);

  const handleConnect = () => {
    // Simulated OAuth Flow
    const win = window.open('', 'Connect Facebook', 'width=600,height=600');
    if (win) {
      win.document.body.innerHTML = `
        <div style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f0f2f5;">
          <h2 style="color: #1877f2">Meta Business Suite</h2>
          <p>Connecting Chalice & Cru Social Studio...</p>
          <button onclick="window.close()" style="background: #1877f2; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: bold;">Authorize Application</button>
        </div>
      `;
    }
    setTimeout(() => {
      setIsSocialConnected(true);
    }, 2000);
  };

  const handlePublish = async () => {
    setPostStatus('posting');
    // Simulated API call to Meta Graph API
    await new Promise(resolve => setTimeout(resolve, 3000));
    setPostStatus('success');
    setTimeout(() => {
      setShowPostModal(false);
      setPostStatus('idle');
    }, 2000);
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData(prev => ({ ...prev, bgImage: url }));
    }
  };

  const handleBottleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData(prev => ({ ...prev, bottleImage: url }));
    }
  };

  const isCustomColor = !COLOR_OPTIONS.some(c => c.hex.toLowerCase() === data.accentColor.toLowerCase());

  const getAwardIconCount = (award: string) => {
    const lower = award.toLowerCase();
    if (lower.includes('triple') || lower.includes('3x')) return 3;
    if (lower.includes('double') || lower.includes('2x')) return 2;
    return 1;
  };

  return (
    <div className="flex h-full w-full bg-stone-50 overflow-hidden relative">
      {/* Post Composer Modal */}
      {showPostModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif text-stone-900">Publish Asset</h3>
                <p className="text-xs text-stone-400">Review your post before it goes live</p>
              </div>
              <button onClick={() => setShowPostModal(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
              {/* Preview Clip */}
              <div className="w-full md:w-64 shrink-0">
                <div className="aspect-square bg-stone-100 rounded-lg border border-stone-200 overflow-hidden relative shadow-inner">
                  {data.bgImage && <img src={data.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    {data.bottleImage ? (
                      <img src={data.bottleImage} className="h-full object-contain" />
                    ) : <Wine size={48} className="text-stone-300" />}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-white/80 backdrop-blur text-[8px] font-bold truncate">
                    {data.wineName}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                   <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                      <Facebook size={14} /> FB Page: Chalice & Cru
                   </div>
                   <div className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-700 rounded-lg text-xs font-medium border border-pink-100">
                      <Instagram size={14} /> IG Feed: @chaliceandcru
                   </div>
                </div>
              </div>

              {/* Caption Editor */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-stone-400 tracking-wider">Post Caption</label>
                   <textarea 
                     className="w-full h-48 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none resize-none font-sans text-stone-800"
                     defaultValue={`${data.tagline}\n\nShop our special offer: ${data.offerPrice} (RRP ${data.rrpPrice})\n\n${data.hashtags}`}
                   />
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 font-medium">Auto-scheduling optimized for HKT Time</span>
              <button 
                onClick={handlePublish}
                disabled={postStatus !== 'idle'}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${postStatus === 'success' ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-white hover:bg-black'}`}
              >
                {postStatus === 'idle' && <><Send size={18} /> Publish Now</>}
                {postStatus === 'posting' && <><Loader2 className="animate-spin" size={18} /> Sending to Meta...</>}
                {postStatus === 'success' && <><Check size={18} /> Success!</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Sidebar */}
      <div className="w-full lg:w-96 bg-white border-r border-stone-200 h-full flex flex-col shadow-xl z-10 shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center gap-2">
            <Palette className="text-rose-700" size={20} />
            Template Editor
          </h2>
          <p className="text-xs text-stone-500 mt-1">Multi-format Asset Creator</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Integrations Section */}
          <div className="space-y-3">
             <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Link size={14} /> Integrations
            </h3>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
               {isSocialConnected ? (
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-2 border-stone-50">
                              <Facebook size={12} className="text-white" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center border-2 border-stone-50">
                              <Instagram size={12} className="text-white" />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-stone-700">Meta Accounts Connected</span>
                       </div>
                       <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    </div>
                    <button 
                      onClick={() => setIsSocialConnected(false)}
                      className="text-[10px] text-rose-600 font-bold uppercase tracking-wider hover:underline"
                    >
                      Disconnect Accounts
                    </button>
                 </div>
               ) : (
                 <div className="text-center py-2">
                    <p className="text-[11px] text-stone-500 mb-3">Post directly to your Facebook Page and Instagram Feed.</p>
                    <button 
                      onClick={handleConnect}
                      className="w-full py-2 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Facebook size={14} className="text-blue-600" /> Connect Meta Account
                    </button>
                 </div>
               )}
            </div>
          </div>

          {/* Wine Details */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Type size={14} /> Wine Info
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Wine Name</label>
              <input
                type="text"
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={data.wineName}
                onChange={(e) => setData({ ...data, wineName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Tagline / Hook</label>
              <input
                type="text"
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={data.tagline}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-medium text-stone-600 flex items-center gap-1.5">
                  <Tag size={12} /> Badge Label
               </label>
               <input
                  type="text"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  value={data.badgeText}
                  onChange={(e) => setData({ ...data, badgeText: e.target.value })}
                  placeholder="New Arrival"
               />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-500 flex items-center gap-1.5">
                     <DollarSign size={12} /> RRP Price
                  </label>
                  <input
                     type="text"
                     className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none font-medium text-stone-400"
                     value={data.rrpPrice}
                     onChange={(e) => setData({ ...data, rrpPrice: e.target.value })}
                     placeholder="$1,500"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium text-rose-700 flex items-center gap-1.5 font-bold">
                     <DollarSign size={12} /> Offer Price
                  </label>
                  <input
                     type="text"
                     className="w-full p-2 bg-stone-50 border border-rose-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none font-bold text-rose-900"
                     value={data.offerPrice}
                     onChange={(e) => setData({ ...data, offerPrice: e.target.value })}
                     placeholder="$1,250"
                  />
               </div>
            </div>
          </div>

          {/* Hashtags Section */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Hash size={14} /> Instagram Hashtags
            </h3>
            <div className="space-y-2">
              <textarea
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-xs focus:ring-2 focus:ring-rose-500 outline-none resize-none h-16 font-mono text-stone-600"
                value={data.hashtags}
                onChange={(e) => setData({ ...data, hashtags: e.target.value })}
                placeholder="#YourBrand #Wine..."
              />
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Quote size={14} /> Critic Reviews
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Review Quote</label>
              <textarea
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none resize-none h-20"
                value={data.quote}
                onChange={(e) => setData({ ...data, quote: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Attribution</label>
              <input
                type="text"
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={data.quoteAuthor}
                onChange={(e) => setData({ ...data, quoteAuthor: e.target.value })}
                placeholder="e.g. James Suckling"
              />
            </div>
          </div>

          {/* Scores & Badges */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Award size={14} /> Scores & Awards
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Score</label>
                <div className="relative">
                  <Star className="absolute left-2 top-2.5 text-stone-400" size={14} />
                  <input
                    type="text"
                    className="w-full pl-8 p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                    value={data.score}
                    onChange={(e) => setData({ ...data, score: e.target.value })}
                    placeholder="95"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Award</label>
                <input
                  type="text"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                  value={data.award}
                  onChange={(e) => setData({ ...data, award: e.target.value })}
                  placeholder="Gold Medal"
                />
              </div>
            </div>
          </div>

          {/* Visuals */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Palette size={14} /> Visual Assets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Background</label>
                <div 
                  onClick={() => bgInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-stone-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-colors relative overflow-hidden group bg-white"
                >
                  {data.bgImage ? (
                    <img src={data.bgImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="BG" />
                  ) : (
                    <div className="flex flex-col items-center text-stone-400">
                      <ImageIcon className="mb-1" size={20} />
                      <span className="text-[10px] font-bold">BG LAYER</span>
                    </div>
                  )}
                </div>
                <input ref={bgInputRef} type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Bottle (PNG)</label>
                <div 
                  onClick={() => bottleInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-stone-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-colors relative overflow-hidden group bg-white"
                >
                  {data.bottleImage ? (
                    <img src={data.bottleImage} className="h-full w-auto object-contain p-2 group-hover:scale-110 transition-transform" alt="Bottle" />
                  ) : (
                    <div className="flex flex-col items-center text-stone-400">
                      <Wine className="mb-1" size={20} />
                      <span className="text-[10px] font-bold">BOTTLE</span>
                    </div>
                  )}
                </div>
                <input ref={bottleInputRef} type="file" accept="image/*" onChange={handleBottleUpload} className="hidden" />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-stone-600 mb-2 block">Brand Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setData({ ...data, accentColor: color.hex })}
                    className={`w-8 h-8 rounded-full transition-all border border-stone-200 relative ${data.accentColor === color.hex ? 'ring-2 ring-offset-2 ring-stone-400 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {data.accentColor === color.hex && <Check className="text-white w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                  </button>
                ))}
                <div className="relative w-8 h-8">
                    <input type="color" value={data.accentColor} onChange={(e) => setData({ ...data, accentColor: e.target.value })} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10" />
                    <div className={`w-full h-full rounded-full border border-stone-200 flex items-center justify-center ${isCustomColor ? 'ring-2 ring-offset-2 ring-stone-400' : ''}`} style={{ backgroundColor: isCustomColor ? data.accentColor : '#fff' }}>
                         <Plus size={14} className={isCustomColor ? "text-white" : "text-stone-400"} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto bg-stone-100 flex flex-col items-center p-8 lg:p-12 relative min-w-[600px]">
        {/* Format Selector Toolbar */}
        <div className="flex items-center gap-4 mb-8 bg-white p-2 rounded-xl shadow-sm border border-stone-200 sticky top-0 z-20">
            <button 
              onClick={() => setPreviewTab('both')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${previewTab === 'both' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Both Formats
            </button>
            <div className="w-px h-6 bg-stone-200"></div>
            <button 
              onClick={() => setPreviewTab('square')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${previewTab === 'square' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <Square size={16} /> Square (1:1)
            </button>
            <button 
              onClick={() => setPreviewTab('portrait')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${previewTab === 'portrait' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              <Smartphone size={16} /> Portrait (4:5)
            </button>
            
            <div className="w-px h-6 bg-stone-200"></div>

            <div className="flex items-center gap-2">
               <button className="bg-stone-100 text-stone-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-stone-200 transition-colors">
                   <Download size={16} /> Download
               </button>
               {isSocialConnected && (
                 <button 
                  onClick={() => setShowPostModal(true)}
                  className="bg-rose-700 text-white px-5 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-rose-800 transition-all active:scale-95"
                 >
                    <Share2 size={16} /> Post to Social
                 </button>
               )}
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
            
            {/* SQUARE VERSION (1:1) */}
            {(previewTab === 'both' || previewTab === 'square') && (
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Facebook / IG Grid (1080x1080)</span>
                <div 
                  className="bg-white shadow-2xl overflow-hidden relative flex flex-col"
                  style={{ width: '500px', height: '500px' }} 
                >
                  <div className="absolute top-0 w-full h-1.5 z-20" style={{ backgroundColor: data.accentColor }}></div>
                  <div className="flex h-full">
                    <div className="w-1/2 bg-stone-100 relative overflow-hidden flex items-center justify-center">
                       {data.bgImage && <img src={data.bgImage} className="absolute inset-0 w-full h-full object-cover" />}
                       {data.bottleImage ? (
                         <img src={data.bottleImage} className="relative z-10 h-[92%] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]" />
                       ) : <Wine size={48} className="text-stone-300" />}
                    </div>
                    <div className="w-1/2 p-8 flex flex-col justify-between bg-white">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: data.accentColor }}>{data.badgeText}</span>
                        <h1 className="font-serif text-3xl font-bold text-stone-900 leading-tight">{data.wineName}</h1>
                        <p className="text-stone-600 text-xs leading-relaxed">{data.tagline}</p>
                        {data.quote && (
                          <div className="pl-4 border-l border-stone-200 py-1">
                            <p className="font-serif italic text-stone-800 text-sm italic">"{data.quote}"</p>
                            <p className="text-[10px] font-bold text-stone-400 mt-1 uppercase">— {data.quoteAuthor}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                        <div className="flex items-center gap-3">
                           {data.score && <div className="w-12 h-12 rounded-full border border-stone-800 flex flex-col items-center justify-center shrink-0" style={{ color: data.accentColor }}>
                              <span className="text-base font-bold leading-none">{data.score}</span>
                              <span className="text-[7px] font-bold uppercase">Pts</span>
                           </div>}
                           <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                              <div className="flex justify-center gap-0.5 text-yellow-600">
                                 {Array.from({ length: getAwardIconCount(data.award) }).map((_, i) => <Award key={i} size={12} fill="currentColor" />)}
                              </div>
                              <span className="text-[8px] font-bold uppercase leading-tight">{data.award}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="mb-1">
                              {data.rrpPrice && <span className="text-[9px] text-stone-400 line-through mr-2 font-medium">{data.rrpPrice}</span>}
                              {data.offerPrice && <span className="text-sm font-bold" style={{ color: data.accentColor }}>{data.offerPrice}</span>}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PORTRAIT VERSION (4:5) */}
            {(previewTab === 'both' || previewTab === 'portrait') && (
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Instagram Portrait (1080x1350)</span>
                <div 
                  className="bg-white shadow-2xl overflow-hidden relative flex flex-col"
                  style={{ width: '400px', height: '500px' }} 
                >
                  <div className="absolute top-0 w-full h-1.5 z-20" style={{ backgroundColor: data.accentColor }}></div>
                  
                  {/* Top Image Section (60%) */}
                  <div className="h-[60%] bg-stone-100 relative overflow-hidden flex items-center justify-center">
                     {data.bgImage && <img src={data.bgImage} className="absolute inset-0 w-full h-full object-cover" />}
                     <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded shadow-sm border border-stone-200">
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: data.accentColor }}>{data.badgeText}</span>
                     </div>
                     {data.bottleImage ? (
                       <img src={data.bottleImage} className="relative z-10 h-[94%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" />
                     ) : <Wine size={64} className="text-stone-300" />}
                  </div>

                  {/* Bottom Text Section (40%) */}
                  <div className="h-[40%] p-6 flex flex-col justify-between bg-white relative">
                     <div className="space-y-3">
                        <h1 className="font-serif text-2xl font-bold text-stone-900 leading-tight">{data.wineName}</h1>
                        <p className="text-stone-600 text-[11px] leading-relaxed italic">{data.tagline}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                           {data.score && (
                             <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                                <Star size={12} className="text-yellow-600" fill="currentColor" />
                                <span className="text-xs font-bold" style={{ color: data.accentColor }}>{data.score} Pts</span>
                             </div>
                           )}
                           
                           {data.offerPrice && (
                             <div className="flex items-center gap-2">
                                {data.rrpPrice && <span className="text-[10px] text-stone-400 line-through font-medium">{data.rrpPrice}</span>}
                                <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-full shadow-md">
                                    <DollarSign size={10} className="text-white" />
                                    <span className="text-xs font-bold text-white tracking-wide">{data.offerPrice}</span>
                                </div>
                             </div>
                           )}
                           
                           {data.award && (
                             <div className="flex flex-col items-center gap-1 min-w-[50px]">
                                <div className="flex justify-center gap-0.5 text-yellow-600">
                                   {Array.from({ length: getAwardIconCount(data.award) }).map((_, i) => <Award key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-[8px] font-bold uppercase text-stone-500 text-center leading-none tracking-tight">{data.award}</span>
                             </div>
                           )}
                        </div>
                     </div>

                     <div className="flex items-end justify-between mt-auto">
                        <div className="flex flex-col gap-1 max-w-[65%]">
                           <p className="text-[9px] font-mono text-stone-400 line-clamp-2 leading-tight">{data.hashtags}</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}
        </div>
        
        <div className="h-20 w-full shrink-0"></div>
      </div>
    </div>
  );
};
