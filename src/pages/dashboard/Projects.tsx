
import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Projects: React.FC = () => {
  const collections = [
    { title: "SS25 Mainline", items: 24, date: "Sept 2024", id: "01" },
    { title: "Resort 25 Capsule", items: 12, date: "July 2024", id: "02" },
    { title: "Winter Outerwear", items: 8, date: "Dec 2024", id: "03" },
    { title: "Editorial Archives", items: 156, date: "2023-24", id: "04" },
    { title: "Sustainable Denim", items: 31, date: "Oct 2024", id: "05" },
    { title: "High Jewelry", items: 6, date: "Nov 2024", id: "06" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b pb-8">
        <div className="space-y-1">
          <h1 className="font-serif text-4xl italic">Collections</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Digital Asset Management</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="rounded-none"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
           <Button size="sm" className="rounded-none"><Plus className="h-4 w-4 mr-2" /> New Entry</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {collections.map((col) => (
          <div key={col.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4 border">
              <img 
                src={`https://picsum.photos/seed/coll${col.id}/600/800`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={col.title}
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 left-4">
                 <span className="text-[10px] font-bold text-white bg-black px-2 py-1 uppercase tracking-widest">{col.id}</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-serif text-xl group-hover:italic transition-all">{col.title}</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{col.items} Assets • {col.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
