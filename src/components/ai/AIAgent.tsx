import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, BrainCircuit } from 'lucide-react';
import { createStrategicAgent } from '@/lib/gemini';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Director, I have synchronized with the global fashion indices. How shall we refine your brand's trajectory today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createStrategicAgent();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "My apologies, the intelligence stream was interrupted. Please re-initiate." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-primary-foreground rounded-none shadow-2xl flex items-center justify-center hover:scale-105 transition-all z-50 group border border-white/20"
      >
        <div className="relative">
          <Sparkles className="h-7 w-7 group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse border border-primary" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-10 w-full max-w-[400px] h-[600px] bg-white border border-primary/10 shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-12 duration-500 rounded-none overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-5 w-5 text-primary-foreground/50" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">OS Strategic Agent</span>
                <span className="text-[8px] font-bold text-green-400 uppercase tracking-tighter mt-1">Status: Active Thinking</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X className="h-5 w-5" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("w-8 h-8 rounded-none flex items-center justify-center shrink-0 border", msg.role === 'user' ? "bg-white border-primary/10" : "bg-primary text-white border-transparent")}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "p-4 text-xs leading-relaxed max-w-[85%] shadow-sm",
                  msg.role === 'user' ? "bg-primary text-primary-foreground rounded-none italic" : "bg-white border rounded-none text-foreground font-medium"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-none bg-primary text-white flex items-center justify-center"><Bot className="h-4 w-4" /></div>
                <div className="p-4 bg-white border rounded-none flex items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary/30" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Thinking</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-white flex gap-3">
            <input 
              className="flex-1 bg-muted/20 border-none text-[11px] px-4 focus:ring-1 focus:ring-primary rounded-none placeholder:italic h-12"
              placeholder="Query strategic direction..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button size="sm" onClick={handleSend} disabled={loading} className="h-12 w-12 rounded-none"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </>
  );
};
