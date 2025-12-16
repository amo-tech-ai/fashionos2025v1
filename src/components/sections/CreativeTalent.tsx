import React from 'react';

export const CreativeTalent: React.FC = () => {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/3">
           <h2 className="font-serif text-5xl mb-6">World-Class <br/> Creative Talent</h2>
           <p className="text-muted-foreground mb-8">Access a curated network of industry professionals. From editorial photographers to set designers, build your dream team in minutes.</p>
           <ul className="space-y-4 font-medium text-sm border-l-2 border-primary pl-6">
             <li>Photography</li>
             <li>Styling</li>
             <li>Set Design</li>
             <li>Art Direction</li>
           </ul>
        </div>
        <div className="w-full md:w-2/3 relative h-[600px]">
           <img 
             src="https://picsum.photos/seed/talent1/400/600" 
             className="absolute top-0 left-0 w-64 h-80 object-cover shadow-lg z-10" 
             alt="Talent 1" 
           />
           <img 
             src="https://picsum.photos/seed/talent2/450/650" 
             className="absolute top-12 left-48 w-72 h-96 object-cover shadow-2xl z-20 grayscale" 
             alt="Talent 2" 
           />
           <img 
             src="https://picsum.photos/seed/talent3/400/500" 
             className="absolute bottom-0 right-12 w-64 h-80 object-cover shadow-lg z-10" 
             alt="Talent 3" 
           />
        </div>
      </div>
    </section>
  );
};