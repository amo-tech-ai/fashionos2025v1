
import React from 'react';
import { Radio, Music, Sun, Scissors, Play, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Cue {
  id: string;
  time: string;
  look?: string;
  lighting: string;
  audio: string;
  wardrobe: string;
  status: 'pending' | 'active' | 'completed';
}

interface LiveCueSheetProps {
  cues: Cue[];
  activeCueId: string;
  onComplete: (id: string) => void;
}

export const LiveCueSheet: React.FC<LiveCueSheetProps> = ({ cues, activeCueId, onComplete }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between border-b border-primary/5 pb-4">
        <div className="flex items-center gap-3">
          <Radio className="h-4 w-4 text-primary animate-pulse" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Backstage Technical Master</h2>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Sync: Global HQ</span>
      </div>

      <div className="space-y-4">
        {cues.map((cue) => (
          <div 
            key={cue.id}
            className={cn(
              "group grid grid-cols-12 items-center gap-8 p-6 border transition-all duration-500",
              cue.id === activeCueId 
                ? "bg-primary text-white border-primary shadow-2xl scale-[1.02] z-10" 
                : cue.status === 'completed' 
                  ? "bg-muted/10 opacity-40 grayscale" 
                  : "bg-white hover:border-primary/20"
            )}
          >
            <div className="col-span-1 text-[10px] font-mono opacity-40 group-hover:opacity-100">{cue.time}</div>
            
            <div className="col-span-2 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Look</p>
              <p className="text-sm font-serif italic">{cue.look || 'TRANSITION'}</p>
            </div>

            <div className="col-span-3 space-y-1">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
                <Sun className="h-3 w-3" /> Lighting
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight truncate">{cue.lighting}</p>
            </div>

            <div className="col-span-3 space-y-1">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
                <Music className="h-3 w-3" /> Audio
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight truncate">{cue.audio}</p>
            </div>

            <div className="col-span-2 space-y-1">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40">
                <Scissors className="h-3 w-3" /> Wardrobe
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tight truncate">{cue.wardrobe}</p>
            </div>

            <div className="col-span-1 flex justify-end">
               {cue.status === 'completed' ? (
                 <CheckCircle className="h-5 w-5 text-green-500" />
               ) : cue.id === activeCueId ? (
                 <button onClick={() => onComplete(cue.id)} className="w-10 h-10 bg-white text-primary flex items-center justify-center hover:scale-110 transition-all">
                   <Play className="h-4 w-4 fill-primary" />
                 </button>
               ) : (
                 <div className="w-2 h-2 rounded-full bg-muted" />
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
