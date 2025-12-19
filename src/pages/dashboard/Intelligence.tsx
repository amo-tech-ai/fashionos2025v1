
import React, { useState } from 'react';
import { Search, Loader2, Sparkles, History, Feather, ShieldAlert, ArrowRight, Users2, X, CircleDollarSign, BarChart4, ExternalLink, ShieldCheck, Volume2 } from 'lucide-react';
import { useIntelligence } from '@/hooks/useIntelligence';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { generatePressRelease, checkLogistics, analyzeStakeholders, forecastBudget, generateWholesaleStrategy, reviewLegalRights, generateSpeech } from '@/lib/gemini';
import { WholesaleReport } from '@/components/dashboard/intelligence/WholesaleReport';
import { cn } from '@/lib/utils';

export const Intelligence: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const { loading, report, performAnalysis } = useIntelligence();
  
  const [toolLoading, setToolLoading] = useState(false);
  const [toolResult, setToolResult] = useState<{ text: string; type: string; data?: any } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    const result = await performAnalysis(query, 'HIGH');
    if (result) setHistory(prev => [{ query, timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleBriefing = async () => {
    if (!report) return;
    setIsSpeaking(true);
    try {
      const base64 = await generateSpeech(report.text);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const buffer = audioCtx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } catch (e) {
      console.error(e);
      setIsSpeaking(false);
    }
  };

  const handleToolAction = async (type: 'PR' | 'LOG' | 'STAKE' | 'BUDGET' | 'WHOLESALE' | 'LEGAL') => {
    if (!query) return;
    setToolLoading(true);
    setToolResult(null); 
    try {
      let res = "";
      let data = null;
      if (type === 'PR') res = await generatePressRelease(query);
      if (type === 'LOG') { const l = await checkLogistics(query); res = l.text; }
      if (type === 'STAKE') { const s = await analyzeStakeholders(query); res = s.text; }
      if (type === 'BUDGET') res = await forecastBudget(query);
      if (type === 'WHOLESALE') {
        data = await generateWholesaleStrategy(query);
        res = "Commercial Buy-Sheet Synthesized Successfully.";
      }
      if (type === 'LEGAL') res = await reviewLegalRights(query);
      setToolResult({ text: res, type, data });
    } catch (err) { console.error(err); }
    finally { setToolLoading(false); }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <aside className="w-80 border-r bg-white hidden lg:flex flex-col shrink-0">
        <div className="p-8 border-b flex justify-between items-center bg-muted/5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3"><History className="h-3 w-3" /> Strategy Archive</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.length > 0 ? history.map((h, i) => (
            <button key={i} className="w-full text-left p-6 border-b hover:bg-muted/30 transition-all group">
              <p className="text-xs font-bold truncate group-hover:italic mb-1">{h.query}</p>
              <p className="text-[9px] font-mono text-muted-foreground">{h.timestamp}</p>
            </button>
          )) : <div className="p-10 text-center text-muted-foreground/30 font-serif italic text-xs">No active logs</div>}
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto px-8 lg:px-12 py-10 space-y-12 pb-32 bg-[#fafafa]">
        <header className="space-y-4">
           <h1 className="font-serif text-5xl italic tracking-tighter">Strategic Intelligence</h1>
           <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Autonomous Market Synthesis</p>
        </header>

        <Card className="border-none shadow-2xl bg-white rounded-none">
          <CardContent className="p-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
              <Input placeholder="Input project brief or collection concept..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-12 h-14 bg-muted/10 border-none rounded-none text-base font-serif italic" />
            </div>
            <Button size="lg" disabled={loading} className="px-12 h-14 rounded-none shadow-xl" onClick={handleSearch}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Initiate"}</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <div className="flex items-center gap-3 border-b pb-4"><Sparkles className="h-4 w-4 text-primary" /><h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Lifecycle Lab</h2></div>
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { type: 'WHOLESALE', icon: BarChart4, label: 'Wholesale Map', desc: 'Retail allocation & Buy-sheet.' },
                { type: 'LEGAL', icon: ShieldAlert, label: 'Rights Guard', desc: 'Contract & Talent risk scan.' },
                { type: 'BUDGET', icon: CircleDollarSign, label: 'Budget Orchestrator', desc: 'ROI & Financial forecasting.' },
              ].map((tool) => (
                <button 
                  key={tool.type} 
                  onClick={() => handleToolAction(tool.type as any)}
                  disabled={!query || toolLoading}
                  className="p-8 bg-white border border-border hover:border-primary transition-all text-left space-y-4 group disabled:opacity-50 shadow-sm hover:shadow-xl"
                >
                   <tool.icon className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                   <div className="space-y-1">
                      <h3 className="text-xs font-black uppercase tracking-widest">{tool.label}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{tool.desc}</p>
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary pt-2">
                      {toolLoading && toolResult?.type === tool.type ? <Loader2 className="h-3 w-3 animate-spin" /> : <><ArrowRight className="h-3 w-3" /> Synthesize</>}
                   </div>
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-12">
          {toolLoading && (
            <div className="p-20 flex flex-col items-center justify-center space-y-4 border border-dashed text-muted-foreground/30">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Orchestrating Strategic Synthesis...</p>
            </div>
          )}

          {toolResult && !toolLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <Card className="rounded-none border-primary/10 shadow-2xl bg-white overflow-hidden">
                  <div className="bg-primary p-4 flex justify-between items-center">
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{toolResult.type} Strategic Output</span>
                     <button onClick={() => setToolResult(null)} className="text-white/60 hover:text-white transition-colors"><X className="h-4 w-4" /></button>
                  </div>
                  <CardContent className="p-12">
                     {toolResult.type === 'WHOLESALE' && toolResult.data ? (
                       <WholesaleReport data={toolResult.data} />
                     ) : (
                       <div className="prose prose-sm max-w-none font-serif leading-loose italic whitespace-pre-wrap shadow-inner p-10 bg-muted/5 border">
                         {toolResult.text}
                       </div>
                     )}
                     <div className="flex gap-4 pt-12 border-t mt-12">
                        <Button className="h-12 rounded-none uppercase text-[9px] font-black tracking-widest px-10">Export PDF Report</Button>
                        <Button variant="outline" className="h-12 rounded-none uppercase text-[9px] font-black tracking-widest px-10 border-primary/10">Archive Intelligence</Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
          )}
          
          {loading ? <Skeleton className="h-[400px] w-full" /> : report && (
            <div className="grid lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8">
              <div className="lg:col-span-2 p-12 bg-white border prose prose-sm max-w-none font-serif italic whitespace-pre-wrap leading-loose shadow-sm">
                <div className="flex items-center justify-between mb-8 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Validation: Verified</span>
                  </div>
                  <Button 
                    onClick={handleBriefing} 
                    disabled={isSpeaking}
                    variant="ghost" 
                    className="h-8 text-[9px] font-black uppercase tracking-widest gap-2"
                  >
                    {isSpeaking ? <Loader2 className="h-3 w-3 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
                    Listen to Briefing
                  </Button>
                </div>
                {report.text}
                
                {report.sources.length > 0 && (
                  <div className="mt-12 space-y-4 pt-8 border-t border-dashed">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Verified Industry Intel</p>
                    <div className="flex flex-wrap gap-3">
                      {report.sources.map((s, idx) => (
                        <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-muted/10 border border-border hover:border-primary transition-all text-[10px] group">
                          <span className="truncate max-w-[120px]">{s.title}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <aside className="space-y-8">
                <Card className="bg-primary text-white p-10 shadow-2xl rounded-none">
                  <Sparkles className="h-8 w-8 opacity-40 mb-8" />
                  <h3 className="text-2xl font-serif mb-6 leading-tight italic">Commercial Impact Strategy</h3>
                  <p className="text-xs opacity-70 mb-10 leading-relaxed font-medium">Ready to translate this intelligence into a wholesale buy-sheet?</p>
                  <Button variant="outline" className="w-full border-white/20 text-white rounded-none hover:bg-white/10 uppercase text-[10px] font-black tracking-widest h-14" onClick={() => handleToolAction('WHOLESALE')}>
                    Generate Buy-Sheet
                  </Button>
                </Card>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
