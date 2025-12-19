
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, BrainCircuit, X, Activity, Volume2 } from 'lucide-react';
import { connectLive } from '@/lib/gemini';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const LiveConsole: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  const handleStart = async () => {
    if (isActive) {
      sessionRef.current?.close();
      setIsActive(false);
      return;
    }

    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const inputContext = new AudioContext({ sampleRate: 16000 });
    const source = inputContext.createMediaStreamSource(stream);
    const processor = inputContext.createScriptProcessor(4096, 1, 1);

    const sessionPromise = connectLive({
      onopen: () => setIsActive(true),
      onmessage: async (message: any) => {
        if (message.serverContent?.outputTranscription) {
          setTranscription(prev => prev + message.serverContent.outputTranscription.text);
        }

        const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audioBase64 && audioContextRef.current) {
          const ctx = audioContextRef.current;
          nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
          const buffer = await decodeAudioData(decode(audioBase64), ctx);
          const sourceNode = ctx.createBufferSource();
          sourceNode.buffer = buffer;
          sourceNode.connect(ctx.destination);
          sourceNode.start(nextStartTimeRef.current);
          nextStartTimeRef.current += buffer.duration;
          sourcesRef.current.add(sourceNode);
        }

        if (message.serverContent?.interrupted) {
          sourcesRef.current.forEach(s => s.stop());
          sourcesRef.current.clear();
          nextStartTimeRef.current = 0;
        }
      },
      onclose: () => setIsActive(false),
    });

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) int16[i] = input[i] * 32768;
      
      const bytes = new Uint8Array(int16.buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);

      sessionPromise.then(session => {
        session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
      });
    };

    source.connect(processor);
    processor.connect(inputContext.destination);
    sessionRef.current = await sessionPromise;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-white border border-primary/10 shadow-2xl overflow-hidden rounded-none flex flex-col">
        <div className="p-10 border-b flex justify-between items-center bg-primary text-white">
          <div className="flex items-center gap-4">
            <BrainCircuit className="h-8 w-8 text-white/40" />
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Director's Voice Console</h2>
              <p className="text-xs italic font-serif opacity-60 mt-1">Real-time OS Orchestration</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform"><X className="h-6 w-6" /></button>
        </div>

        <div className="flex-1 p-12 flex flex-col items-center justify-center space-y-12 bg-muted/5 min-h-[400px]">
          <div className="relative">
             <div className={cn(
               "w-48 h-48 rounded-full border border-primary/5 flex items-center justify-center transition-all duration-1000",
               isActive ? "scale-110 shadow-[0_0_80px_rgba(0,0,0,0.05)]" : "scale-100"
             )}>
                <div className={cn(
                  "w-32 h-32 rounded-full bg-primary flex items-center justify-center transition-all duration-500",
                  isActive && "animate-pulse"
                )}>
                  {isActive ? <Mic className="h-10 w-10 text-white" /> : <MicOff className="h-10 w-10 text-white/40" />}
                </div>
             </div>
             {isActive && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-full h-full rounded-full border-2 border-primary animate-ping opacity-20" />
               </div>
             )}
          </div>

          <div className="text-center space-y-4 max-w-sm">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
               {isActive ? "System Synchronized" : "Awaiting Authorization"}
             </p>
             <p className="text-sm font-serif italic text-muted-foreground leading-relaxed">
               {transcription || "Speak to the OS. Commands: 'Generate SS25 Motion Brief', 'Audit supply chain ESG', 'Update seating cluster A'."}
             </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleStart}
            className={cn(
              "h-16 px-12 rounded-none uppercase text-[10px] font-black tracking-widest shadow-xl",
              isActive ? "bg-destructive hover:bg-destructive/90" : "bg-primary"
            )}
          >
            {isActive ? "Terminate Sync" : "Initiate Live Sync"}
          </Button>
        </div>

        <div className="px-12 py-6 bg-white border-t flex justify-between items-center">
           <div className="flex items-center gap-3">
             <Activity className={cn("h-4 w-4", isActive ? "text-green-500" : "text-muted-foreground/20")} />
             <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Neural Load: 12.4%</span>
           </div>
           <div className="flex items-center gap-3">
             <Volume2 className="h-4 w-4 text-muted-foreground/40" />
             <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-primary" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
