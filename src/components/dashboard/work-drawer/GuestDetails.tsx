
import React from 'react';
import { Star, Utensils, ShieldCheck, MapPin } from 'lucide-react';
import { Guest } from '@/types/dashboard';
import { AIInsight } from './AIInsight';
import { cn } from '@/lib/utils';

interface GuestDetailsProps {
  guest: Guest;
}

export const GuestDetails: React.FC<GuestDetailsProps> = ({ guest }) => (
  <div className="space-y-10 animate-in fade-in duration-500">
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

    <div className="grid grid-cols-2 gap-px bg-border border border-border shadow-sm">
      <div className="bg-white p-6 space-y-1">
        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Seat Allocation</span>
        <p className="text-xl font-serif">{guest.seat || 'Unassigned'}</p>
      </div>
      <div className="bg-white p-6 space-y-1">
        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground">
           <MapPin className="h-3 w-3" /> Zone
        </div>
        <p className="text-xs font-bold uppercase tracking-widest">Main Atrium</p>
      </div>
    </div>

    {guest.dietaryNotes && (
      <div className="space-y-2 p-6 bg-muted/5 border-l-2 border-primary/20">
        <div className="flex items-center gap-2">
          <Utensils className="h-3.5 w-3.5 text-muted-foreground/60" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dietary Protocols</h4>
        </div>
        <p className="text-xs font-medium text-foreground italic">{guest.dietaryNotes}</p>
      </div>
    )}

    <div className="space-y-6">
       <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Relationship History</h4>
       <div className="space-y-4">
         {[
           { date: 'SEP 24', event: 'Editorial Preview', note: 'Priority seating requested for Paris flagship.' },
           { date: 'JUN 24', event: 'Global PR Summit', note: 'Expressed strong interest in bio-textile initiative.' }
         ].map((h, i) => (
           <div key={i} className="flex gap-4 border-l-2 border-muted pl-4 group hover:border-primary transition-all">
             <span className="text-[9px] font-black text-muted-foreground/40 shrink-0 mt-1">{h.date}</span>
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none group-hover:text-primary">{h.event}</p>
               <p className="text-[10px] text-muted-foreground leading-relaxed">{h.note}</p>
             </div>
           </div>
         ))}
       </div>
    </div>

    {guest.aiInsight ? (
      <div className="space-y-4 pt-6 border-t border-dashed">
         <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Relationship Intelligence</span>
         </div>
         <AIInsight text={guest.aiInsight} />
      </div>
    ) : (
      <div className="p-6 bg-muted/5 border border-dashed text-center space-y-3">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">Neural Profiling Active</p>
      </div>
    )}
  </div>
);
