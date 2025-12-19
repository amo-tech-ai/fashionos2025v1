
import React from 'react';
import { Package, MapPin, Loader2, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const SAMPLES = [
  { id: 'S-001', name: 'Look 04: Bio-Silk Suit', location: 'In Transit (Paris)', status: 'secure' },
  { id: 'S-002', name: 'Look 12: Glass Fibers', location: 'Fitting Room A', status: 'secure' },
  { id: 'S-003', name: 'Look 01: Master Sample', location: 'Warehouse Tokyo', status: 'secure' },
];

export const DigitalTrunk: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Package className="h-4 w-4 text-primary" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Digital Trunk (Sample Flow)</h2>
        </div>
        <span className="text-[9px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="h-3 w-3" /> All Assets Localized
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLES.map((sample) => (
          <Card key={sample.id} className="rounded-none border-primary/5 bg-white shadow-sm group hover:shadow-xl transition-all cursor-default">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                 <span className="text-[9px] font-mono text-muted-foreground opacity-40">{sample.id}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <p className="text-xs font-bold leading-tight group-hover:italic transition-all">{sample.name}</p>
              <div className="pt-4 flex items-center gap-2 text-muted-foreground">
                 <MapPin className="h-3 w-3" />
                 <span className="text-[9px] font-black uppercase tracking-widest">{sample.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
