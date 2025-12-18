
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIInsightProps {
  text: string;
}

export const AIInsight: React.FC<AIInsightProps> = ({ text }) => (
  <div className="p-6 bg-primary/[0.02] border border-primary/5 space-y-3 animate-in fade-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2">
       <Sparkles className="h-3 w-3 text-primary/40" />
       <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">AI Insight</span>
    </div>
    <p className="text-xs leading-relaxed text-foreground/70 italic">
      {text}
    </p>
    <div className="flex gap-4 pt-2">
      <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:opacity-70">Accept</button>
      <button className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:opacity-70">Ignore</button>
    </div>
  </div>
);
