
import React, { useState } from 'react';
import { Users2, Sparkles, Loader2, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { analyzeStakeholders } from '@/lib/gemini';

export const StakeholderIntelligence: React.FC = () => {
  const [stakeholderBrief, setStakeholderBrief] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stakeholderReport, setStakeholderReport] = useState<{ text: string, sources: any[] } | null>(null);

  const handleStakeholderAnalysis = async () => {
    if (!stakeholderBrief || stakeholderBrief.trim().length < 5) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeStakeholders(stakeholderBrief);
      setStakeholderReport(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/5 p-2"><Users2 className="h-4 w-4 text-primary" /></div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Stakeholder Intelligence</h2>
        </div>
      </div>
      
      <div className="bg-white border border-border p-8 lg:p-10 space-y-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Strategic Project Brief</p>
          <textarea 
            className="w-full h-32 bg-muted/20 border-none p-6 text-sm font-serif italic leading-relaxed focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30 resize-none"
            placeholder="Input project context for neural mapping..."
            value={stakeholderBrief}
            onChange={(e) => setStakeholderBrief(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest italic max-w-xs">
            Analyzes global news & risk factors to map your network using Search Grounding.
          </p>
          <Button onClick={handleStakeholderAnalysis} disabled={isAnalyzing || !stakeholderBrief.trim()} className="h-14 px-12 rounded-none text-[10px] font-black uppercase tracking-widest shadow-xl">
            {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Synthesize Map"}
          </Button>
        </div>

        {stakeholderReport && !isAnalyzing && (
          <div className="pt-10 mt-10 border-t border-border/50 animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Alignment Report</h3>
              </div>
              <button onClick={() => setStakeholderReport(null)} className="p-2 hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-8 lg:p-10 bg-muted/10 border-l-4 border-primary prose prose-sm max-w-none font-serif italic whitespace-pre-wrap leading-loose shadow-inner">
              {stakeholderReport.text}
            </div>
            {stakeholderReport.sources.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {stakeholderReport.sources.map((s, i) => (
                  <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border hover:border-primary transition-all text-[10px] font-bold group">
                    <span className="truncate max-w-[120px]">{s.title}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
