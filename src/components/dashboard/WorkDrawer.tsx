
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
        "fixed top-0 right-0 h-full w-full md:w-[360px] bg-white z-[70] border-l border-border transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-8 border-b border-border/50">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
              {mode === 'summary' ? 'Workflow Summary' : mode === 'guest-detail' ? 'Guest Credentials' : 'Task Specification'}
            </span>
            <button onClick={onClose} className="p-2 -mr-2 hover:bg-muted/50 transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-10">
            {mode === 'summary' && <SummaryDetails metrics={metrics} />}
            {mode === 'detail' && currentTask && <TaskDetails task={currentTask} />}
            {mode === 'guest-detail' && currentGuest && <GuestDetails guest={currentGuest} />}
          </div>

          {(mode === 'detail' || mode === 'guest-detail') && (
            <div className="p-8 border-t border-border bg-white sticky bottom-0 grid grid-cols-2 gap-3">
              <Button onClick={handleAction} className="w-full rounded-none h-12 text-[10px] uppercase font-black tracking-widest">
                {mode === 'guest-detail' ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" /> Check In
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Complete
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full rounded-none h-12 text-[10px] uppercase font-black tracking-widest">
                {mode === 'guest-detail' ? 'Update Seat' : 'Reassign'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
