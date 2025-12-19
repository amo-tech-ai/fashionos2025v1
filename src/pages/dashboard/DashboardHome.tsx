
import React from 'react';
import { StatsGrid } from '@/components/dashboard/home/StatsGrid';
import { StakeholderIntelligence } from '@/components/dashboard/home/StakeholderIntelligence';
import { IndustryPulse } from '@/components/dashboard/home/IndustryPulse';
import { StrategicForecast } from '@/components/dashboard/home/StrategicForecast';
import { DigitalTrunk } from '@/components/dashboard/home/DigitalTrunk';
import { useDashboardStore } from '@/hooks/useDashboardStore';

export const DashboardHome: React.FC = () => {
  const { metrics } = useDashboardStore();

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-20 px-4 md:px-0 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-primary/5 pb-10">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Command Center</p>
          <h1 className="font-serif text-6xl leading-[0.9] tracking-tighter">Director <br/><span className="italic">Workspace.</span></h1>
        </div>
        <div className="flex gap-8 items-center bg-white border p-6 shadow-sm">
          <div className="space-y-1 text-center">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Index</p>
            <p className="text-xl font-serif">14.2% <span className="text-xs text-green-600 font-sans font-bold">▲</span></p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="space-y-1 text-center">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">System Load</p>
            <p className="text-xl font-serif flex items-center gap-2">Optimal <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /></p>
          </div>
        </div>
      </header>

      <StatsGrid metrics={metrics} />

      <DigitalTrunk />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           <StakeholderIntelligence />
           <IndustryPulse />
        </div>
        <aside className="space-y-12">
          <StrategicForecast />
          <div className="p-10 border border-primary/10 bg-muted/5 space-y-6">
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Session Continuity</p>
             <p className="text-sm italic font-serif leading-relaxed opacity-60">
               "Orchestrator has analyzed 156 assets this session. No critical path violations detected. Digital trunk synchronized with Paris Logistics."
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
