
import React from 'react';
import { Guest } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const SEATING_ROWS = ['A', 'B', 'C', 'D'];
const SEATS_PER_ROW = 12;

interface SeatingChartProps {
  guests: Guest[];
  onSelectGuest: (guest: Guest) => void;
}

export const SeatingChart: React.FC<SeatingChartProps> = ({ guests, onSelectGuest }) => (
  <div className="bg-white border border-border p-12 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-muted/30 -z-0" />
    <div className="relative z-10 flex flex-col items-center gap-12">
       <div className="w-64 h-8 bg-primary/90 flex items-center justify-center">
         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Backstage Entrance</span>
       </div>

       <div className="w-full space-y-8">
         {SEATING_ROWS.map((row) => (
           <div key={row} className="flex justify-between items-center gap-4">
             <div className="flex gap-1">
               {Array.from({ length: SEATS_PER_ROW / 2 }).map((_, i) => {
                 const seatId = `${row}${String(i + 1).padStart(2, '0')}`;
                 const guest = guests.find(g => g.seat === seatId);
                 return (
                   <button 
                     key={seatId}
                     onClick={() => guest && onSelectGuest(guest)}
                     className={cn(
                       "w-8 h-8 border text-[8px] font-bold flex items-center justify-center transition-all",
                       guest ? "bg-primary text-white border-primary hover:opacity-80" : "bg-muted/10 border-border/50 text-muted-foreground/40 hover:bg-muted/30"
                     )}
                     title={guest ? guest.name : `Seat ${seatId}`}
                   >
                     {i + 1}
                   </button>
                 );
               })}
             </div>
             <div className="flex-1 border-b border-dashed border-border/50" />
             <span className="text-[10px] font-black text-muted-foreground opacity-20">{row}</span>
             <div className="flex-1 border-b border-dashed border-border/50" />
             <div className="flex gap-1">
               {Array.from({ length: SEATS_PER_ROW / 2 }).map((_, i) => {
                 const seatId = `${row}${String(i + 7).padStart(2, '0')}`;
                 const guest = guests.find(g => g.seat === seatId);
                 return (
                   <button 
                     key={seatId}
                     onClick={() => guest && onSelectGuest(guest)}
                     className={cn(
                       "w-8 h-8 border text-[8px] font-bold flex items-center justify-center transition-all",
                       guest ? "bg-primary text-white border-primary hover:opacity-80" : "bg-muted/10 border-border/50 text-muted-foreground/40 hover:bg-muted/30"
                     )}
                     title={guest ? guest.name : `Seat ${seatId}`}
                   >
                     {i + 7}
                   </button>
                 );
               })}
             </div>
           </div>
         ))}
       </div>

       <div className="w-full h-32 bg-muted/5 border-2 border-dashed border-border flex items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30 italic">Technical Console / Press Stand</span>
       </div>
    </div>
  </div>
);
