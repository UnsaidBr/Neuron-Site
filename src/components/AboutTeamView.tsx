import React from 'react';
import { TeamSection } from './TeamSection';
import { TestimonialSection } from './TestimonialSection';
import { Sparkles, GraduationCap, Award, Compass, HeartHandshake } from 'lucide-react';

interface AboutTeamViewProps {
  onOpenTraineeModal: () => void;
}

export const AboutTeamView: React.FC<AboutTeamViewProps> = ({ onOpenTraineeModal }) => {
  return (
    <div className="w-full space-y-16">
      {/* About Header */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="inline-flex items-center space-x-2 text-[#F59E0B] font-mono text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-4 h-4 text-[#DB2777]" />
          <span>// INSTITUCIONAL • DEPARTAMENTO DE CIÊNCIA DA COMPUTAÇÃO (DCC/UFLA)</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl">
          Construindo a Nova Geração da{' '}
          <span className="text-[#A78BFA]">Inteligência Artificial Brasileira.</span>
        </h1>

        <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-3xl mt-4 font-light">
          O NEURON nasceu na Universidade Federal de Lavras com o propósito de romper as barreiras entre teoria acadêmica e tecnologia tangível de alto impacto social, científico e industrial.
        </p>

        {/* Institutional Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-3">
            <Compass className="w-6 h-6 text-[#F59E0B]" />
            <h3 className="text-lg font-bold text-white">Nossa Missão</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              Desenvolver pesquisas de ponta em robótica e inteligência artificial, formando pesquisadores e engenheiros capacitados a resolver problemas complexos da humanidade.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-3">
            <Award className="w-6 h-6 text-[#DB2777]" />
            <h3 className="text-lg font-bold text-white">Excelência Científica</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              Trabalhos aprovados em fóruns internacionais (IEEE, ACM) e cooperação transfronteiriça com instituições de prestígio na Coreia do Sul, Reino Unido e Canadá.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#7C3AED]" />
            <h3 className="text-lg font-bold text-white">Impacto Humano</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              Acreditamos que a tecnologia deve acolher, curar e conectar. Por isso pesquisamos robótica teomórfica empática e sustentabilidade alimentar.
            </p>
          </div>
        </div>
      </section>

      {/* Prominent Team Showcase & Photos */}
      <TeamSection />

      {/* Alumni & International Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111] border border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#F59E0B] uppercase font-bold tracking-[0.2em]">
                TRAJETÓRIA &amp; RECONHECIMENTO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
                Para Onde Nossos Pesquisadores Vão?
              </h2>
            </div>
            <span className="px-3 py-1 rounded-md bg-white/5 text-xs font-mono text-white/70 border border-white/10">
              Alumni Global
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/5 space-y-2">
              <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
              <h4 className="text-sm font-bold text-white">OCAD University</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Residências de pesquisa em design sensorial e interação humano-robô em Toronto, Canadá.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/5 space-y-2">
              <GraduationCap className="w-5 h-5 text-[#DB2777]" />
              <h4 className="text-sm font-bold text-white">McGill University</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Estágios de pós-graduação e publicação conjunta em processamento neural de linguagem.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/5 space-y-2">
              <GraduationCap className="w-5 h-5 text-[#7C3AED]" />
              <h4 className="text-sm font-bold text-white">Toronto Rehabilitation</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Desenvolvimento de tecnologias assistivas de precisão para reabilitação física.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/5 space-y-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Hongik University</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Cooperação contínua em inteligência artificial teomórfica e exposições na Ásia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainee Testimonial Section */}
      <TestimonialSection />

      {/* Join the team CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center py-10">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
          <div className="relative bg-[#0A0A0A] rounded-xl p-8 sm:p-10 border border-white/5 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pronto para Fazer Parte Dessa História?
            </h3>
            <p className="text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed font-light">
              Seja você um estudante da UFLA buscando seu primeiro laboratório de pesquisa ou um parceiro industrial, as portas do NEURON estão abertas.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTraineeModal}
                className="px-8 py-3.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
              >
                Participar do Processo Seletivo Trainee
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
