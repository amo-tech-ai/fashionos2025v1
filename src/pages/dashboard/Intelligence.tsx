
import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, Sparkles, BrainCircuit, History } from 'lucide-react';
import { useIntelligence } from '@/hooks/useIntelligence';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export const Intelligence: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const { loading, report, error, performAnalysis } = useIntelligence();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const result = await performAnalysis(query, 'HIGH');
    // Actual implementation of archiving
    if (result) setHistory(prev => [{ query, timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Archive Sidebar */}
      <aside className="w-80 border-r bg-white hidden lg:flex flex-col">
        <div className="p-8 border-b">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
             <History className="h-3 w-3" /> Report Archive
           </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.length > 0 ? history.map((h, i) => (
            <button key={i} className="w-full text-left p-6 border-b hover:bg-muted/30 transition-all group">
              <p className="text-xs font-bold truncate group-hover:italic mb-1">{h.query}</p>
              <p className="text-[9px] font-mono text-muted-foreground">{h.timestamp}</p>
            </button>
          )) : (
            <div className="p-12 text-center opacity-20 italic text-sm">No archived synthesis.</div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 lg:px-12 py-10 space-y-12">
        <header className="space-y-4">
           <h1 className="font-serif text-5xl italic tracking-tighter">Market Intelligence</h1>
           <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Real-time Global Fashion Graph</p>
        </header>

        <Card className="border-none shadow-xl bg-white rounded-none">
          <CardContent className="p-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
              <Input 
                placeholder="Query market shifts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 bg-muted/20 border-none rounded-none text-base"
              />
            </div>
            <Button size="lg" disabled={loading} className="px-12 h-14 rounded-none" onClick={handleSearch}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Synthesize"}
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="space-y-8">
            <Skeleton className="h-[400px] w-full" />
            <div className="grid grid-cols-3 gap-8">
              <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
            </div>
          </div>
        ) : report ? (
          <div className="grid lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="p-10 bg-white border shadow-sm prose prose-sm max-w-none font-serif leading-loose italic">
                  <div dangerouslySetInnerHTML={{ __html: report.text.replace(/\n/g, '<br/>') }} />
               </div>
            </div>
            <aside className="space-y-8">
               <Card className="bg-primary text-white rounded-none border-none p-10">
                  <Sparkles className="h-6 w-6 opacity-40 mb-6" />
                  <h3 className="text-xl font-serif mb-4">Strategic Handover</h3>
                  <p className="text-xs opacity-70 leading-relaxed mb-8">
                    These findings suggest a surge in brutalist silhouettes. Initialize a Creative Studio session to visualize this trend.
                  </p>
                  <Button variant="outline" className="w-full border-white/20 text-white rounded-none h-12 uppercase text-[9px] font-black tracking-widest">
                    Enter Studio
                  </Button>
               </Card>
            </aside>
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center opacity-20 grayscale">
             <BrainCircuit className="h-20 w-20 mb-6" />
             <p className="font-serif text-2xl">Awaiting Neural Link</p>
          </div>
        )}
      </div>
    </div>
  );
};
