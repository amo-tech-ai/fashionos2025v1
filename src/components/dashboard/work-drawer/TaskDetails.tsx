
import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Sparkles, Loader2, ListChecks } from 'lucide-react';
import { Task } from '@/types/dashboard';
import { AIInsight } from './AIInsight';
import { generateTaskInsight } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useDashboardStore } from '@/hooks/useDashboardStore';

interface TaskDetailsProps {
  task: Task;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const { toggleSubtask } = useDashboardStore();
  const [insight, setInsight] = useState<string | undefined>(task.aiInsight);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateInsight = async () => {
    setIsGenerating(true);
    try {
      const result = await generateTaskInsight(task);
      setInsight(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const completedCount = task.subtasks.filter(s => s.completed).length;
  const totalCount = task.subtasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <span>{task.phase}</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span className={cn(
            task.status === 'at-risk' ? 'text-destructive' : 'text-primary'
          )}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        <h2 className="font-serif text-3xl leading-tight">
          {task.title}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
           <div className="flex items-center gap-2">
             <ListChecks className="h-3 w-3" />
             <span>Execution Progress</span>
           </div>
           <span>{completedCount} / {totalCount} completed</span>
        </div>
        <div className="h-1 bg-muted w-full overflow-hidden">
           <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercent}%` }}
           />
        </div>
      </div>

      {task.blocking && (
        <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
          <p className="text-xs font-medium text-destructive leading-relaxed">
            This task blocks: <span className="underline underline-offset-4">{task.blocking}</span>
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</h4>
        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
          {task.description}
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Checklist</h4>
        <div className="space-y-2">
          {task.subtasks.map(sub => (
            <div 
              key={sub.id} 
              onClick={() => toggleSubtask(task.id, sub.id)}
              className="flex items-center gap-3 group cursor-pointer p-2 -mx-2 hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "w-4 h-4 border border-border flex items-center justify-center transition-colors shrink-0",
                sub.completed ? "bg-primary border-primary" : "group-hover:border-primary"
              )}>
                {sub.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                sub.completed ? "text-muted-foreground line-through opacity-60" : "text-foreground"
              )}>
                {sub.label}
              </span>
            </div>
          ))}
          {task.subtasks.length === 0 && (
            <p className="text-xs italic text-muted-foreground">No defined subtasks.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border/50">
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Due Date</span>
          <p className="text-xs font-bold italic font-serif">{task.dueDate}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Owner</span>
          <p className="text-xs font-bold uppercase tracking-tighter">{task.owner}</p>
        </div>
      </div>

      <div className="space-y-4 pb-10">
        {insight ? (
          <AIInsight text={insight} />
        ) : (
          <div className="p-6 border border-dashed border-border/50 bg-muted/5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-muted-foreground/40" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Strategic Analysis Available</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic leading-relaxed">
              Synthesize task context to generate an autonomous execution strategy.
            </p>
            <Button 
              variant="outline" 
              className="w-full h-10 text-[9px] uppercase font-black tracking-widest rounded-none border-primary/10 hover:bg-primary/5 transition-all"
              onClick={handleGenerateInsight}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  Orchestrating
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 mr-2" />
                  Generate Strategy
                </>
              )}
            </Button>
          </div>
        )}
        
        {insight && !isGenerating && (
          <button 
            onClick={handleGenerateInsight}
            className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors flex items-center gap-2 ml-auto"
          >
            <Sparkles className="h-2 w-2" />
            Recalibrate Insight
          </button>
        )}
      </div>
    </div>
  );
};
