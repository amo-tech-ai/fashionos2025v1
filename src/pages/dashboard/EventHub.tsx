
import React, { useState } from 'react';
import { Zap, Loader2, Sparkles, X, MessageSquare, BrainCircuit, Users, Radio } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ShowTimeline } from '@/components/dashboard/event-hub/ShowTimeline';
import { LiveCueSheet } from '@/components/dashboard/event-hub/LiveCueSheet';
import { SeatingChart } from '@/components/dashboard/event-hub/SeatingChart';
import { GuestTable } from '@/components/dashboard/event-hub/GuestTable';
import { PrioritySidebar } from '@/components/dashboard/event-hub/PrioritySidebar';
import { PowerClusters } from '@/components/dashboard/event-hub/PowerClusters';
import { Guest, ShowStage } from '@/types/dashboard';
import { useDashboardStore } from '@/hooks/useDashboardStore';
import { optimizeSeating, weaveSocialNarrative, generateCueSheet } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import { WorkDrawer } from '@/components/dashboard/WorkDrawer';

const INITIAL_STAGES: ShowStage[] = [
  { id: 's1', label: 'Crew Load-In', status: 'completed', time: '08:00' },
  { id: 's2', label: 'Guest Arrival', status: 'current', time: '18:30' },
  { id: 's3', label: 'Seating', status: 'upcoming', time: '19:15' },
  { id: 's4', label: 'Commencement', status: 'upcoming', time: '20:00' },
];

const MOCK_CUES = [
  { id: 'c1', time: '20:00', look: 'Intro', lighting: 'Lux-Full 100%', audio: 'Main Theme: Staccato', wardrobe: 'All Models: Position A', status: 'completed' },
  { id: 'c2', time: '20:05', look: 'Look 01-04', lighting: 'Spotlight Row A', audio: 'Beat Switch: High', wardrobe: 'Ready: Look 05', status: 'active' },
  { id: 'c3', time: '20:15', look: 'Look 05-12', lighting: 'Pulse Red 20%', audio: 'Ambient Sub', wardrobe: 'Final Prep: Finale', status: 'pending' },
];

export const EventHub: React.FC = () => {
  const { guests } = useDashboardStore();
  const [selectedTab, setSelectedTab] = useState<'seating' | 'guestlist' | 'live' | 'orchestration'>('seating');
  const [activeCueId, setActiveCueId] = useState('c2');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  
  const [isTooling, setIsTooling] = useState(false);
  const [toolResult, setToolResult] = useState<{ text: string; title: string } | null>(null);
  const [notes, setNotes] = useState('');

  const handleOpenGuest = (guest: Guest) => {
    setSelectedGuestId(guest.id);
    setIsDrawerOpen(true);
  };

  const handleCueCompletion = (id: string) => {
    // In a real app, this would update state. For now, it just simulates progress.
    const nextIdx = MOCK_CUES.findIndex(c => c.id === id) + 1;
    if (MOCK_CUES[nextIdx]) setActiveCueId(MOCK_CUES[nextIdx].id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <ShowTimeline stages={INITIAL_STAGES} currentStageId="s2" onStageSelect={() => {}} />

      <div className="flex-1 px-8 lg:px-12 py-10 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div className="space-y-3">
            <h1 className="font-serif text-5xl tracking-tight leading-none">The Runway</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Event Orchestration</p>
          </div>
          <div className="flex gap-4">
             <div className="flex bg-muted p-1 rounded-none gap-1">
               {['seating', 'guestlist', 'live', 'orchestration'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => setSelectedTab(tab as any)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                    selectedTab === tab ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                  )}
                 >{tab === 'live' ? 'Master Cues' : tab.replace('list', ' List').toUpperCase()}</button>
               ))}
             </div>
          </div>
        </header>

        {selectedTab === 'live' ? (
          <LiveCueSheet cues={MOCK_CUES as any} activeCueId={activeCueId} onComplete={handleCueCompletion} />
        ) : selectedTab === 'orchestration' ? (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white border p-10 space-y-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Lifecycle Orchestrator</h2>
                </div>
                <textarea 
                  className="w-full h-48 bg-muted/20 border-none p-6 text-sm font-serif italic focus:ring-1 focus:ring-primary/10 resize-none"
                  placeholder="Input run-of-show or show notes for neural synthesis..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button className="w-full h-16 rounded-none uppercase text-[10px] font-black tracking-widest shadow-xl">Synthesize Master Cues</Button>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col items-center justify-center border-2 border-dashed border-border/50 bg-muted/5 min-h-[500px] text-muted-foreground/30">
               <BrainCircuit className="h-16 w-16 opacity-10 mb-6" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Synthesis Input</p>
            </div>
          </div>
        ) : selectedTab === 'seating' ? (
           <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-10">
              <SeatingChart guests={guests} onSelectGuest={handleOpenGuest} />
            </div>
            <div className="lg:col-span-4">
              <PrioritySidebar priorityGuests={guests.filter(g => g.priority)} onSelectGuest={handleOpenGuest} />
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border shadow-sm">
             <GuestTable guests={guests} onSelectGuest={handleOpenGuest} />
          </div>
        )}
      </div>

      <WorkDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} mode="guest-detail" selectedGuestId={selectedGuestId} />
    </div>
  );
};
