import React from 'react';
import { METHODOLOGY_STAGES } from '../data/projectsData';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
            <Sparkles className="w-3 h-3 text-[#DB2777]" />
            <span>RIGOR METODOLÓGICO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-2">
            Como o NEURON Pesquisa e Inova
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light">
            Nossa espiral de engenharia computacional conecta a hipótese científica pura à aplicação real em campo e escala de impacto social.
          </p>
        </div>

        {/* 4 Stages Process Grid with Immersive UI double-layer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative bg-[#0A0A0A] rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
                <div>
                  {/* Top Step Number Badge */}
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform text-[#F59E0B]">
                    <span>{stage.step}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs font-mono text-white/40 flex items-center gap-2 mt-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{stage.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
