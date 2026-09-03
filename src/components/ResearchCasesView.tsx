import React from 'react';
import { Project } from '../types';
import { FlagshipProject } from './FlagshipProject';
import { MethodologySection } from './MethodologySection';
import { ProjectsGrid } from './ProjectsGrid';
import { FileText, Sparkles, Award, Globe } from 'lucide-react';

interface ResearchCasesViewProps {
  onSelectProject: (project: Project) => void;
  onOpenTraineeModal: () => void;
}

export const ResearchCasesView: React.FC<ResearchCasesViewProps> = ({
  onSelectProject,
  onOpenTraineeModal,
}) => {
  return (
    <div className="w-full space-y-16">
      {/* Research Hub Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="inline-flex items-center space-x-2 text-[#F59E0B] font-mono text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-4 h-4 text-[#DB2777]" />
          <span>// REPOSITÓRIO CIENTÍFICO &amp; INOVAÇÃO • NEURON LAB</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl">
          Pesquisas de Fronteira e{' '}
          <span className="text-[#A78BFA]">Cases que Transformam</span> a Ciência.
        </h1>

        <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-3xl mt-4 font-light">
          Explore os projetos pioneiros desenvolvidos por pesquisadores da UFLA em cooperação com centros de excelência global — da robótica social teomórfica e modelos de interação humano-máquina à agricultura espacial simulada para ambientes extraterrestres.
        </p>

        {/* Quick Highlights Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
          <div className="p-4 rounded-xl bg-[#111] border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-[#F59E0B] font-mono">03</span>
            <p className="text-xs font-bold text-white mt-1 uppercase">Patentes &amp; Registros</p>
            <span className="text-[11px] text-white/40 font-mono">Propriedade Intelectual</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111] border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-[#DB2777] font-mono">04</span>
            <p className="text-xs font-bold text-white mt-1 uppercase">Universidades Parceiras</p>
            <span className="text-[11px] text-white/40 font-mono">Brasil • Coreia • UK • Canadá</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111] border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-[#7C3AED] font-mono">FAPESP</span>
            <p className="text-xs font-bold text-white mt-1 uppercase">Fomento &amp; Financiamento</p>
            <span className="text-[11px] text-white/40 font-mono">Apoio CNPq, FAPESP &amp; UFLA</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111] border border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
            <p className="text-xs font-bold text-white mt-1 uppercase">Ciência Aberta &amp; P&amp;D</p>
            <span className="text-[11px] text-white/40 font-mono">Publicações de Impacto Social</span>
          </div>
        </div>
      </section>

      {/* Flagship Project Section */}
      <FlagshipProject onSelectProject={onSelectProject} />

      {/* Complete Filterable Projects Grid */}
      <ProjectsGrid
        onSelectProject={onSelectProject}
        title="Todos os Projetos & Linhas de Investigação"
        subtitle="Selecione filtros por área ou busque por palavras-chave para explorar problemas, hipóteses e resultados documentados."
      />

      {/* Scientific Workflow & Methodology */}
      <MethodologySection />

      {/* Whitepapers & Open Access Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
          <div className="relative bg-[#0A0A0A] rounded-xl p-8 sm:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
                <FileText className="w-4 h-4 text-[#DB2777]" />
                <span>PUBLICAÇÕES &amp; CIÊNCIA ABERTA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Acesso aos Whitepapers e Repositórios do NEURON
              </h3>
              <p className="text-xs sm:text-sm text-white/50 max-w-xl font-light">
                Disponibilizamos datasets anotados, arquiteturas de redes e relatórios técnicos para cooperação com universidades e laboratórios parceiros.
              </p>
            </div>

            <button
              onClick={onOpenTraineeModal}
              className="px-6 py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
            >
              Solicitar Acesso Científico
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
