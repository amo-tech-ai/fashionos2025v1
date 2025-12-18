
import React from 'react';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-24 items-center relative z-10">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">Established MMXXIV</span>
            <h1 className="font-serif text-7xl md:text-9xl leading-[0.8] text-primary tracking-tighter">
              The <br/>
              <span className="italic pl-4">Digital</span> <br/>
              Couture <br/>
              <span className="text-muted-foreground/40">OS</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-sm leading-relaxed font-medium">
            Strategic intelligence and creative synthesis for the world's leading luxury houses.
          </p>
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="rounded-none px-12 h-16 uppercase text-[10px] font-black tracking-widest shadow-xl">Initiate Session</Button>
            <Button size="lg" variant="outline" className="rounded-none px-12 h-16 uppercase text-[10px] font-black tracking-widest hover:bg-muted transition-all">Platform Film</Button>
          </div>
        </div>
        <div className="relative h-[700px] w-full hidden md:flex items-center justify-center">
           <div className="absolute top-0 right-0 w-[80%] h-full bg-muted border border-primary/5 overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/fashion_editorial/1000/1500" 
                alt="Editorial Fashion" 
                className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105"
              />
           </div>
           <div className="absolute -bottom-10 -left-10 w-2/3 h-2/3 bg-white p-4 shadow-2xl border border-primary/5 z-20 transition-transform duration-700 hover:-translate-y-4">
              <img 
                src="https://picsum.photos/seed/fashion_detail/800/1200" 
                alt="Detail Shot" 
                className="w-full h-full object-cover"
              />
           </div>
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary flex items-center justify-center z-30 shadow-2xl">
              <div className="text-white text-center">
                <p className="text-[8px] font-black tracking-widest uppercase mb-1">Status</p>
                <p className="text-sm font-serif italic">V.1.0</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
