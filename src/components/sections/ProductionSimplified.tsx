import React from 'react';

const steps = [
  { num: '01', title: 'Plan', desc: 'Shot lists & moodboards' },
  { num: '02', title: 'Produce', desc: 'Call sheets & logistics' },
  { num: '03', title: 'Capture', desc: 'Connected set tools' },
  { num: '04', title: 'Deliver', desc: 'Real-time retouching' },
];

export const ProductionSimplified: React.FC = () => {
  return (
    <section className="bg-primary text-primary-foreground py-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="font-serif text-5xl mb-4">Production, Simplified.</h2>
          <p className="text-white/60">From concept to call sheet in one workflow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="border-t border-white/20 pt-8 group cursor-pointer">
              <span className="block text-4xl font-serif text-white/30 mb-4 group-hover:text-white transition-colors">{step.num}</span>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-sm text-white/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};