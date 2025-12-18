
import React from 'react';
import { ShowStage } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ShowTimelineProps {
  stages: ShowStage[];
  currentStageId: string;
  onStageSelect: (id: string) => void;
}

export const ShowTimeline: React.FC<ShowTimelineProps> = ({ stages, currentStageId, onStageSelect }) => {
  return (
    <div className="w-full bg-white border-b border-border/50 py-6 px-8 lg:px-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Chronicle</span>
      </div>
      
      <div className="flex-1 flex items-center justify-between min-w-[800px]">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          const isActive = stage.id === currentStageId;
          const isCompleted = stage.status === 'completed';

          return (
            <React.Fragment key={stage.id}>
              <button 
                onClick={() => onStageSelect(stage.id)}
                className="group flex flex-col items-center gap-3 relative outline-none"
              >
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 transition-all duration-500",
                  isCompleted ? "bg-primary border-primary" : 
                  isActive ? "bg-white border-primary scale-125 shadow-[0_0_10px_rgba(0,0,0,0.1)]" : 
                  "bg-muted border-muted-foreground/20 group-hover:border-primary/40"
                )}>
                  {isCompleted && <Check className="h-1.5 w-1.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                </div>
                
                <div className="flex flex-col items-center space-y-1">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                  )}>
                    {stage.label}
                  </span>
                  <span className="text-[8px] font-mono text-muted-foreground/30">{stage.time}</span>
                </div>
              </button>
              
              {!isLast && (
                <div className="flex-1 h-px bg-muted mx-4 relative overflow-hidden">
                  <div className={cn(
                    "absolute inset-0 bg-primary/20 transform origin-left transition-transform duration-1000",
                    isCompleted ? "scale-x-100" : "scale-x-0"
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
