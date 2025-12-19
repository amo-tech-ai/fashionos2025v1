
import React from 'react';
import { Wand2, ShieldCheck, Loader2, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SynthesisEngineProps {
  activeMode: 'synthesis' | 'motion' | 'esg';
  prompt: string;
  setPrompt: (v: string) => void;
  aspect: string;
  setAspect: (v: any) => void;
  loading: boolean;
  onExecute: () => void;
}

export const SynthesisEngine: React.FC<SynthesisEngineProps> = ({
  activeMode,
  prompt,
  setPrompt,
  aspect,
  setAspect,
  loading,
  onExecute
}) => {
  return (
    <Card className="rounded-none border-primary/5 shadow-2xl bg-white overflow-hidden">
      <CardContent className="p-10 space-y-8">
        <div className="flex items-center gap-3">
           {activeMode === 'synthesis' && <Wand2 className="h-5 w-5 text-primary" />}
           {activeMode === 'motion' && <Play className="h-5 w-5 text-primary" />}
           {activeMode === 'esg' && <ShieldCheck className="h-5 w-5 text-primary" />}
           <span className="text-[10px] font-black uppercase tracking-widest">
            {activeMode === 'esg' ? 'Sustainability Logic' : activeMode === 'motion' ? 'Motion synthesis' : 'Synthesis Engine'}
           </span>
        </div>
        
        <textarea 
          className="w-full min-h-[180px] p-6 bg-muted/20 border-none focus:ring-1 focus:ring-primary/20 text-sm font-medium resize-none leading-relaxed placeholder:italic transition-all"
          placeholder={
            activeMode === 'esg' ? "Define material composition or supplier data for auditing..." : 
            activeMode === 'motion' ? "Describe a cinematic motion editorial (e.g., silk billowing in Paris wind)..." : 
            "Describe a visionary luxury aesthetic..."
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {(activeMode === 'synthesis' || activeMode === 'motion') && (
          <div className="grid grid-cols-2 gap-2">
            {["3:4", "9:16", "1:1", "16:9"].map((ar) => (
              <button key={ar} onClick={() => setAspect(ar as any)} className={cn("p-4 text-[8px] font-black uppercase tracking-widest border transition-all", aspect === ar ? "bg-primary text-primary-foreground border-primary" : "bg-white text-muted-foreground")}>{ar}</button>
            ))}
          </div>
        )}

        <Button className="w-full h-16 text-sm font-black uppercase tracking-[0.3em] rounded-none shadow-xl" 
                onClick={onExecute} 
                disabled={loading || !prompt}>
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              {activeMode === 'motion' ? "Orchestrating Veo..." : "Synthesizing..."}
            </>
          ) : (
            activeMode === 'esg' ? "Perform Neural Audit" : activeMode === 'motion' ? "Generate Motion" : "Execute Synthesis"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
