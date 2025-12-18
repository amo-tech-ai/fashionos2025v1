
import React from 'react';
import { Star, MoreVertical } from 'lucide-react';
import { Guest } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface GuestTableProps {
  guests: Guest[];
  onSelectGuest: (guest: Guest) => void;
}

export const GuestTable: React.FC<GuestTableProps> = ({ guests, onSelectGuest }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
       <thead>
          <tr className="border-b bg-muted/10">
             <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Guest Name</th>
             <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Affiliation</th>
             <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
             <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Seat</th>
             <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Priority</th>
             <th className="px-8 py-4"></th>
          </tr>
       </thead>
       <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} className="border-b hover:bg-muted/5 transition-colors cursor-pointer group" onClick={() => onSelectGuest(guest)}>
               <td className="px-8 py-6">
                  <span className="text-sm font-medium group-hover:italic transition-all">{guest.name}</span>
               </td>
               <td className="px-8 py-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{guest.affiliation}</span>
               </td>
               <td className="px-8 py-6">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2 py-1 border",
                    guest.status === 'checked-in' ? "border-green-600/30 text-green-600 bg-green-50/50" : "border-primary/20 text-primary"
                  )}>
                    {guest.status}
                  </span>
               </td>
               <td className="px-8 py-6">
                  <span className="text-xs font-serif font-bold italic">{guest.seat || '---'}</span>
               </td>
               <td className="px-8 py-6">
                  {guest.priority ? <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> : <div className="w-3.5 h-3.5" />}
               </td>
               <td className="px-8 py-6 text-right">
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
               </td>
            </tr>
          ))}
       </tbody>
    </table>
  </div>
);
