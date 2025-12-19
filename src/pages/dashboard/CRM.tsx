
import React, { useState } from 'react';
import { Users2, Search, Sparkles, Loader2, ShieldCheck, Mail, MapPin, ExternalLink, Globe, UserPlus, Filter, History } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { enrichContact } from '@/lib/gemini';
import { cn } from '@/lib/utils';

const INITIAL_CONTACTS = [
  { id: 'c1', name: 'Julianne Moore', role: 'Talent / VIP', affiliation: 'Independent', status: 'Priority', bio: 'Long-standing brand ambassador. High conversion on red carpet assets.' },
  { id: 'c2', name: 'Carine Roitfeld', role: 'Editor / Stylist', affiliation: 'CR Fashion Book', status: 'Key Press', bio: 'Strategic tastemaker. Direct path to European high-fashion editorial.' },
];

export const CRM: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any | null>(null);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);

  const handleEnrich = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await enrichContact(query);
      setReport(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAddEnriched = () => {
    if (!report) return;
    setContacts(prev => [{
      id: `c-${Date.now()}`,
      name: report.FullName || report.name,
      role: report.Role || 'VIP',
      affiliation: report.Affiliation || 'Various',
      status: report.InfluenceTier || 'New',
      bio: report.StrategicDossier || 'Intelligence enriched via Gemini.'
    }, ...prev]);
    setReport(null);
    setQuery('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <div className="flex-1 px-8 lg:px-12 py-10 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-10">
          <div className="space-y-3">
            <h1 className="font-serif text-5xl tracking-tight leading-none">Relationships</h1>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">Strategic Influence Registry</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" size="sm" className="h-10 px-6 rounded-none border-border/50 bg-white">
               <Globe className="h-4 w-4 mr-2" /> Global Graph
             </Button>
             <Button size="sm" className="h-10 px-6 rounded-none bg-primary text-white">
               <UserPlus className="h-4 w-4 mr-2" /> Add Entry
             </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-10">
             <Card className="rounded-none border-primary/10 shadow-2xl bg-white overflow-hidden">
                <CardContent className="p-8 space-y-8">
                   <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Enrichment Engine</h3>
                   </div>
                   <div className="flex gap-4">
                      <Input 
                        placeholder="Paste LinkedIn URL or name for deep research..." 
                        className="h-14 bg-muted/20 border-none rounded-none text-base font-serif italic"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <Button onClick={handleEnrich} disabled={loading || !query} className="h-14 px-10 rounded-none shadow-xl">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Synthesize Dossier"}
                      </Button>
                   </div>
                   
                   {report && (
                     <div className="pt-8 border-t border-border/50 animate-in slide-in-from-top-4 space-y-8">
                        <div className="grid md:grid-cols-3 gap-6">
                           <div className="p-6 bg-muted/10 border space-y-1">
                              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Identity</p>
                              <p className="text-sm font-bold">{report.FullName || 'Analysis Active'}</p>
                           </div>
                           <div className="p-6 bg-muted/10 border space-y-1">
                              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Affiliation</p>
                              <p className="text-sm font-bold">{report.Affiliation || '---'}</p>
                           </div>
                           <div className="p-6 bg-muted/10 border space-y-1">
                              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Influence Tier</p>
                              <p className="text-xs font-black uppercase tracking-tighter text-primary">{report.InfluenceTier || 'Calculating'}</p>
                           </div>
                        </div>
                        <div className="p-10 bg-primary text-white space-y-4 shadow-xl">
                           <div className="flex items-center gap-2">
                             <ShieldCheck className="h-4 w-4 opacity-40" />
                             <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Strategic Approach Recommendation</span>
                           </div>
                           <p className="text-sm font-serif italic leading-loose opacity-90">{report.StrategicDossier || 'Intelligence currently being indexed.'}</p>
                        </div>
                        <div className="flex gap-3 justify-end">
                           <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-12" onClick={() => setReport(null)}>Discard</Button>
                           <Button className="h-12 px-10 rounded-none uppercase text-[10px] font-black tracking-widest shadow-lg" onClick={handleAddEnriched}>Archive to Registry</Button>
                        </div>
                     </div>
                   )}
                </CardContent>
             </Card>

             <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Influence Registry</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black tracking-widest"><Filter className="h-3 w-3 mr-2" /> Sort: Sentiment</Button>
                </div>
                <div className="grid gap-px bg-border border border-border">
                  {contacts.map(contact => (
                    <div key={contact.id} className="p-8 bg-white flex items-center justify-between group hover:bg-muted/5 transition-all">
                       <div className="flex items-center gap-10">
                          <div className="w-12 h-12 bg-muted/50 border flex items-center justify-center font-serif text-xl italic group-hover:scale-110 transition-transform">
                             {contact.name.charAt(0)}
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-sm font-bold leading-none">{contact.name}</h4>
                             <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{contact.affiliation} • {contact.role}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="hidden md:block max-w-xs text-[10px] italic font-serif leading-relaxed text-muted-foreground opacity-60 line-clamp-2">
                             "{contact.bio}"
                          </div>
                          <div className="flex items-center gap-2">
                             <Button variant="ghost" size="sm" className="h-10 w-10 p-0"><Mail className="h-3.5 w-3.5" /></Button>
                             <Button variant="ghost" size="sm" className="h-10 w-10 p-0"><ExternalLink className="h-3.5 w-3.5" /></Button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
             <Card className="rounded-none border-primary/5 bg-white shadow-xl overflow-hidden group">
                <CardContent className="p-10 space-y-8">
                   <div className="flex items-center gap-3">
                      <History className="h-4 w-4 opacity-40" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Power Clusters</span>
                   </div>
                   <div className="space-y-6">
                      <p className="text-xl font-serif leading-tight italic">"The French Editorial Circle"</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">System has detected 12 strong nodes connecting Carine Roitfeld and French Vogue editors to your current SS25 collection assets.</p>
                      <div className="flex -space-x-4 overflow-hidden pt-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-muted border flex items-center justify-center font-serif text-xs italic">C{i}</div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full border-primary/10 rounded-none h-12 uppercase text-[9px] font-black tracking-widest hover:bg-primary hover:text-white transition-all">Visualize Network</Button>
                   </div>
                </CardContent>
             </Card>

             <div className="p-10 bg-muted/5 border border-dashed space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary/40" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Outreach Heatmap</span>
                </div>
                <div className="space-y-4">
                   {[
                     { loc: 'Paris', count: 42, activity: 'High' },
                     { loc: 'Tokyo', count: 18, activity: 'Medium' },
                     { loc: 'NYC', count: 31, activity: 'High' }
                   ].map(l => (
                     <div key={l.loc} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-muted-foreground">{l.loc}</span>
                        <span className="text-primary">{l.count} Contacts</span>
                     </div>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
