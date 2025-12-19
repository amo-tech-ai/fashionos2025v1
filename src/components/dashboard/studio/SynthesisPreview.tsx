
import React from 'react';
import { Expand, Loader2, Check, Save, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SynthesisPreviewProps {
  assetUrl: string | null;
  type: 'image' | 'video';
  loading: boolean;
  aspect: string;
  isSaved: boolean;
  onSave: () => void;
}

export const SynthesisPreview: React.FC<SynthesisPreviewProps> = ({
  assetUrl,
  type,
  loading,
  aspect,
  isSaved,
  onSave
}) => {
  return (
    <div className={cn(
      "relative bg-muted/20 flex items-center justify-center border border-primary/5 transition-all duration-1000 shadow-inner overflow-hidden",
      aspect === "3:4" ? "aspect-[3/4]" : aspect === "16:9" ? "aspect-video" : aspect === "9:16" ? "aspect-[9/16]" : "aspect-square"
    )}>
      {assetUrl ? (
        type === 'image' ? (
          <img src={assetUrl} className="w-full h-full object-cover animate-in zoom-in-95" alt="Output" />
        ) : (
          <video src={assetUrl} autoPlay loop muted className="w-full h-full object-cover animate-in zoom-in-95" />
        )
      ) : (
        <div className="text-center opacity-30 flex flex-col items-center gap-6 animate-pulse">
          <Expand className="h-16 w-16" />
          <p className="font-serif text-xl italic tracking-tight">Virtual Atelier Awaiting Input</p>
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center space-y-6 z-20">
           <Loader2 className="h-12 w-12 animate-spin text-primary" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Synchronizing Neural Assets</p>
        </div>
      )}
      {assetUrl && !loading && (
        <div className="absolute bottom-10 right-10 flex gap-4">
           <Button onClick={onSave} variant="secondary" className="bg-white/80 backdrop-blur h-14 px-8 rounded-none border border-black/5 shadow-2xl transition-all hover:bg-white">
              {isSaved ? <><Check className="h-4 w-4 mr-2" /> Archived to Registry</> : <><Save className="h-4 w-4 mr-2" /> Archive to Collection</>}
           </Button>
        </div>
      )}
    </div>
  );
};
