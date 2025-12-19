
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid3X3, List, Filter, Download, Share2, MoreHorizontal, Eye, BrainCircuit, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { Asset } from '@/types/dashboard';
import { cn } from '@/lib/utils';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, deleteAsset } = useDashboardStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // If we had real collections, we'd filter here. For now, we show the global archive.
  const displayAssets = assets;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <header className="px-8 lg:px-12 py-6 border-b border-border/50 bg-white sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/projects')} className="-ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-0.5">
            <h1 className="font-serif text-2xl italic leading-none">Collection Registry</h1>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Registry ID: {id || 'GLOBAL-ARC-01'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-sm mr-4">
            <button onClick={() => setView('grid')} className={cn("p-2 rounded-sm transition-all", view === 'grid' ? "bg-white shadow-sm" : "opacity-40")}><Grid3X3 className="h-4 w-4" /></button>
            <button onClick={() => setView('list')} className={cn("p-2 rounded-sm transition-all", view === 'list' ? "bg-white shadow-sm" : "opacity-40")}><List className="h-4 w-4" /></button>
          </div>
          <Button variant="outline" size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest px-6 rounded-none">
            <Share2 className="h-3.5 w-3.5 mr-2" /> Share Vault
          </Button>
          <Button size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest px-6 rounded-none" onClick={() => navigate('/dashboard/studio')}>
            Synthesis Lab
          </Button>
        </div>
      </header>

      <div className="flex-1 px-8 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
           <div className="flex gap-4">
             {['All Assets', 'Neural Synthesis', 'Technical', 'Press'].map(f => (
               <button key={f} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary/20 pb-1">{f}</button>
             ))}
           </div>
           <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest opacity-60">
             <Filter className="h-3.5 w-3.5 mr-2" /> Sorting: Neural Priority
           </Button>
        </div>

        {displayAssets.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-muted/10 border-2 border-dashed border-border rounded-none flex items-center justify-center opacity-20">
               <Grid3X3 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
               <p className="font-serif text-2xl italic">No assets indexed.</p>
               <p className="text-xs text-muted-foreground max-w-xs uppercase font-black tracking-widest leading-relaxed">Initiate visual synthesis in the studio to populate this registry.</p>
            </div>
            <Button onClick={() => navigate('/dashboard/studio')} variant="outline" className="h-14 px-10 rounded-none text-[10px] uppercase font-black tracking-widest">Open Studio</Button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-12",
            view === 'grid' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
          )}>
            {displayAssets.map((asset) => (
              <div 
                key={asset.id} 
                className={cn(
                  "group relative cursor-pointer animate-in fade-in duration-700",
                  view === 'list' && "flex items-center gap-10 p-10 bg-white border border-border shadow-sm hover:shadow-xl"
                )}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className={cn(
                  "relative bg-muted overflow-hidden border border-border transition-all group-hover:border-primary shadow-sm",
                  view === 'grid' ? "aspect-[3/4]" : "w-32 h-32 shrink-0"
                )}>
                  <img src={asset.thumbnail} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" alt={asset.title} />
                  {view === 'grid' && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                      <Button variant="secondary" size="sm" className="h-10 w-10 p-0 rounded-none bg-white/90"><Eye className="h-4 w-4" /></Button>
                      <Button variant="secondary" size="sm" className="h-10 w-10 p-0 rounded-none bg-white/90" onClick={(e) => { e.stopPropagation(); deleteAsset(asset.id); }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  )}
                </div>
                <div className="mt-6 space-y-2 flex-1">
                  <h3 className="text-xs font-black uppercase tracking-widest truncate group-hover:italic transition-all">{asset.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">{asset.metadata?.aspect || '3:4'} SYNTH</span>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">{asset.type.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-1 pt-2">
                    {asset.tags.map(t => <span key={t} className="px-1.5 py-0.5 border text-[7px] font-black uppercase tracking-widest text-muted-foreground/30">{t}</span>)}
                  </div>
                </div>
                {view === 'list' && (
                  <div className="flex items-center gap-10">
                    <div className="text-right space-y-1">
                      <p className="text-[8px] font-black uppercase text-muted-foreground">Neural Index</p>
                      <p className="text-sm font-serif italic text-primary">High Fidelity</p>
                    </div>
                    <button className="p-3 text-muted-foreground hover:text-primary transition-colors"><MoreHorizontal className="h-5 w-5" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 bg-white/95 z-[100] backdrop-blur-3xl flex animate-in fade-in duration-500 overflow-hidden">
           <div className="flex-1 p-20 flex items-center justify-center">
              <img src={selectedAsset.thumbnail} className="max-h-full max-w-full shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] border border-primary/5" alt="Asset Preview" />
           </div>
           <div className="w-[450px] border-l bg-white flex flex-col shadow-2xl relative z-20">
              <div className="p-10 border-b flex justify-between items-center bg-muted/5">
                 <div className="space-y-1">
                   <h2 className="font-serif text-2xl italic leading-none">{selectedAsset.title}</h2>
                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">System Metadata Record</p>
                 </div>
                 <button onClick={() => setSelectedAsset(null)} className="p-3 hover:bg-muted text-muted-foreground transition-all"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Strategic Analysis</p>
                    <div className="p-8 bg-primary text-white space-y-6 shadow-xl relative overflow-hidden group">
                       <div className="relative z-10 flex items-center gap-3">
                          <BrainCircuit className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Neural Narrative Sync</span>
                       </div>
                       <p className="relative z-10 text-[13px] leading-loose italic opacity-90 font-serif">
                         {selectedAsset.metadata?.analysis || "Autonomous intelligence has processed this vision. It is categorized as a pivotal design asset for SS25 European luxury portfolios."}
                       </p>
                       <div className="relative z-10 flex gap-4 pt-4 border-t border-white/10">
                          <button className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Audit History</button>
                          <button className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Regenerate Analysis</button>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Commercial Distribution</p>
                    <div className="space-y-px bg-border border border-border">
                       {[
                         { loc: 'Digital Press Kit', status: 'Synchronized', time: 'Just now' },
                         { loc: 'Wholesale Buy-Sheet', status: 'Linked', time: '2h ago' },
                         { loc: 'Paris Showroom', status: 'Pending Archival', time: '---' }
                       ].map(d => (
                         <div key={d.loc} className="flex justify-between items-center p-6 bg-white hover:bg-muted/10 transition-colors">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{d.loc}</span>
                              <p className="text-[8px] font-mono text-muted-foreground uppercase opacity-40">{d.time}</p>
                            </div>
                            <span className={cn(
                              "text-[9px] font-black uppercase tracking-tighter transition-all",
                              d.status === 'Synchronized' ? "text-green-600" : "text-primary/40"
                            )}>{d.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-10 border-t bg-white grid grid-cols-2 gap-4">
                 <Button className="rounded-none h-16 uppercase text-[10px] font-black tracking-widest shadow-xl">Master Download</Button>
                 <Button variant="outline" className="rounded-none h-16 uppercase text-[10px] font-black tracking-widest border-primary/10">Transfer Rights</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
