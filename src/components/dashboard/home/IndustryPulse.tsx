
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const IndustryPulse: React.FC = () => {
  const newsItems = [
    { category: "MARKET", title: "Luxury demand in Tier 1 China cities stabilizes after Q2 dip.", time: "12m ago" },
    { category: "CREATIVE", title: "Bio-sequin material surge detected in SS25 Paris collections.", time: "45m ago" },
    { category: "STRATEGY", title: "Shift toward 'Hyper-Tactility' in footwear design patterns.", time: "2h ago" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3"><Clock className="h-3 w-3" /> Industry Pulse</h2>
        <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Archive</Button>
      </div>
      <div className="space-y-px bg-border">
        {newsItems.map((item, idx) => (
          <div key={idx} className="bg-white p-6 flex justify-between items-center group hover:bg-muted/5 transition-all cursor-pointer">
            <div className="space-y-2">
              <span className="text-[8px] font-black px-2 py-0.5 border border-primary text-primary tracking-widest uppercase">{item.category}</span>
              <p className="text-sm font-medium group-hover:italic transition-all">{item.title}</p>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
