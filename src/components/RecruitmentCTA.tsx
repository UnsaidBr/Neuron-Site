import React from 'react';
import { Sparkles, ArrowRight, Instagram, FileText } from 'lucide-react';

interface RecruitmentCTAProps {
  onOpenTraineeModal: () => void;
  onExploreProjects: () => void;
}

export const RecruitmentCTA: React.FC<RecruitmentCTAProps> = ({
  onOpenTraineeModal,
  onExploreProjects,
}) => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5" id="trainee">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Immersive UI Double-Layer Frame */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#DB2777]/10 to-transparent pointer-events-none" />

          <div className="relative bg-[#0A0A0A] rounded-xl p-8 sm:p-14 border border-white/5 text-center">
            {/* Abstract status */}
            <div className="absolute top-4 right-5 text-white/30 font-mono text-xs hidden sm:block">
              // STATUS: INSCRIÇÕES_ABERTAS
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>CICLO DE NOVOS TALENTOS • 2025</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-4">
              Quer fazer parte do <span className="text-[#A78BFA]">NEURON?</span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 leading-relaxed font-light">
              Inscrições abertas para novos trainees! Vem transformar o futuro com a gente explorando tecnologias que conectam ciência de ponta, criatividade e impacto social.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenTraineeModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] flex items-center justify-center space-x-3 cursor-pointer transition-all"
              >
                <span>INSCREVA-SE AGORA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreProjects}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/80 hover:text-white border border-white/10 flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <FileText className="w-4 h-4 text-[#F59E0B]" />
                <span>Ver Linhas &amp; Projetos</span>
              </button>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/40">
              <a
                href="https://instagram.com/neuron_ufla"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#F59E0B] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#DB2777]" />
                <span>Link oficial também no Instagram @neuron_ufla</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
