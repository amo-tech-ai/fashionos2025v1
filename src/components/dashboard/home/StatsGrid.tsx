
import React from 'react';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { WorkflowMetrics } from '@/types/dashboard';

interface StatsGridProps {
  metrics: WorkflowMetrics;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ metrics }) => {
  const stats = [
    { label: 'Market Sentiment', value: '+14.2%', icon: TrendingUp, color: "text-green-600" },
    { label: 'Budget Utilization', value: `${metrics.budgetUtilization}%`, icon: BarChart3, color: "text-primary" },
    { label: 'Active Tasks', value: metrics.total.toString(), icon: Target, color: "text-primary" },
    { label: 'Intelligence Depth', value: '88.4', icon: Users, color: "text-primary" },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 border border-primary/5 shadow-sm">
      {stats.map((stat, i) => (
        <Card key={i} className="rounded-none border-none shadow-none bg-white hover:bg-muted/5 transition-all cursor-default group">
          <CardContent className="p-8 space-y-4">
            <stat.icon className={`h-4 w-4 ${stat.color} transition-transform group-hover:scale-110`} />
            <div>
              <p className="text-4xl font-serif tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
