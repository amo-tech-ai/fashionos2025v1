
import React, { useState } from 'react';
import { BarChart3, Plus, Sparkles, ShieldAlert, Workflow, Zap, BrainCircuit, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { WorkDrawer } from '@/components/dashboard/WorkDrawer';
import { TaskBoard } from '@/components/dashboard/tasks/TaskBoard';
import { RiskCenter } from '@/components/dashboard/tasks/RiskCenter';
import { WorkflowOrchestrator } from '@/components/dashboard/tasks/WorkflowOrchestrator';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

export const Tasks: React.FC = () => {
  const { tasks, addTask } = useDashboardStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'summary' | 'detail'>('summary');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'orchestration' | 'risk'>('orchestration');
  const [showAiOrchestrator, setShowAiOrchestrator] = useState(false);

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
      subtasks: [],
      priority: 'medium',
      costCenter: 'GLOBAL-OS'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <div className="flex-1 px-8 lg:px-12 py-10 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div className="space-y-3">
            <h1 className="font-serif text-5xl tracking-tight leading-none">Workflow Control</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Lifecycle Orchestration</p>
          </div>
          <div className="flex gap-4">
             <div className="flex bg-muted p-1 rounded-none gap-1">
               <button 
                onClick={() => setActiveTab('orchestration')}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === 'orchestration' ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                )}
               >
                 Orchestration
               </button>
               <button 
                onClick={() => setActiveTab('risk')}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  activeTab === 'risk' ? "bg-white shadow-sm text-destructive" : "text-muted-foreground"
                )}
               >
                 <ShieldAlert className="h-3 w-3" />
                 Risk Center
               </button>
             </div>
             <Button variant="ghost" size="sm" className="h-10 px-4 rounded-none border border-border/50 bg-white" onClick={handleOpenSummary}>
               <BarChart3 className="h-4 w-4 mr-2" /> Metrics
             </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "h-12 px-6 rounded-none border-primary/20 bg-white hover:bg-primary text-primary hover:text-white transition-all",
                      showAiOrchestrator && "bg-primary text-white border-primary"
                    )}
                    onClick={() => setShowAiOrchestrator(!showAiOrchestrator)}
                >
                  <Sparkles className="h-4 w-4 mr-2" /> 
                  {showAiOrchestrator ? "Close Synthesis" : "AI Workflow Generator"}
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button 
                  variant="ghost" 
                  onClick={() => handleQuickAdd('Concept')}
                  className="h-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" /> Quick Task
                </Button>
              </div>
            </div>

            {showAiOrchestrator && (
              <WorkflowOrchestrator onClose={() => setShowAiOrchestrator(false)} />
            )}

            <TaskBoard 
              tasks={tasks}
              onOpenDetail={handleOpenDetail}
              onQuickAdd={handleQuickAdd}
            />
          </div>

          <aside className="lg:col-span-4 space-y-12">
             {activeTab === 'risk' ? (
               <RiskCenter tasks={tasks} />
             ) : (
               <div className="space-y-10">
                 <Card className="rounded-none border-primary/5 bg-primary text-white shadow-2xl overflow-hidden group">
                    <CardContent className="p-10 space-y-8">
                      <div className="flex items-center gap-3">
                         <BrainCircuit className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Orchestrator Status</span>
                      </div>
                      <p className="text-2xl font-serif italic leading-tight">"System is maintaining {tasks.length} active delivery nodes."</p>
                      <p className="text-xs opacity-60 leading-relaxed font-medium">
                        Autonomous monitoring active for critical path drift and vendor dependency risks.
                      </p>
                      <Button variant="outline" className="w-full border-white/20 hover:bg-white text-white hover:text-primary rounded-none h-14 uppercase text-[10px] font-black tracking-widest transition-all">
                        Delegate All Tasks
                      </Button>
                    </CardContent>
                 </Card>

                 <div className="p-10 border border-dashed border-border space-y-6">
                    <div className="flex items-center gap-2">
                       <Workflow className="h-4 w-4 text-muted-foreground/30" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Lifecycle Health</span>
                    </div>
                    <div className="space-y-4">
                       {['Concept', 'Sourcing', 'Production', 'Logistics'].map(stage => {
                         const stageTasks = tasks.filter(t => t.phase === stage);
                         const done = stageTasks.filter(t => t.status === 'completed').length;
                         const progress = stageTasks.length > 0 ? Math.round((done / stageTasks.length) * 100) : 0;
                         return (
                           <div key={stage} className="space-y-2">
                             <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                               <span className="text-muted-foreground">{stage}</span>
                               <span className="text-primary">{progress}%</span>
                             </div>
                             <div className="h-0.5 bg-muted w-full">
                                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
                             </div>
                           </div>
                         );
                       })}
                    </div>
                 </div>
               </div>
             )}
          </aside>
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
