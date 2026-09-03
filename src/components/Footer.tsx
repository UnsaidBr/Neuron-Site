import React from 'react';
import { PageTab } from '../types';
import { ArrowUp, Instagram, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: PageTab) => void;
  onOpenTraineeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenTraineeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-black/60 backdrop-blur-lg py-16 text-white/50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] rounded-sm rotate-45 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-white rounded-full blur-[1px] opacity-80" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block leading-none">
                  NEURON
                </span>
                <span className="text-[8px] font-semibold text-[#7C3AED] tracking-widest block uppercase mt-1">
                  Núcleo de Estudos de IA • UFLA
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-light">
              Núcleo de excelência em inteligência artificial, robótica avançada e sistemas interativos no Departamento de Ciência da Computação da Universidade Federal de Lavras.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70 font-mono text-[11px]">
                Pesquisa Aberta • Campus UFLA
              </span>
            </div>
          </div>

          {/* Col 2: Projetos & Pesquisa */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-[0.25em] mb-4">
              Pesquisa &amp; Cases
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li>
                <button
                  onClick={() => onNavigateTab('projetos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Robô Budista Humanoide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('projetos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Agricultura Espacial &amp; Marte
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('projetos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Robótica Social Teomórfica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('projetos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Drones &amp; Visão Computacional
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('pesquisa')}
                  className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors cursor-pointer text-left font-medium"
                >
                  Repositório Científico Completo →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação & Núcleo */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-[0.25em] mb-4">
              O Núcleo
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li>
                <button
                  onClick={() => onNavigateTab('equipe')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sobre a Fundação &amp; Equipe
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('brand')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brand Identity Framework
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('pesquisa')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Metodologia &amp; 4 Etapas
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTraineeModal}
                  className="text-[#7C3AED] hover:text-[#A78BFA] transition-colors font-semibold cursor-pointer text-left"
                >
                  Edital Trainee 2025 (Inscreva-se)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Vínculo Institucional & Redes */}
          <div>
            <h4 className="text-[10px] font-mono font-bold text-[#F59E0B] uppercase tracking-[0.25em] mb-4">
              Vínculo Institucional
            </h4>
            <div className="space-y-2.5 text-xs text-white/50">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>
                  Universidade Federal de Lavras (UFLA)
                  <br />
                  Depto. de Ciência da Computação (DCC)
                  <br />
                  Lavras - MG, Brasil
                </span>
              </p>

              <div className="pt-2 font-mono text-[11px] space-y-1">
                <p>
                  <span className="text-white/80">Parcerias:</span> FAPESP • Hongik • Heriot-Watt • Ontario Tech
                </p>
                <a
                  href="https://instagram.com/neuron_ufla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors pt-1"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#DB2777]" />
                  <span>@neuron_ufla</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching Immersive UI */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/30 font-mono uppercase tracking-widest gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-white/40 tracking-[0.3em]">NEURON Core</span>
            <div className="h-3 w-px bg-white/10" />
            <span>© 2025 NEURON • UFLA. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="hidden md:inline">Ciência • Criatividade • Impacto Social</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white text-white/50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
