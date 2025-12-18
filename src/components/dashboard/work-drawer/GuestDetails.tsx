
import React from 'react';
import { Star, Utensils } from 'lucide-react';
import { Guest } from '@/types/dashboard';
import { AIInsight } from './AIInsight';
import { cn } from '@/lib/utils';

interface GuestDetailsProps {
  guest: Guest;
}

export const GuestDetails: React.FC<GuestDetailsProps> = ({ guest }) => (
  <div className="space-y-10">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <span>{guest.affiliation}</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span className={cn(
            guest.status === 'checked-in' ? 'text-green-600' : 'text-primary'
          )}>
            {guest.status.replace('-', ' ')}
          </span>
        </div>
        {guest.priority && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
      </div>
      <h2 className="font-serif text-3xl leading-tight">{guest.name}</h2>
    </div>

    <div className="grid grid-cols-2 gap-px bg-border border border-border">
      <div className="bg-white p-6 space-y-1">
        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Seat</span>
        <p className="text-xl font-serif">{guest.seat || 'Unassigned'}</p>
      </div>
      <div className="bg-white p-6 space-y-1">
        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Entry</span>
        <p className="text-xs font-bold uppercase tracking-widest">Main Ramp</p>
      </div>
    </div>

    {guest.dietaryNotes && (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Utensils className="h-3 w-3 text-muted-foreground" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dietary Provisions</h4>
        </div>
        <p className="text-xs font-medium text-foreground italic">{guest.dietaryNotes}</p>
      </div>
    )}

    <div className="space-y-4">
       <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Interaction History</h4>
       <div className="space-y-3">
         {[
           { date: 'SEP 24', event: 'Met Gala Afterparty', note: 'Expressed interest in upcoming textile collab.' },
           { date: 'JUN 24', event: 'Editorial Dinner', note: 'Priority seating requested for SS25.' }
         ].map((h, i) => (
           <div key={i} className="flex gap-4 border-l-2 border-muted pl-4">
             <span className="text-[9px] font-bold text-muted-foreground shrink-0">{h.date}</span>
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none">{h.event}</p>
               <p className="text-[10px] text-muted-foreground">{h.note}</p>
             </div>
           </div>
         ))}
       </div>
    </div>

    {guest.aiInsight && <AIInsight text={guest.aiInsight} />}
  </div>
);
