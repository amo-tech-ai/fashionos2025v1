
import React from 'react';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface TaskBoardProps {
  tasks: Task[];
  onOpenDetail: (id: string) => void;
  onQuickAdd: (phase: string) => void;
}

const STAGES = ['Concept', 'Sourcing', 'Production', 'Logistics'];

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onOpenDetail, onQuickAdd }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      {STAGES.map((stage) => {
        const stageTasks = tasks.filter(t => t.phase === stage);
        return (
          <div key={stage} className="space-y-8">
            <div className="flex items-center justify-between border-b border-primary/5 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stage}</h3>
              <span className="text-[10px] font-bold text-muted-foreground/40">{stageTasks.length}</span>
            </div>
            <div className="space-y-4">
              {stageTasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => onOpenDetail(task.id)}
                  className="group bg-white border border-border p-6 hover:border-primary transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      task.status === 'at-risk' ? "bg-destructive animate-pulse" : 
                      task.status === 'completed' ? "bg-primary" : "bg-muted-foreground/20"
                    )} />
                    <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">{task.dueDate}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg leading-tight group-hover:italic transition-all">{task.title}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{task.owner}</p>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground/40">
                     {task.blocking && <AlertCircle className="h-3 w-3 text-destructive/40" />}
                     <div className="flex items-center gap-1">
                       <CheckCircle2 className="h-3 w-3" />
                       <span className="text-[9px] font-bold">{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}</span>
                     </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => onQuickAdd(stage)}
                className="w-full py-4 border border-dashed border-border text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-3 w-3" /> Insert Deliverable
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
