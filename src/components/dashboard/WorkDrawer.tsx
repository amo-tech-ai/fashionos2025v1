
import React from 'react';
import { X, UserCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DrawerMode } from '@/types/dashboard';
import { TaskDetails } from './work-drawer/TaskDetails';
import { GuestDetails } from './work-drawer/GuestDetails';
import { SummaryDetails } from './work-drawer/SummaryDetails';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

interface WorkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: DrawerMode;
  selectedTaskId?: string | null;
  selectedGuestId?: string | null;
}

export const WorkDrawer: React.FC<WorkDrawerProps> = ({
  isOpen,
  onClose,
  mode,
  selectedTaskId,
  selectedGuestId
}) => {
  const { tasks, guests, metrics, updateTask, checkInGuest } = useDashboardStore();
  
  const currentTask = tasks.find(t => t.id === selectedTaskId);
  const currentGuest = guests.find(g => g.id === selectedGuestId);

  const handleAction = () => {
    if (mode === 'guest-detail' && currentGuest) {
      checkInGuest(currentGuest.id);
      onClose();
    } else if (mode === 'detail' && currentTask) {
      updateTask(currentTask.id, { status: 'completed' });
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/5 z-[60] transition-opacity" onClick={onClose} />
      )}
      
      <div className={cn(
        "fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-[70] border-l border-border transform transition-transform duration-300 ease-in-out shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-8 border-b border-border/50 bg-muted/5">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
              {mode === 'summary' ? 'Workflow Metrics' : mode === 'guest-detail' ? 'Guest Intel' : 'Execution Details'}
            </span>
            <button onClick={onClose} className="p-2 -mr-2 hover:rotate-90 transition-all text-muted-foreground hover:text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-10 scrollbar-none">
            {mode === 'summary' && <SummaryDetails metrics={metrics} />}
            {mode === 'detail' && currentTask && <TaskDetails key={currentTask.id} task={currentTask} />}
            {mode === 'guest-detail' && currentGuest && <GuestDetails key={currentGuest.id} guest={currentGuest} />}
          </div>

          {(mode === 'detail' || mode === 'guest-detail') && (
            <div className="p-8 border-t border-border bg-white sticky bottom-0 grid grid-cols-2 gap-4">
              <Button onClick={handleAction} className="w-full rounded-none h-14 text-[10px] uppercase font-black tracking-widest shadow-xl">
                {mode === 'guest-detail' ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" /> Check In
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Complete
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full rounded-none h-14 text-[10px] uppercase font-black tracking-widest border-primary/10">
                {mode === 'guest-detail' ? 'Modify Seating' : 'Delegate'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
