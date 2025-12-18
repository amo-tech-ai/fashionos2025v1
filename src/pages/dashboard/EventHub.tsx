
import React, { useState, useMemo } from 'react';
import { Search, UserPlus, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { WorkDrawer } from '@/components/dashboard/WorkDrawer';
import { SeatingChart } from '@/components/dashboard/event-hub/SeatingChart';
import { GuestTable } from '@/components/dashboard/event-hub/GuestTable';
import { PrioritySidebar } from '@/components/dashboard/event-hub/PrioritySidebar';
import { ShowTimeline } from '@/components/dashboard/event-hub/ShowTimeline';
import { Guest, ShowStage } from '@/types/dashboard';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { cn } from '@/lib/utils';

const INITIAL_STAGES: ShowStage[] = [
  { id: 's1', label: 'Crew Load-In', status: 'completed', time: '08:00' },
  { id: 's2', label: 'Guest Arrival', status: 'current', time: '18:30' },
  { id: 's3', label: 'Seating', status: 'upcoming', time: '19:15' },
  { id: 's4', label: 'Commencement', status: 'upcoming', time: '20:00' },
  { id: 's5', label: 'Post-Show', status: 'upcoming', time: '21:30' },
];

export const EventHub: React.FC = () => {
  const { guests } = useDashboardStore();
  const [selectedTab, setSelectedTab] = useState<'seating' | 'guestlist'>('seating');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [currentStageId, setCurrentStageId] = useState('s2');

  const handleOpenGuest = (guest: Guest) => {
    setSelectedGuestId(guest.id);
    setIsDrawerOpen(true);
  };

  const activeStage = INITIAL_STAGES.find(s => s.id === currentStageId);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <ShowTimeline 
        stages={INITIAL_STAGES} 
        currentStageId={currentStageId} 
        onStageSelect={setCurrentStageId} 
      />

      <div className="flex-1 px-8 lg:px-12 py-10 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-5xl tracking-tight leading-none">The Runway</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/[0.03] border border-primary/5 rounded-full">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">{activeStage?.label} Phase</span>
              </div>
            </div>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Collection Orchestration</p>
          </div>
          <div className="flex gap-4">
             <div className="flex bg-muted p-1 rounded-none gap-1">
               <button 
                onClick={() => setSelectedTab('seating')}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedTab === 'seating' ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                )}
               >Seating</button>
               <button 
                onClick={() => setSelectedTab('guestlist')}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedTab === 'guestlist' ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                )}
               >Guest List</button>
             </div>
             <Button className="h-10 px-6 rounded-none text-[10px] font-black uppercase tracking-widest">
               <UserPlus className="h-4 w-4 mr-2" /> Invite Guest
             </Button>
          </div>
        </header>

        {selectedTab === 'seating' ? (
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10">
              <SeatingChart guests={guests} onSelectGuest={handleOpenGuest} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
                 <div className="p-8 bg-white space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Row A Density</p>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-serif">84%</p>
                      <span className="text-[10px] text-green-600 font-bold mb-1">Optimal</span>
                    </div>
                 </div>
                 <div className="p-8 bg-white space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Priority Flow</p>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-serif">{guests.filter(g => g.status === 'checked-in').length} / {guests.length}</p>
                      <span className="text-[10px] text-primary/40 font-bold mb-1">Check-in</span>
                    </div>
                 </div>
                 <div className="p-8 bg-white space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Waitlist Vol.</p>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-serif">142</p>
                      <span className="text-[10px] text-destructive font-bold mb-1">+12m</span>
                    </div>
                 </div>
              </div>

              {currentStageId === 's3' && (
                <div className="p-8 bg-primary text-primary-foreground flex items-center justify-between group cursor-pointer hover:brightness-110 transition-all">
                  <div className="flex items-center gap-6">
                    <Bell className="h-6 w-6 opacity-40 group-hover:animate-ring" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Seating Protocol Alpha</p>
                      <h4 className="font-serif text-xl italic">Initiate Final Row Call?</h4>
                    </div>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white rounded-none h-12 uppercase text-[9px] font-black tracking-widest px-8">Confirm Protocol</Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <PrioritySidebar 
                priorityGuests={guests.filter(g => g.priority)} 
                onSelectGuest={handleOpenGuest} 
              />
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border shadow-sm">
             <div className="p-6 border-b flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/5">
                <div className="relative w-full md:w-96">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                   <Input placeholder="Search registry by name or affiliation..." className="pl-10 h-10 text-xs rounded-none border-muted/50 bg-white" />
                </div>
                <div className="flex gap-3">
                   <Button variant="ghost" size="sm" className="h-10 text-[9px] uppercase font-black tracking-widest hover:bg-white">
                     <Filter className="h-3 w-3 mr-2" /> Filter By Status
                   </Button>
                   <Button variant="ghost" size="sm" className="h-10 text-[9px] uppercase font-black tracking-widest hover:bg-white">Export Seating File</Button>
                </div>
             </div>
             <GuestTable guests={guests} onSelectGuest={handleOpenGuest} />
          </div>
        )}
      </div>

      <WorkDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode="guest-detail"
        selectedGuestId={selectedGuestId}
      />
    </div>
  );
};
