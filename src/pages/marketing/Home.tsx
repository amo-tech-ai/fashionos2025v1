import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { PlatformPromise } from '@/components/sections/PlatformPromise';
import { CoreCapabilities } from '@/components/sections/CoreCapabilities';
import { CreativeTalent } from '@/components/sections/CreativeTalent';
import { ProductionSimplified } from '@/components/sections/ProductionSimplified';
import { Button } from '@/components/ui/Button';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <PlatformPromise />
      <CoreCapabilities />
      <CreativeTalent />
      <ProductionSimplified />
      
      {/* Additional sections inline for brevity, normally separated */}
      <section className="py-32 bg-[#f4f4f4]">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl mb-8">Orchestrate The Moment</h2>
          <p className="max-w-2xl text-muted-foreground mb-12">
            Comprehensive tools for fashion weeks, private viewings, and global launches. 
            Manage guest lists, seating, and press with military precision.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
             <img src="https://picsum.photos/seed/runway1/400/400" className="w-full aspect-square object-cover" alt="Runway" />
             <img src="https://picsum.photos/seed/runway2/400/400" className="w-full aspect-square object-cover" alt="Backstage" />
             <img src="https://picsum.photos/seed/runway3/400/400" className="w-full aspect-square object-cover" alt="Event" />
             <img src="https://picsum.photos/seed/runway4/400/400" className="w-full aspect-square object-cover" alt="Seating" />
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="font-serif text-5xl mb-8">Intelligent <br/> Media Library</h2>
               <p className="text-muted-foreground mb-8">
                 Stop digging through Dropboxes. Our AI-powered DAM organizes your assets by campaign, model, season, and usage rights automatically.
               </p>
               <Button variant="outline">Explore DAM</Button>
             </div>
             <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/dam${i}/200/200`} className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all" alt="Asset" />
                ))}
             </div>
           </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-5xl mb-8">Ready to define the future?</h2>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 px-12 rounded-full">
            Create Your FashionOS Profile
          </Button>
        </div>
      </section>
    </>
  );
};