import React from 'react';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl">Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="group relative aspect-[3/4] bg-muted overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/proj${i}/400/600`} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              alt="Project"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-medium">SS25 Campaign {i}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};