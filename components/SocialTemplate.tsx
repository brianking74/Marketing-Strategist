import React, { useState, useRef } from 'react';
import { Upload, Type, Award, Quote, Download, Palette, Star, MessageSquare, Plus, Check } from 'lucide-react';

interface TemplateData {
  wineName: string;
  tagline: string;
  quote: string;
  quoteAuthor: string;
  score: string;
  award: string;
  accentColor: string;
  image: string | null;
}

const DEFAULT_DATA: TemplateData = {
  wineName: "Château Margaux 2015",
  tagline: "Experience the elegance of Bordeaux.",
  quote: "An absolute masterpiece of balance and density. The finish goes on for minutes.",
  quoteAuthor: "James Suckling",
  score: "99",
  award: "Double Gold",
  accentColor: "#881337", // Default Bordeaux Hex
  image: null
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData(prev => ({ ...prev, image: url }));
    }
  };

  const isCustomColor = !COLOR_OPTIONS.some(c => c.hex.toLowerCase() === data.accentColor.toLowerCase());

  return (
    <div className="flex h-full w-full bg-stone-50 overflow-hidden">
      {/* Editor Sidebar */}
      <div className="w-full lg:w-96 bg-white border-r border-stone-200 h-full flex flex-col shadow-xl z-10 shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center gap-2">
            <Palette className="text-rose-700" size={20} />
            Template Editor
          </h2>
          <p className="text-xs text-stone-500 mt-1">Design your social assets</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Wine Details */}
          <div className="space-y-3">
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
                placeholder="e.g. Wine Spectator"
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
              <Palette size={14} /> Visual Style
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Product Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed border-stone-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-colors"
              >
                <Upload className="text-stone-400 mb-1" size={20} />
                <span className="text-xs text-stone-500">Click to upload bottle</span>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600 mb-2 block">Accent Color</label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setData({ ...data, accentColor: color.hex })}
                    className={`w-8 h-8 rounded-full transition-all border border-stone-200 relative ${data.accentColor === color.hex ? 'ring-2 ring-offset-2 ring-stone-400 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {data.accentColor === color.hex && (
                      <Check className="text-white w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                    )}
                  </button>
                ))}
                
                {/* Custom Color Picker */}
                <div className="relative group w-8 h-8" title="Custom Color">
                    <input
                        type="color"
                        value={data.accentColor}
                        onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    {isCustomColor ? (
                      <div 
                        className="w-full h-full rounded-full border border-stone-200 flex items-center justify-center ring-2 ring-offset-2 ring-stone-400"
                        style={{ backgroundColor: data.accentColor }}
                      >
                         <Palette size={14} className="text-white drop-shadow-md" />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:bg-stone-50 transition-colors">
                          <Plus size={14} className="text-stone-400" />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-stone-100 flex items-center justify-center p-8 lg:p-12 relative">
        <div className="absolute top-6 right-6">
            <button className="bg-white text-stone-800 px-4 py-2 rounded-lg shadow-sm font-medium text-sm flex items-center gap-2 hover:bg-stone-50 transition-colors">
                <Download size={16} /> Save Image
            </button>
        </div>

        {/* The Canvas (Facebook Post Size 1080x1080) */}
        {/* We use scale to fit it in view if needed, but flex-col helps responsiveness */}
        <div 
          className="bg-white shadow-2xl overflow-hidden relative flex flex-col"
          style={{ width: '600px', height: '600px' }} // Using fixed size for preview consistency
        >
          {/* Top Bar */}
          <div className="absolute top-0 w-full h-2 z-20" style={{ backgroundColor: data.accentColor }}></div>

          {/* Main Content Layout */}
          <div className="flex h-full">
            
            {/* Left Side: Image */}
            <div className="w-1/2 bg-stone-100 relative overflow-hidden flex items-center justify-center">
               {data.image ? (
                 <img src={data.image} alt="Wine Bottle" className="h-[90%] w-[90%] object-contain opacity-90 hover:scale-105 transition-transform duration-700" />
               ) : (
                 <div className="text-stone-300 flex flex-col items-center">
                   <Upload size={48} className="mb-2" />
                   <span className="text-sm font-serif italic">Upload Bottle Image</span>
                 </div>
               )}
            </div>

            {/* Right Side: Copy & Info */}
            <div className="w-1/2 p-10 flex flex-col justify-between bg-white relative">
              
              <div className="space-y-6 relative z-10">
                <div>
                   <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: data.accentColor }}>New Arrival</span>
                   <h1 className="font-serif text-4xl font-bold text-stone-900 leading-tight mt-2">{data.wineName}</h1>
                   <div className="h-1 w-16 mt-4" style={{ backgroundColor: data.accentColor }}></div>
                </div>

                <p className="text-stone-600 leading-relaxed font-light">
                  {data.tagline}
                </p>

                {/* Quote Section */}
                {data.quote && (
                  <div className="relative pl-6 border-l-2 border-stone-200 py-1 mt-4">
                    <Quote size={20} className="opacity-20 absolute top-0 left-2 -translate-x-full" style={{ color: data.accentColor }} />
                    <p className="font-serif italic text-stone-800 text-lg leading-snug">
                      "{data.quote}"
                    </p>
                    {data.quoteAuthor && (
                      <p className="text-xs font-bold text-stone-400 mt-2 uppercase tracking-wider">— {data.quoteAuthor}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Section: Badges */}
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-100">
                <div className="flex items-center gap-4">
                   {/* Score Badge */}
                   {data.score && (
                     <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-stone-100 bg-stone-50" style={{ color: data.accentColor }}>
                        <span className="text-2xl font-bold font-serif leading-none">{data.score}</span>
                        <span className="text-[0.6rem] font-bold uppercase tracking-wide">Points</span>
                     </div>
                   )}
                   {/* Award Badge */}
                   {data.award && (
                     <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-yellow-600 mb-1">
                           <Award size={16} fill="currentColor" />
                           <Award size={16} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold text-stone-800 uppercase max-w-[100px] leading-tight">{data.award}</span>
                     </div>
                   )}
                </div>
                
                <div className="text-right">
                    <span className="text-[0.65rem] text-stone-400 uppercase tracking-widest">Available At</span>
                    <p className="text-xs font-bold text-stone-900">chaliceandcru.com</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};