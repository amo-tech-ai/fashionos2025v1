
import React from 'react';
import { WorkflowMetrics } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { Activity, Target, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SummaryDetailsProps {
  metrics: WorkflowMetrics;
}

export const SummaryDetails: React.FC<SummaryDetailsProps> = ({ metrics }) => (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Health</span>
      </div>
      <p className="font-serif text-2xl italic leading-tight text-foreground">
        {metrics.atRisk > 0 
          ? `${metrics.atRisk} deliverables are currently compromising the critical path.`
          : "All operational nodes are synchronized."}
      </p>
    </div>

    <div className="space-y-px bg-border border border-border">
      {[
        { label: 'Project Nodes', value: metrics.total, icon: Target, color: 'text-primary' },
        { label: 'Pending Queue', value: metrics.pending, icon: Activity, color: 'text-muted-foreground' },
        { label: 'Verified Complete', value: metrics.completed, icon: CheckCircle2, color: 'text-green-600' },
        { label: 'Critical Risk', value: metrics.atRisk, icon: ShieldAlert, color: metrics.atRisk > 0 ? 'text-destructive' : 'text-muted-foreground/40' },
      ].map((stat) => (
        <div key={stat.label} className="bg-white p-8 flex justify-between items-center group hover:bg-muted/5 transition-all">
          <div className="flex items-center gap-4">
            <stat.icon className={cn("h-4 w-4", stat.color)} />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              {stat.label}
            </span>
          </div>
          <span className={cn("text-3xl font-serif leading-none", stat.color)}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>

    <div className="p-10 bg-primary text-white space-y-4 shadow-xl">
       <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] opacity-40">
          Director's Executive Summary
       </div>
       <p className="text-xs leading-loose italic opacity-90 font-serif">
         Workflow metrics indicate a {metrics.atRisk > 0 ? 'potential bottleneck in Phase 2' : 'stable execution trajectory'}. {metrics.completed > metrics.total / 2 ? 'Momentum is high.' : 'Initial phase stabilization complete.'}
       </p>
    </div>
  </div>
);
