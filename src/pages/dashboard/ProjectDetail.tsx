
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid3X3, List, Filter, Download, Share2, MoreHorizontal, Eye, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface Asset {
  id: string;
  title: string;
  type: 'image' | 'video';
  thumbnail: string;
  tags: string[];
  dimensions: string;
  fileSize: string;
}

const MOCK_ASSETS: Asset[] = [
  { id: 'a1', title: 'Look 01 - Sculpted Silk', type: 'image', thumbnail: 'https://picsum.photos/seed/as1/800/1200', tags: ['Silk', 'SS25', 'Editorial'], dimensions: '4000x6000', fileSize: '12.4 MB' },
  { id: 'a2', title: 'Look 04 - Micro-Pleating Detail', type: 'image', thumbnail: 'https://picsum.photos/seed/as2/800/1200', tags: ['Detail', 'Texture'], dimensions: '3500x5200', fileSize: '8.1 MB' },
  { id: 'a3', title: 'Backstage Motion Capture', type: 'video', thumbnail: 'https://picsum.photos/seed/as3/800/1200', tags: ['Video', 'Backstage'], dimensions: '1920x1080', fileSize: '45.2 MB' },
  { id: 'a4', title: 'Campaign - Brutalist Backdrop', type: 'image', thumbnail: 'https://picsum.photos/seed/as4/800/1200', tags: ['Campaign', 'Architectural'], dimensions: '5000x7500', fileSize: '18.9 MB' },
  { id: 'a5', title: 'Textile Close-up', type: 'image', thumbnail: 'https://picsum.photos/seed/as5/800/1200', tags: ['Fabric', 'Macro'], dimensions: '2000x3000', fileSize: '4.2 MB' },
  { id: 'a6', title: 'Look 12 - Final Fitting', type: 'image', thumbnail: 'https://picsum.photos/seed/as6/800/1200', tags: ['Production', 'WIP'], dimensions: '3000x4500', fileSize: '9.7 MB' },
];

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <header className="px-8 lg:px-12 py-6 border-b border-border/50 bg-white sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/projects')} className="-ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-0.5">
            <h1 className="font-serif text-2xl italic leading-none">SS25 Mainline</h1>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Registry ID: {id || 'COL-001'}</p>
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
          <Button size="sm" className="h-10 text-[9px] font-black uppercase tracking-widest px-6 rounded-none">
            Add Asset
          </Button>
        </div>
      </header>

      <div className="flex-1 px-8 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
           <div className="flex gap-4">
             {['All', 'Images', 'Videos', 'Raw'].map(f => (
               <button key={f} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{f}</button>
             ))}
           </div>
           <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest opacity-60">
             <Filter className="h-3.5 w-3.5 mr-2" /> Sorting: Date Modified
           </Button>
        </div>

        <div className={cn(
          "grid gap-8",
          view === 'grid' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
        )}>
          {MOCK_ASSETS.map((asset) => (
            <div 
              key={asset.id} 
              className={cn(
                "group relative cursor-pointer",
                view === 'list' && "flex items-center gap-6 p-4 bg-white border border-border"
              )}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className={cn(
                "relative bg-muted overflow-hidden border border-border transition-all group-hover:border-primary",
                view === 'grid' ? "aspect-[3/4]" : "w-20 h-20 shrink-0"
              )}>
                <img src={asset.thumbnail} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt={asset.title} />
                {view === 'grid' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-none"><Eye className="h-3.5 w-3.5" /></Button>
                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-none"><Download className="h-3.5 w-3.5" /></Button>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-1 flex-1">
                <h3 className="text-xs font-bold truncate group-hover:italic transition-all">{asset.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">{asset.dimensions}</span>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">{asset.fileSize}</span>
                </div>
              </div>
              {view === 'list' && (
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {asset.tags.map(t => <span key={t} className="px-2 py-0.5 border text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">{t}</span>)}
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-primary"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedAsset && (
        <div className="fixed inset-0 bg-white/95 z-50 backdrop-blur-xl flex animate-in fade-in duration-300">
           <div className="flex-1 p-12 flex items-center justify-center">
              <img src={selectedAsset.thumbnail} className="max-h-full max-w-full shadow-2xl border" alt="Asset Preview" />
           </div>
           <div className="w-[400px] border-l bg-white flex flex-col">
              <div className="p-8 border-b flex justify-between items-center">
                 <h2 className="font-serif text-xl italic">{selectedAsset.title}</h2>
                 <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-muted"><ArrowLeft className="h-4 w-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Specification</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-muted/20 border border-border/50">
                          <p className="text-[8px] font-bold uppercase text-muted-foreground mb-1">Dimensions</p>
                          <p className="text-xs font-bold">{selectedAsset.dimensions}</p>
                       </div>
                       <div className="p-4 bg-muted/20 border border-border/50">
                          <p className="text-[8px] font-bold uppercase text-muted-foreground mb-1">Color Depth</p>
                          <p className="text-xs font-bold">16-bit ProPhoto</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asset Intelligence</p>
                    <div className="p-6 bg-primary text-white space-y-4">
                       <div className="flex items-center gap-3">
                          <BrainCircuit className="h-4 w-4 opacity-50" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Neural Tagging Active</span>
                       </div>
                       <p className="text-xs leading-relaxed opacity-80 italic">
                         "AI identifies this as a signature piece. Silhouette suggests high editorial traction for SS25 European markets."
                       </p>
                       <Button variant="outline" className="w-full border-white/20 text-white rounded-none h-10 text-[9px] uppercase font-black">
                          Run Fabric Analysis
                       </Button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Distribution</p>
                    <div className="space-y-2">
                       {[
                         { loc: 'Paris Showroom', status: 'Available' },
                         { loc: 'NY Distribution', status: 'Queued' },
                         { loc: 'Digital Press Kit', status: 'Live' }
                       ].map(d => (
                         <div key={d.loc} className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{d.loc}</span>
                            <span className="text-[9px] font-black uppercase text-green-600">{d.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-8 border-t bg-white grid grid-cols-2 gap-3">
                 <Button className="rounded-none h-12 uppercase text-[9px] font-black tracking-widest">Download Raw</Button>
                 <Button variant="outline" className="rounded-none h-12 uppercase text-[9px] font-black tracking-widest">Transfer Rights</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
