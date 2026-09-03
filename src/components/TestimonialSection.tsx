import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 relative bg-[#050505] border-t border-white/5" id="depoimento">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold mb-6">
          <span>07. DEPOIMENTO / TRAINEE</span>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden text-left group">
          <div className="relative bg-[#0A0A0A] rounded-xl p-8 sm:p-12 border border-white/5">
            <span className="text-6xl font-serif text-[#DB2777] leading-none block -mb-4 opacity-80 select-none">
              “
            </span>
            <blockquote className="text-lg sm:text-2xl font-light text-white leading-relaxed italic mb-8">
              Aqui encontrei um espaço onde posso aplicar o que aprendo em sala para resolver problemas reais com impacto social.
            </blockquote>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] p-0.5 shrink-0">
                <div className="w-full h-full bg-[#0A0A0A] rounded-[6px] flex items-center justify-center font-bold text-white font-mono text-sm">
                  LS
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-wide">
                  Luiz Soares
                </h4>
                <p className="text-xs text-[#F59E0B] font-mono">
                  Trainee NEURON • DCC / UFLA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
