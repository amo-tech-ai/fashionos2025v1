
import React, { useState } from 'react';
import { Wand2, Loader2, Expand, Upload, BrainCircuit, Search, Save, Check } from 'lucide-react';
import { generateVision, analyzeVisualAsset } from '@/lib/gemini';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

export const Studio: React.FC = () => {
  const { saveAsset } = useDashboardStore();
  const [activeMode, setActiveMode] = useState<'synthesis' | 'intelligence'>('synthesis');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [aspect, setAspect] = useState<"1:1" | "3:4" | "4:3" | "16:9" | "9:16">("3:4");
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setAnalysis(null);
    setIsSaved(false);
    try {
      const url = await generateVision(prompt, aspect, "1K");
      setImage(url);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToVault = () => {
    if (!image) return;
    saveAsset({
      title: prompt.slice(0, 20) + '...',
      type: 'image',
      thumbnail: image,
      tags: ['AI Generated', 'Studio'],
      dimensions: '1024x1024',
      fileSize: '1.2 MB'
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const base64Data = base64.split(',')[1];
      setImage(base64);
      setLoading(true);
      setAnalysis(null);
      try {
        const result = await analyzeVisualAsset(base64Data, file.type);
        setAnalysis(result);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-primary/5 pb-10">
        <div className="space-y-3">
          <h1 className="font-serif text-6xl italic tracking-tight leading-none">Creative Studio</h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Synthesis & Visual Intelligence</p>
        </div>
        <div className="flex bg-muted p-1 rounded-sm">
          <button 
            onClick={() => setActiveMode('synthesis')}
            className={cn("px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all", activeMode === 'synthesis' ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
          >Synthesis</button>
          <button 
            onClick={() => setActiveMode('intelligence')}
            className={cn("px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all", activeMode === 'intelligence' ? "bg-white shadow-sm text-primary" : "text-muted-foreground")}
          >Intelligence</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-10">
          {activeMode === 'synthesis' ? (
            <Card className="rounded-none border-primary/5 shadow-2xl bg-white overflow-hidden">
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center gap-3">
                   <Wand2 className="h-5 w-5 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Synthesis Engine</span>
                </div>
                
                <textarea 
                  className="w-full min-h-[180px] p-6 bg-muted/20 border-none focus:ring-1 focus:ring-primary/20 text-sm font-medium resize-none leading-relaxed placeholder:italic"
                  placeholder="Describe a high-fashion vision..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-2">
                  {["3:4", "9:16", "1:1", "16:9"].map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setAspect(ar as any)}
                      className={cn(
                        "p-4 text-[8px] font-black uppercase tracking-widest border transition-all",
                        aspect === ar ? "bg-primary text-primary-foreground border-primary" : "bg-white text-muted-foreground"
                      )}
                    >{ar}</button>
                  ))}
                </div>

                <Button className="w-full h-16 text-sm font-black uppercase tracking-[0.3em] rounded-none" onClick={handleGenerate} disabled={loading || !prompt}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Execute Synthesis"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
               <div className="p-10 bg-white border border-primary/5 shadow-xl space-y-8">
                  <div className="flex items-center gap-3 text-primary">
                     <BrainCircuit className="h-5 w-5" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Neural Deconstruction</span>
                  </div>
                  <div className="relative h-64 border-2 border-dashed border-border flex flex-col items-center justify-center space-y-4 hover:bg-muted/10 transition-colors cursor-pointer group">
                     <Upload className="h-8 w-8 text-muted-foreground" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Reference Asset</p>
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
                  </div>
               </div>
               {analysis && (
                 <div className="p-10 bg-primary text-white animate-in slide-in-from-left-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6">Extraction Report</p>
                    <p className="text-xs leading-relaxed italic opacity-90">{analysis}</p>
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className={cn(
            "relative bg-muted/20 flex items-center justify-center overflow-hidden border border-primary/5 min-h-[500px]",
            aspect === "3:4" ? "aspect-[3/4]" : aspect === "16:9" ? "aspect-video" : aspect === "9:16" ? "aspect-[9/16]" : "aspect-square"
          )}>
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover animate-in zoom-in-95" alt="Output" />
                <div className="absolute bottom-10 right-10 flex gap-3">
                   <Button 
                    onClick={handleSaveToVault}
                    className={cn("rounded-none h-12 px-8 uppercase text-[10px] font-black tracking-widest", isSaved && "bg-green-600")}
                   >
                     {isSaved ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                     {isSaved ? "Saved to Vault" : "Commit to Vault"}
                   </Button>
                </div>
              </>
            ) : (
              <div className="text-center opacity-30">
                <Expand className="h-12 w-12 mx-auto mb-4" />
                <p className="font-serif italic">Canvas Empty</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em]">Synthesizing Neural Fibers</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
