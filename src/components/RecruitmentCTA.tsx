import React from 'react';
import { Mail, ArrowRight, Instagram, Sparkles, FolderGit2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { NeuronBee } from './NeuronBee';

interface ContactCTAProps {
  onNavigateToContact: () => void;
  onExploreProjects: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  onNavigateToContact,
  onExploreProjects,
}) => {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-white/5" id="contato-cta">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Immersive UI Double-Layer Frame */}
        <ScrollReveal direction="up" duration={0.7}>
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#DB2777]/10 to-transparent pointer-events-none" />

            <div className="relative bg-[#0A0A0A]/90 rounded-xl p-8 sm:p-14 border border-white/5 text-center">
              {/* Mascot Spotlight Animation */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F59E0B]/20 blur-2xl rounded-full" />
                  <NeuronBee size={68} animate={true} />
                </div>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>PARCERIAS &amp; DIÁLOGO ABERTO // DCC • UFLA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-4">
                Quer desenvolver um <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] via-[#F59E0B] to-[#DB2777]">projeto de extensão</span> conosco?
              </h2>

              <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 leading-relaxed font-light">
                Conectamos empresas, cooperativas, escolas e o poder público à tecnologia de ponta desenvolvida na UFLA. Converse diretamente com nossa equipe de coordenadores e pesquisadores.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onNavigateToContact}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] flex items-center justify-center space-x-3 cursor-pointer transition-all hover:scale-102"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B]" />
                  <span>Como nos Contatar</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </button>

                <button
                  onClick={onExploreProjects}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/80 hover:text-white border border-white/10 flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  <FolderGit2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Ver Todos os Projetos</span>
                </button>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/40">
                <a
                  href="https://instagram.com/neuron.ufla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#F59E0B] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#DB2777]" />
                  <span>Siga @neuron.ufla para atualizações e bastidores</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
