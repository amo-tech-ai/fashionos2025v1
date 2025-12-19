
import React, { useState } from 'react';
import { Wand2, X, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { generateProjectWorkflow } from '@/lib/gemini';
import { useDashboardStore } from '@/hooks/useDashboardStore';

interface WorkflowOrchestratorProps {
  onClose: () => void;
}

export const WorkflowOrchestrator: React.FC<WorkflowOrchestratorProps> = ({ onClose }) => {
  const { addTasksBulk } = useDashboardStore();
  const [prompt, setPrompt] = useState('');
  const [isOrchestrating, setIsOrchestrating] = useState(false);

  const handleSynthesize = async () => {
    if (!prompt.trim() || prompt.length < 10) return;
    setIsOrchestrating(true);
    try {
      const generatedTasks = await generateProjectWorkflow(prompt);
      // Expected structure from Gemini: array of partial tasks
      addTasksBulk(generatedTasks);
      onClose();
    } catch (error) {
      console.error("Workflow synthesis failed", error);
      alert("Intelligence synthesis interrupted. Please refine your brief.");
    } finally {
      setIsOrchestrating(false);
    }
  };

  return (
    <div className="p-10 bg-white border border-primary/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] animate-in slide-in-from-top-4 duration-500 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Autonomous Project Synthesis</h3>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Project Brief & Objectives</label>
          <textarea 
            autoFocus
            className="w-full h-40 bg-muted/20 border-none p-6 text-sm font-serif italic leading-relaxed focus:ring-1 focus:ring-primary/20 resize-none transition-all placeholder:text-muted-foreground/30"
            placeholder="e.g., 'Plan the SS25 Paris Pop-up for the new denim capsule. Include scouting, logistics for 200 guests, and press kit distribution...'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest italic max-w-sm">
            <Sparkles className="h-3 w-3" />
            Gemini 3 Pro will decompose your brief into a multi-phase critical path.
          </div>
          <Button 
            className="h-14 px-12 rounded-none text-[10px] font-black tracking-widest uppercase shadow-xl"
            disabled={isOrchestrating || prompt.trim().length < 10}
            onClick={handleSynthesize}
          >
            {isOrchestrating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-3" />
                Orchestrating...
              </>
            ) : "Synthesize Workflow"}
          </Button>
        </div>
      </div>
    </div>
  );
};
