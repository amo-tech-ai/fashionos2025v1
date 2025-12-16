import React from 'react';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] text-primary">
            The <br/>
            <span className="italic">Future</span> of <br/>
            Fashion <br/>
            Intelligence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
            Orchestrate your entire fashion lifecycle. From runway to retail, creativity to commerce.
          </p>
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="rounded-full px-12">Start Now</Button>
            <Button size="lg" variant="outline" className="rounded-full px-12">View Film</Button>
          </div>
        </div>
        <div className="relative h-[600px] w-full hidden md:block">
           <div className="absolute top-0 right-0 w-3/4 h-full bg-slate-200 overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="https://picsum.photos/seed/fashion1/800/1200" 
                alt="Editorial Fashion" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
           </div>
           <div className="absolute bottom-12 left-0 w-1/2 h-2/3 bg-white p-2 shadow-xl rounded-sm">
              <img 
                src="https://picsum.photos/seed/fashion2/600/900" 
                alt="Detail Shot" 
                className="w-full h-full object-cover"
              />
           </div>
        </div>
      </div>
    </section>
  );
};