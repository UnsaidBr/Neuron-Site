import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { PROJECTS_LIST } from '../data/projectsData';
import { ArrowRight, Search, SlidersHorizontal, Tag } from 'lucide-react';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  onSelectProject,
  showFilters = true,
  title = 'Projetos que Redefinem a Fronteira do Conhecimento',
  subtitle = 'Casos documentados no ecossistema NEURON. Criatividade científica com método rigoroso para solucionar desafios da Terra ao Espaço.',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'robotics', label: 'Robótica Teomórfica & IA' },
    { id: 'agrospace', label: 'Agricultura Espacial' },
    { id: 'vision', label: 'Visão Computacional & Drones' },
    { id: 'llm', label: 'Modelos de Linguagem & HRI' },
    { id: 'deeptech', label: 'Macroeconomia & Formação' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_LIST.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query)) ||
        project.partners.some((p) => p.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="w-full py-20 bg-[#050505] relative" id="projetos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase font-bold">
            // LINHAS DE PESQUISA &amp; INOVAÇÃO • NEURON LAB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Filter Controls Bar (if enabled) */}
        {showFilters && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] font-bold'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar projeto, tag ou parceiro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            {/* Active Count & Meta */}
            <div className="flex items-center justify-between text-xs font-mono text-white/40 px-1">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#F59E0B]" />
                Exibindo <b className="text-white">{filteredProjects.length}</b> de{' '}
                {PROJECTS_LIST.length} projetos
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-[#7C3AED] hover:underline cursor-pointer"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        )}

        {/* Projects Grid with Immersive UI double-layer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-[#111] border border-white/10 rounded-2xl p-1 relative overflow-hidden group transition-all duration-300 hover:border-white/20 flex flex-col justify-between"
            >
              {/* Glow Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Inner Card Container */}
              <div className="relative bg-[#0A0A0A] rounded-xl p-5 border border-white/5 flex flex-col justify-between h-full space-y-4">
                <div>
                  {/* Card Thumbnail */}
                  <div className="-mx-5 -mt-5 mb-4 h-48 overflow-hidden rounded-t-xl relative bg-black/40 border-b border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-black/80 backdrop-blur-md text-[#F59E0B] border border-[#F59E0B]/30">
                        {project.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3">
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-black/70 text-white/80 border border-white/10">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Meta Bar */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#7C3AED]/15 text-[#A78BFA] border border-[#7C3AED]/30">
                      {project.tagCategory}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 font-mono">
                      ● {project.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-white/50 text-xs leading-relaxed mb-3 font-light line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: Tags & Action Button */}
                <div className="space-y-3 pt-3 border-t border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-white/40">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-white/40 font-mono truncate max-w-[140px]">
                      {project.partners[0] || 'UFLA'}
                    </span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#A78BFA] transition-colors cursor-pointer"
                    >
                      <span>Explorar Case</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl p-8 max-w-md mx-auto border border-white/10">
            <Tag className="w-10 h-10 text-white/30 mx-auto mb-3" />
            <p className="text-white font-semibold">Nenhum projeto encontrado</p>
            <p className="text-xs text-white/40 mt-1">
              Tente buscar por outros termos ou selecione outra categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white cursor-pointer"
            >
              Ver Todos os Projetos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
