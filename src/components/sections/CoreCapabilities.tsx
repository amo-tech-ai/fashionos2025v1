import React from 'react';
import { Activity, Camera, Globe, ShoppingBag, Zap, BarChart } from 'lucide-react';

const capabilities = [
  { icon: Activity, title: 'Brand', desc: 'Manage identity and assets globally.' },
  { icon: Camera, title: 'Events', desc: 'Runway orchestration and seating.' },
  { icon: Zap, title: 'Creative', desc: 'Campaign planning and production.' },
  { icon: Globe, title: 'Digital', desc: 'Virtual showrooms and meta-commerce.' },
  { icon: ShoppingBag, title: 'Commerce', desc: 'Wholesale and direct-to-consumer.' },
  { icon: BarChart, title: 'Intelligence', desc: 'Real-time market analytics.' },
];

export const CoreCapabilities: React.FC = () => {
  return (
    <section className="py-20 bg-background border-t border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
           {capabilities.map((item, idx) => (
             <div key={idx} className="bg-background p-12 hover:bg-muted/10 transition-colors group">
                <item.icon className="w-8 h-8 mb-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};