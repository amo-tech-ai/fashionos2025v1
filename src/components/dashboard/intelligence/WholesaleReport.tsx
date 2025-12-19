
import React from 'react';
import { Package, TrendingUp, DollarSign, Target } from 'lucide-react';

interface WholesaleReportProps {
  data: any;
}

export const WholesaleReport: React.FC<WholesaleReportProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
        <div className="bg-white p-8 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Target className="h-3 w-3" />
            Core:Statement Ratio
          </div>
          <p className="text-3xl font-serif italic">{data.coreVsStatementPieceRatio || '60:40'}</p>
        </div>
        <div className="bg-white p-8 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <DollarSign className="h-3 w-3" />
            Price Strategy
          </div>
          <p className="text-xl font-serif leading-tight">{data.priceTieringStrategy || 'Entry Luxury'}</p>
        </div>
        <div className="bg-white p-8 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            Market Sentiment
          </div>
          <p className="text-xl font-serif text-green-600">High Traction</p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Retailer Profile Allocation</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(data.targetRetailerProfiles || ['Selfridges', 'Bergdorf', 'Antonioli', 'SSENSE']).map((profile: string) => (
            <div key={profile} className="p-4 border bg-muted/10 flex flex-col items-center justify-center text-center gap-2 group hover:bg-white transition-all">
              <Package className="h-4 w-4 text-primary/20 group-hover:text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{profile}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/5 p-8 border italic font-serif text-sm leading-relaxed text-muted-foreground/80">
        <p className="mb-4 font-black uppercase tracking-widest not-italic text-[9px] text-primary/40">Director's Commercial Logic</p>
        {typeof data === 'string' ? data : "The suggested allocation maximizes visual impact for Tier 1 global luxury markets while maintaining commercial stability through higher core-garment volume in regional hubs."}
      </div>
    </div>
  );
};
