
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const StrategicForecast: React.FC = () => (
  <Card className="bg-primary text-primary-foreground rounded-none shadow-2xl border-none overflow-hidden group">
    <CardHeader className="p-8 pb-0">
       <div className="flex justify-between items-center mb-4">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Strategic Forecast</h3>
       </div>
    </CardHeader>
    <CardContent className="p-8 space-y-6">
       <div className="aspect-[4/3] bg-white/10 relative overflow-hidden">
          <img src="https://picsum.photos/seed/forecast2/600/450" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Forecast" />
          <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
       </div>
       <div className="space-y-3">
         <p className="text-2xl font-serif italic leading-tight">"The Resurgence of Tonal Layering"</p>
         <p className="text-xs text-primary-foreground/60 leading-relaxed font-medium">Neural pattern matching detects a consistent pivot toward monochromatic textures in high-performing social campaigns.</p>
       </div>
       <Button variant="outline" className="w-full border-white/20 hover:bg-white text-primary-foreground hover:text-primary rounded-none uppercase text-[10px] font-bold h-14 transition-all">Access Brief</Button>
    </CardContent>
  </Card>
);
