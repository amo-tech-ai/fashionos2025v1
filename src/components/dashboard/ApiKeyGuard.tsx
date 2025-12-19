
import React, { useState, useEffect } from 'react';
import { ShieldAlert, ExternalLink, Key, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ApiKeyGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const exists = await window.aistudio.hasSelectedApiKey();
      setHasKey(exists);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume success as per instructions to avoid race condition
      setHasKey(true);
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  if (hasKey === null) return null;

  if (!hasKey) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-12 text-center animate-in fade-in duration-700">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary/5 rounded-none flex items-center justify-center mx-auto mb-8 border border-primary/10">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl italic tracking-tight">Identity Verification</h1>
            <p className="text-muted-foreground text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed">
              Gemini 3 Pro Synthesis Requires <br/> Paid Project Authentication
            </p>
          </div>

          <div className="p-8 border border-primary/5 bg-muted/20 space-y-6 text-left">
            <div className="flex gap-4">
              <ShieldAlert className="h-5 w-5 text-primary shrink-0" />
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest">Billing Requirements</p>
                <p className="text-xs text-muted-foreground leading-relaxed italic font-serif">
                  Pro-tier visual synthesis and long-context reasoning are billed via your Google Cloud project. 
                </p>
              </div>
            </div>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-all"
            >
              <ExternalLink className="h-3 w-3" />
              Review Billing Documentation
            </a>
          </div>

          <Button 
            size="lg" 
            onClick={handleSelectKey}
            className="w-full h-16 rounded-none uppercase text-[10px] font-black tracking-[0.4em] shadow-2xl"
          >
            Authenticate Workspace
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
