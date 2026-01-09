
import React, { useState, useRef } from 'react';
// Added missing Image as ImageIcon import
import { Video, User, MapPin, Type, Sparkles, Monitor, Maximize, Upload, Play, Download, Loader2, AlertCircle, Info, Image as ImageIcon } from 'lucide-react';
import { generateVideo, VideoParams } from '../services/geminiService';

const SETTINGS = ["Modern Studio", "Wine Cellar", "Lush Vineyard", "Sunset Terrace", "Minimalist Kitchen"];
const AGES = ["21-30", "30-40", "40+"];
const STYLES = ["Professional", "Approachable", "Energetic", "Elegant", "Casual"];
const REFINEMENTS = [
  { label: "Dramatic Shadows", value: "dramatic shadows and high contrast lighting" },
  { label: "Setting Sun", value: "warm golden hour lighting from a setting sun" },
  { label: "Holding Glass", value: "presenter naturally holding a fine wine glass" },
  { label: "Pouring Wine", value: "cinematic close-up of wine being poured into a glass" },
  { label: "Micro-macro Lens", value: "extremely shallow depth of field for professional look" }
];

export const VideoStudio: React.FC = () => {
  const [params, setParams] = useState<VideoParams>({
    setting: SETTINGS[0],
    presenterGender: "Female",
    presenterAge: AGES[0],
    presenterStyle: STYLES[1],
    script: "Welcome to Chalice & Cru. Today we're exploring a magnificent 2015 Bordeaux.",
    refinements: [],
    aspectRatio: '16:9',
    resolution: '720p',
    productImageBase64: undefined
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setParams(prev => ({ ...prev, productImageBase64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRefinement = (val: string) => {
    setParams(prev => ({
      ...prev,
      refinements: prev.refinements.includes(val) 
        ? prev.refinements.filter(r => r !== val) 
        : [...prev.refinements, val]
    }));
  };

  const handleGenerate = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && !(await aistudio.hasSelectedApiKey())) {
      await aistudio.openSelectKey();
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateVideo(params, setStatus);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate video.");
      if (err.message?.includes("entity was not found")) {
        aistudio?.openSelectKey();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-stone-50 overflow-hidden">
      {/* Editor Sidebar */}
      <div className="w-full lg:w-[400px] bg-white border-r border-stone-200 h-full flex flex-col shadow-xl z-10 shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center gap-2">
            <Video className="text-rose-700" size={22} />
            Video Studio
          </h2>
          <p className="text-xs text-stone-500 mt-1">Cinematic AI Wine Promotion</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Setting Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <MapPin size={14} /> Setting
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SETTINGS.map(s => (
                <button
                  key={s}
                  onClick={() => setParams({ ...params, setting: s })}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${params.setting === s ? 'bg-rose-50 border-rose-200 text-rose-800 font-bold' : 'bg-white border-stone-100 text-stone-600 hover:border-stone-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Presenter Profile */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <User size={14} /> Presenter
            </label>
            <div className="space-y-4">
              <div className="flex gap-2 bg-stone-50 p-1 rounded-xl">
                {["Male", "Female"].map(g => (
                  <button
                    key={g}
                    onClick={() => setParams({ ...params, presenterGender: g })}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${params.presenterGender === g ? 'bg-white text-rose-800 shadow-sm' : 'text-stone-400'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-medium text-stone-500">Age Range</span>
                <div className="flex gap-2">
                  {AGES.map(a => (
                    <button
                      key={a}
                      onClick={() => setParams({ ...params, presenterAge: a })}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold border ${params.presenterAge === a ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-200'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <select 
                value={params.presenterStyle}
                onChange={(e) => setParams({ ...params, presenterStyle: e.target.value })}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-md text-sm outline-none font-medium"
              >
                {STYLES.map(s => <option key={s} value={s}>{s} Style</option>)}
              </select>
            </div>
          </div>

          {/* Script Entry */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Type size={14} /> Script Context
            </label>
            <textarea
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none resize-none h-24 font-serif text-stone-800"
              value={params.script}
              onChange={(e) => setParams({ ...params, script: e.target.value })}
              placeholder="What should happen in the video?"
            />
          </div>

          {/* Visual Refinements */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <label className="text-xs font-bold uppercase text-stone-400 tracking-wider flex items-center gap-2">
              <Sparkles size={14} /> Visual Refinements
            </label>
            <div className="flex flex-wrap gap-2">
              {REFINEMENTS.map(r => (
                <button
                  key={r.label}
                  onClick={() => toggleRefinement(r.value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${params.refinements.includes(r.value) ? 'bg-rose-700 border-rose-700 text-white' : 'bg-white border-stone-200 text-stone-600'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Setup */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <Maximize size={10} /> Ratio
                </label>
                <select 
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold"
                  value={params.aspectRatio}
                  onChange={(e) => setParams({ ...params, aspectRatio: e.target.value as any })}
                >
                  <option value="16:9">16:9 Landscape</option>
                  <option value="9:16">9:16 Portrait</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <Monitor size={10} /> Res
                </label>
                <select 
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold"
                  value={params.resolution}
                  onChange={(e) => setParams({ ...params, resolution: e.target.value as any })}
                >
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <Upload size={10} /> Reference Image
              </label>
              <div 
                onClick={() => imageInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition-all bg-stone-50 overflow-hidden group"
              >
                {params.productImageBase64 ? (
                  <img src={params.productImageBase64} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-stone-400 group-hover:text-rose-600">
                    <ImageIcon size={24} className="mx-auto mb-1" />
                    <span className="text-[10px] font-bold">UPLOAD BOTTLE</span>
                  </div>
                )}
              </div>
              <input ref={imageInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-4 mt-4 rounded-2xl font-bold text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'bg-stone-400' : 'bg-gradient-to-r from-rose-700 to-rose-900 hover:shadow-rose-900/20'}`}
          >
            {isLoading ? <><Loader2 className="animate-spin" /> Generating...</> : <><Play size={18} /> Produce Video</>}
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto bg-stone-100 flex flex-col items-center justify-center p-8 lg:p-12 relative min-w-[600px]">
        {error && (
          <div className="max-w-md w-full bg-red-50 border border-red-100 p-4 rounded-2xl flex gap-3 text-red-700 mb-8 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="shrink-0" />
            <div>
              <p className="font-bold text-sm">Generation Error</p>
              <p className="text-xs opacity-80">{error}</p>
            </div>
          </div>
        )}

        <div className={`relative bg-stone-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center transition-all duration-700 border-8 border-white ${params.aspectRatio === '16:9' ? 'aspect-video w-full max-w-4xl' : 'aspect-[9/16] h-[75vh]'}`}>
          {isLoading ? (
            <div className="flex flex-col items-center text-center p-12 space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-rose-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-rose-700 border-t-transparent rounded-full animate-spin"></div>
                <Video size={32} className="absolute inset-0 m-auto text-rose-700 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-stone-800">{status}</h3>
                <p className="text-sm text-stone-500 font-medium">This usually takes 2-3 minutes. High-quality art takes time.</p>
              </div>
              <div className="w-64 h-1.5 bg-stone-300 rounded-full overflow-hidden">
                <div className="h-full bg-rose-700 w-1/2 animate-[progress_10s_ease-in-out_infinite]"></div>
              </div>
            </div>
          ) : videoUrl ? (
            <div className="relative w-full h-full group">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={videoUrl} 
                  download="marketing-video.mp4"
                  className="bg-white/90 backdrop-blur p-3 rounded-full text-stone-900 shadow-xl hover:bg-white transition-all flex items-center gap-2 font-bold text-sm"
                >
                  <Download size={20} />
                  Download MP4
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 text-stone-400 space-y-4">
              <div className="w-20 h-20 bg-stone-300/30 rounded-full flex items-center justify-center mx-auto">
                <Play size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-stone-600 italic">Director's Slate Empty</h3>
                <p className="text-xs max-w-xs mx-auto">Configure your scene on the left and click "Produce Video" to start rendering your cinematic wine ad.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-4 text-stone-400">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
            <Info size={12} /> Powered by Veo 3.1
          </div>
          <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
          <div className="text-[10px] font-bold uppercase tracking-widest">
            {params.resolution} • {params.aspectRatio}
          </div>
        </div>
      </div>
    </div>
  );
};
