
import React from 'react';
import { Leaf, AlertTriangle, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EsgReportProps {
  analysis: string;
}

export const EsgReport: React.FC<EsgReportProps> = ({ analysis }) => {
  // Extract mock score for visual representation if text doesn't explicitly provide one
  const score = analysis.match(/\d+/) ? parseInt(analysis.match(/\d+/)![0]) : 78;

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-700">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-white/40" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60">Sustainability Auditor</h3>
        </div>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border",
          score > 70 ? "border-green-400 text-green-400" : "border-amber-400 text-amber-400"
        )}>
          Index: {score}/100
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white/5 border border-white/5 space-y-2">
          <Leaf className="h-4 w-4 text-green-400/60" />
          <p className="text-[9px] font-black uppercase tracking-tighter text-white/40">Bio-Impact</p>
          <p className="text-xs font-serif italic text-white/90">Minimal Watershed Stress</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 space-y-2">
          <AlertTriangle className="h-4 w-4 text-amber-400/60" />
          <p className="text-[9px] font-black uppercase tracking-tighter text-white/40">Regulatory Risk</p>
          <p className="text-xs font-serif italic text-white/90">Pending EU Certification</p>
        </div>
      </div>

      <div className="p-8 bg-white/5 border-l-2 border-white/20 italic font-serif text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
        {analysis}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 h-10 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
          View Certification
        </button>
        <button className="flex-1 h-10 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
          Suggest Alternatives
        </button>
      </div>
    </div>
  );
};
