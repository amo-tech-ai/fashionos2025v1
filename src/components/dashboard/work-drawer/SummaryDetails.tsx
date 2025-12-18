
import React from 'react';
import { WorkflowMetrics } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface SummaryDetailsProps {
  metrics: WorkflowMetrics;
}

export const SummaryDetails: React.FC<SummaryDetailsProps> = ({ metrics }) => (
  <div className="space-y-12">
    <div className="space-y-2">
      <p className="font-serif text-xl italic leading-tight">
        {metrics.atRisk > 0 
          ? `${metrics.atRisk} tasks require immediate attention.`
          : "Workflow is currently optimal."}
      </p>
    </div>

    <div className="space-y-6 pt-6">
      {[
        { label: 'Total Objects', value: metrics.total, color: 'text-primary' },
        { label: 'Pending Status', value: metrics.pending, color: 'text-muted-foreground' },
        { label: 'Completed', value: metrics.completed, color: 'text-muted-foreground' },
        { label: 'At Risk', value: metrics.atRisk, color: metrics.atRisk > 0 ? 'text-destructive' : 'text-muted-foreground' },
      ].map((stat) => (
        <div key={stat.label} className="flex justify-between items-end border-b border-border/40 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            {stat.label}
          </span>
          <span className={cn("text-2xl font-serif leading-none", stat.color)}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);
