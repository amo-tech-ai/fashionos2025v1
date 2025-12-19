
import React, { useState } from 'react';
import { AlertTriangle, Zap, BrainCircuit, Loader2, Info, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Task } from '@/types/dashboard';
import { analyzeCriticalPath, simulateCascade } from '@/lib/gemini';
import { cn } from '@/lib/utils';

interface RiskCenterProps {
  tasks: Task[];
}

export const RiskCenter: React.FC<RiskCenterProps> = ({ tasks }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [scenario, setScenario] = useState('');
  const [mode, setMode] = useState<'critical' | 'cascade' | null>(null);

  const handleCriticalPath = async () => {
    setLoading(true);
    setMode('critical');
    try {
      const res = await analyzeCriticalPath(tasks);
      setAnalysis(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSimulate = async () => {
    if (!scenario) return;
    setLoading(true);
    setMode('cascade');
    try {
      const res = await simulateCascade(tasks, scenario);
      setAnalysis(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
      <div className="flex bg-muted p-1 rounded-none gap-px">
        <button 
          onClick={() => { setMode('critical'); setAnalysis(null); }}
          className={cn(
            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
            mode === 'critical' ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
          )}
        >
          Critical Path
        </button>
        <button 
          onClick={() => { setMode('cascade'); setAnalysis(null); }}
          className={cn(
            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
            mode === 'cascade' ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
          )}
        >
          Cascade Simulator
        </button>
      </div>

      <Card className="rounded-none border-primary/5 bg-white shadow-xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          {mode === 'critical' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Critical Path Analysis</h3>
              </div>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Identify the "Show Stopper" chain. Gemini 3 Pro reasons through dependencies to find silent blockers.
              </p>
              <Button onClick={handleCriticalPath} disabled={loading} className="w-full h-14 rounded-none uppercase text-[10px] font-black tracking-widest">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Initiate Neural Scan"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Butterfly Effect Simulator</h3>
              </div>
              <textarea 
                className="w-full h-32 bg-muted/20 border-none p-6 text-sm font-serif italic leading-relaxed focus:ring-1 focus:ring-primary/20 resize-none"
                placeholder="What if the venue load-in is delayed by 3 hours?"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              />
              <Button onClick={handleSimulate} disabled={loading || !scenario} className="w-full h-14 rounded-none uppercase text-[10px] font-black tracking-widest">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simulate Cascade"}
              </Button>
            </div>
          )}

          {analysis && !loading && (
            <div className="pt-8 border-t border-border/50 space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary/40" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">Neural Risk Report</span>
                </div>
                <button onClick={() => setAnalysis(null)} className="text-muted-foreground hover:text-primary"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-8 bg-muted/5 border-l-2 border-primary italic font-serif text-sm leading-loose whitespace-pre-wrap">
                {analysis}
              </div>
              <div className="bg-primary text-white p-6 space-y-3">
                 <div className="flex items-center gap-2">
                    <Info className="h-3.5 w-3.5 opacity-40" />
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Mitigation Strategy</span>
                 </div>
                 <p className="text-[10px] font-serif leading-relaxed opacity-90 italic">
                   System recommends re-prioritizing the 'Pattern Approval' task to decouple it from the 'Textile Analysis' blocker.
                 </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
         <h3 className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Live Health Signals</h3>
         <div className="space-y-2">
            {tasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-4 bg-white border flex items-center justify-between group cursor-default">
                 <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.status === 'at-risk' ? "bg-destructive animate-pulse" : "bg-green-500"
                    )} />
                    <span className="text-[10px] font-bold group-hover:italic transition-all">{task.title}</span>
                 </div>
                 <ChevronRight className="h-3 w-3 text-muted-foreground/20" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
