
import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { PlatformPromise } from '@/components/sections/PlatformPromise';
import { CoreCapabilities } from '@/components/sections/CoreCapabilities';
import { CreativeTalent } from '@/components/sections/CreativeTalent';
import { ProductionSimplified } from '@/components/sections/ProductionSimplified';
import { Button } from '@/components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="bg-background selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <PlatformPromise />
      <CoreCapabilities />
      <CreativeTalent />
      <ProductionSimplified />
      
      <section className="py-40 bg-[#0a0a0a] text-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="space-y-4 mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Event Orchestration</span>
            <h2 className="font-serif text-6xl md:text-8xl italic tracking-tighter leading-none">The Runway, <br/> Redefined.</h2>
          </div>
          <p className="max-w-2xl text-white/60 text-lg mb-16 leading-relaxed">
            From private viewings to global launches. Manage digital guest lists, real-time seating charts, and instant press kits with military-grade precision.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 w-full max-w-6xl border border-white/10">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square relative overflow-hidden group">
                 <img 
                   src={`https://picsum.photos/seed/runway${i}/800/800`} 
                   className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                   alt={`Runway ${i}`} 
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest border border-white px-4 py-2">View Gallery</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-40 border-t">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-24 items-center">
             <div className="space-y-8">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Media Intelligence</span>
               <h2 className="font-serif text-6xl tracking-tighter leading-[0.9]">Autonomous <br/> Digital Assets.</h2>
               <p className="text-muted-foreground text-lg leading-relaxed">
                 Eliminate manual tagging. Our neural DAM organizes high-resolution assets by silhouette, color, and model automatically. Rights management included by default.
               </p>
               <div className="pt-4">
                 <Button variant="outline" className="rounded-none px-12 h-14 uppercase text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all">Explore Platform</Button>
               </div>
             </div>
             <div className="grid grid-cols-3 gap-1 bg-muted/20 p-1">
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/dam${i}/400/400`} 
                    className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" 
                    alt="Digital Asset" 
                  />
                ))}
             </div>
           </div>
        </div>
      </section>

      <section className="py-40 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <img src="https://picsum.photos/seed/texture/1920/1080" className="w-full h-full object-cover" alt="Background Texture" />
        </div>
        <div className="container mx-auto px-4 relative z-10 space-y-12">
          <h2 className="font-serif text-7xl md:text-9xl tracking-tighter italic leading-none">Ready to <br/> orchestrate?</h2>
          <Link to="/login">
            <Button size="lg" className="bg-white text-black hover:bg-muted px-20 h-20 uppercase text-[10px] font-black tracking-[0.3em] rounded-none shadow-2xl transition-transform hover:-translate-y-2">
              Apply for Access
            </Button>
          </Link>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Selected partners only. Inquire for pricing.</p>
        </div>
      </section>
    </div>
  );
};
