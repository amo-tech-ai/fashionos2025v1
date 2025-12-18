
import React, { useState } from 'react';
import { BarChart3, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WorkDrawer } from '@/components/dashboard/WorkDrawer';
import { Task } from '@/types/dashboard';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

const STAGES = ['Concept', 'Sourcing', 'Production', 'Logistics'];

export const Tasks: React.FC = () => {
  const { tasks, metrics, addTask } = useDashboardStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'summary' | 'detail'>('summary');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleOpenSummary = () => {
    setDrawerMode('summary');
    setSelectedTaskId(null);
    setIsDrawerOpen(true);
  };

  const handleOpenDetail = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDrawerMode('detail');
    setIsDrawerOpen(true);
  };

  const handleQuickAdd = (stage: string) => {
    addTask({
      title: 'New Requirement',
      status: 'pending',
      phase: stage,
      description: 'Define specific project deliverables.',
      dueDate: new Date().toLocaleDateString(),
      owner: 'Unassigned',
      subtasks: []
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <div className="flex-1 px-8 lg:px-12 py-10 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div className="space-y-3">
            <h1 className="font-serif text-5xl tracking-tight leading-none">Tasks & Deliverables</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Workflow Orchestration</p>
          </div>
          <div className="flex gap-4">
             <Button variant="ghost" size="sm" className="h-10 px-4 rounded-none border border-border/50 bg-white" onClick={handleOpenSummary}>
               <BarChart3 className="h-4 w-4 mr-2" /> View Dashboard
             </Button>
             <Button 
               onClick={() => handleQuickAdd('Concept')}
               className="h-10 px-6 rounded-none text-[10px] font-black uppercase tracking-widest"
             >
               <Plus className="h-4 w-4 mr-2" /> New Deliverable
             </Button>
          </div>
        </header>

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
                      onClick={() => handleOpenDetail(task.id)}
                      className="group bg-white border border-border p-6 hover:border-primary transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-md"
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
                    onClick={() => handleQuickAdd(stage)}
                    className="w-full py-4 border border-dashed border-border text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="h-3 w-3" /> Add Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <WorkDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        selectedTaskId={selectedTaskId}
      />
    </div>
  );
};
