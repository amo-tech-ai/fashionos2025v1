
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Guest } from '@/types/dashboard';

interface PrioritySidebarProps {
  priorityGuests: Guest[];
  onSelectGuest: (guest: Guest) => void;
}

export const PrioritySidebar: React.FC<PrioritySidebarProps> = ({ priorityGuests, onSelectGuest }) => (
  <div className="space-y-8">
     <Card className="rounded-none border-primary/5 bg-white shadow-xl">
       <CardContent className="p-8 space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
             <Star className="h-4 w-4 text-amber-500" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">VVIP Priority Hub</h3>
          </div>
          <div className="space-y-4">
            {priorityGuests.map(g => (
              <div key={g.id} className="flex items-center justify-between group cursor-pointer" onClick={() => onSelectGuest(g)}>
                 <div className="space-y-1">
                    <p className="text-xs font-bold group-hover:italic transition-all">{g.name}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{g.affiliation}</p>
                 </div>
                 <span className="text-[10px] font-serif italic text-primary">{g.seat || 'TBD'}</span>
              </div>
            ))}
          </div>
       </CardContent>
     </Card>

     <div className="p-10 bg-primary text-primary-foreground space-y-6">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 leading-none">Intelligence Handover</p>
        <h3 className="font-serif text-2xl italic leading-tight">Dynamic Seating is operational.</h3>
        <p className="text-xs opacity-60 leading-relaxed">
          AI Agent monitoring entry velocities. Early congestion at Main Entrance suggests re-routing Row D to West Ramp.
        </p>
        <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white rounded-none h-12 uppercase text-[9px] font-black tracking-widest">
          Execute Re-Route
        </Button>
     </div>
  </div>
);
