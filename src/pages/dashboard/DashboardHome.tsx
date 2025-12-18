
import React from 'react';
import { TrendingUp, Users, Target, Zap, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Market Sentiment', value: '+14.2%', icon: TrendingUp, color: "text-green-600" },
    { label: 'Intelligence Depth', value: '88.4', icon: Users, color: "text-primary" },
    { label: 'Trend Captures', value: '1,240', icon: Target, color: "text-primary" },
    { label: 'Studio Credits', value: '45', icon: Zap, color: "text-orange-500" },
  ];

  const newsItems = [
    { category: "MARKET", title: "Luxury demand in Tier 1 China cities stabilizes after Q2 dip.", time: "12m ago" },
    { category: "CREATIVE", title: "Bio-sequin material surge detected in SS25 Paris collections.", time: "45m ago" },
    { category: "STRATEGY", title: "Shift toward 'Hyper-Tactility' in footwear design patterns.", time: "2h ago" },
  ];

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-primary/5 pb-10">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Studio Session: ALX-400-MCQ</p>
          <h1 className="font-serif text-6xl leading-[0.9] tracking-tighter">Welcome back, <br/><span className="italic">Director.</span></h1>
        </div>
        <div className="flex gap-8 items-center bg-white border p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Index</p>
            <p className="text-xl font-serif">14.2% <span className="text-xs text-green-600 font-sans font-bold">▲</span></p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">System Status</p>
            <p className="text-xl font-serif flex items-center gap-2">Optimal <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /></p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 border border-primary/5">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-none border-none shadow-none bg-white hover:bg-muted/5 transition-all cursor-default">
            <CardContent className="p-8 space-y-4">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <div>
                <p className="text-4xl font-serif tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
           <section className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <Clock className="h-3 w-3" />
                   Industry Pulse (Real-time)
                </h2>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Archive</Button>
              </div>
              <div className="space-y-1">
                {newsItems.map((item, idx) => (
                  <div key={idx} className="bg-white border-b border-l-2 border-l-transparent p-6 flex justify-between items-center group hover:border-l-primary hover:bg-muted/10 transition-all cursor-pointer">
                    <div className="space-y-2">
                      <span className="text-[8px] font-black px-2 py-0.5 border border-primary text-primary tracking-widest">{item.category}</span>
                      <p className="text-sm font-medium group-hover:italic transition-all">{item.title}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
                       <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
           </section>
        </div>

        <aside className="space-y-8">
          <Card className="bg-primary text-primary-foreground rounded-none shadow-2xl border-none">
            <CardHeader className="p-8 pb-0">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Strategic Forecast</h3>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="aspect-[4/3] bg-white/10 relative overflow-hidden group">
                  <img src="https://picsum.photos/seed/forecast2/600/450" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20" />
               </div>
               <div className="space-y-2">
                 <p className="text-xl font-serif italic">"The Resurgence of Tonal Layering"</p>
                 <p className="text-xs text-primary-foreground/60 leading-relaxed">
                   Neural pattern matching detects a consistent pivot toward monochromatic textures in high-performing social campaigns.
                 </p>
               </div>
               <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white rounded-none uppercase text-[10px] font-bold tracking-widest h-12">
                  View Full Brief
               </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};
