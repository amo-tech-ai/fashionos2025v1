
import React, { useState } from 'react';
import { BrainCircuit, History } from 'lucide-react';
import { generateVision, generateMotion, auditSustainability } from '@/lib/gemini';
import { SynthesisEngine } from '@/components/dashboard/studio/SynthesisEngine';
import { SynthesisPreview } from '@/components/dashboard/studio/SynthesisPreview';
import { EsgReport } from '@/components/dashboard/studio/EsgReport';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

export const Studio: React.FC = () => {
  const { saveAsset, assets } = useDashboardStore();
  const [activeMode, setActiveMode] = useState<'synthesis' | 'motion' | 'esg'>('synthesis');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [aspect, setAspect] = useState<"1:1" | "3:4" | "4:3" | "16:9" | "9:16">("3:4");
  const [isSaved, setIsSaved] = useState(false);

  const handleExecute = async () => {
    if (!prompt) return;
    setLoading(true);
    setAnalysis(null);
    setIsSaved(false);
    try {
      if (activeMode === 'esg') {
        const result = await auditSustainability(prompt);
        setAnalysis(result);
      } else if (activeMode === 'motion') {
        const url = await generateMotion(prompt, aspect as any);
        setAssetUrl(url);
      } else {
        const url = await generateVision(prompt, aspect, "1K");
        setAssetUrl(url);
      }
    } catch (error: any) { alert(error.message); }
    finally { setLoading(false); }
  };

  const handleSaveToCollection = () => {
    if (!assetUrl) return;
    saveAsset({
      title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
      type: activeMode === 'motion' ? 'video' : 'image',
      thumbnail: assetUrl,
      tags: ['AI Generated', activeMode.toUpperCase()],
      metadata: { prompt, aspect, analysis }
    });
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-primary/5 pb-10">
        <div className="space-y-3">
          <h1 className="font-serif text-6xl italic tracking-tight leading-none">Creative Studio</h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Visual Synthesis & ESG Intelligence</p>
        </div>
        <div className="flex bg-muted p-1 rounded-sm">
          {['synthesis', 'motion', 'esg'].map(m => (
            <button 
              key={m}
              onClick={() => setActiveMode(m as any)}
              className={cn("px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all", activeMode === m ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
            >{m.toUpperCase()}</button>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-10">
          <SynthesisEngine 
            activeMode={activeMode}
            prompt={prompt}
            setPrompt={setPrompt}
            aspect={aspect}
            setAspect={setAspect}
            loading={loading}
            onExecute={handleExecute}
          />

          {analysis && activeMode === 'esg' ? (
             <div className="p-10 bg-primary text-white shadow-2xl rounded-none">
                <EsgReport analysis={analysis} />
             </div>
          ) : analysis && (
            <div className="p-10 bg-primary text-white animate-in slide-in-from-left-4 shadow-2xl space-y-4 rounded-none">
               <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                 <BrainCircuit className="h-4 w-4 opacity-40" />
                 <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Neural Lifecycle Report</span>
               </div>
               <p className="text-xs leading-relaxed italic opacity-90 whitespace-pre-wrap">{analysis}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <SynthesisPreview 
            assetUrl={assetUrl}
            type={activeMode === 'motion' ? 'video' : 'image'}
            loading={loading}
            aspect={aspect}
            isSaved={isSaved}
            onSave={handleSaveToCollection}
          />
          
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
             <div className="col-span-4 flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Recent Archival Logs</p>
                <History className="h-3.5 w-3.5 text-muted-foreground/30" />
             </div>
             {assets.length > 0 ? assets.slice(0, 4).map(asset => (
               <div key={asset.id} className="aspect-[3/4] border bg-muted relative group overflow-hidden">
                 {asset.type === 'video' ? (
                    <video src={asset.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                 ) : (
                    <img src={asset.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Asset" />
                 )}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest border border-white px-2 py-1">View</span>
                 </div>
               </div>
             )) : (
               [1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-muted/20 border border-dashed border-border/50" />)
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
