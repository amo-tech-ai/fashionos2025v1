
import React from 'react';
import { Users, Link as LinkIcon, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface PowerClustersProps {
  analysis: string | null;
}

export const PowerClusters: React.FC<PowerClustersProps> = ({ analysis }) => {
  if (!analysis) return null;

  // Simple heuristic to split AI text into visual clusters
  const clusters = analysis.split(/Cluster \d+:|Power Cluster \d+:/g).filter(c => c.trim().length > 10).slice(0, 3);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex items-center gap-3 border-b pb-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Alignment Strategy</h3>
      </div>

      <div className="grid gap-6">
        {clusters.map((cluster, idx) => (
          <Card key={idx} className="rounded-none border-primary/5 bg-white shadow-sm overflow-hidden group">
            <CardContent className="p-0 flex h-full">
              <div className="w-1 bg-primary group-hover:w-3 transition-all duration-500" />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/40">Power Cluster 0{idx + 1}</span>
                  <LinkIcon className="h-3 w-3 text-primary/20" />
                </div>
                <p className="text-xs font-serif italic leading-relaxed text-foreground/80">
                  {cluster.trim().split('\n')[0]}
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 opacity-60">
                  {cluster.trim().split('\n').slice(1).join(' ')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-6 bg-primary text-white space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3 opacity-40" />
          <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Director's Memo</span>
        </div>
        <p className="text-[10px] leading-relaxed italic font-serif opacity-90">
          Neural mapping suggests these clusters maximize secondary market coverage by aligning tier-1 influencers with boutique retail buyers.
        </p>
      </div>
    </div>
  );
};
