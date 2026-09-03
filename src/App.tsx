import React, { useState } from 'react';
import { PageTab, Project } from './types';
import { PROJECTS_LIST, FLAGSHIP_PROJECT } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { FlagshipProject } from './components/FlagshipProject';
import { ProjectsGrid } from './components/ProjectsGrid';
import { MethodologySection } from './components/MethodologySection';
import { TeamSection } from './components/TeamSection';
import { TestimonialSection } from './components/TestimonialSection';
import { BrandFrameworkSection } from './components/BrandFrameworkSection';
import { RecruitmentCTA } from './components/RecruitmentCTA';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TraineeModal } from './components/TraineeModal';
import { ResearchCasesView } from './components/ResearchCasesView';
import { AboutTeamView } from './components/AboutTeamView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTraineeModalOpen, setIsTraineeModalOpen] = useState<boolean>(false);
  const [traineeModalType, setTraineeModalType] = useState<'trainee' | 'partnership'>('trainee');

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS_LIST.find((p) => p.id === id) || FLAGSHIP_PROJECT;
    setSelectedProject(found);
  };

  const handleOpenTraineeModal = (type: 'trainee' | 'partnership' = 'trainee') => {
    setTraineeModalType(type);
    setIsTraineeModalOpen(true);
  };

  const handleNavigateTab = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-[#F3F4F6] min-h-screen flex flex-col selection:bg-[#7C3AED] selection:text-white relative overflow-x-hidden">
      {/* Immersive UI Radial Glows & Subtle Grid Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(219, 39, 119, 0.1) 0%, transparent 40%)',
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern" />

      {/* Top Sticky Navigation */}
      <div className="relative z-20">
        <Navbar
          currentTab={currentTab}
          setCurrentTab={handleNavigateTab}
          onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {currentTab === 'home' && (
          <>
            {/* Hero Section with Interactive Carousel */}
            <HeroSection
              onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
              onExploreProjects={() => handleNavigateTab('projetos')}
              onSelectProjectById={handleSelectProjectById}
            />

            {/* Metrics Indicator Banner */}
            <MetricsBar />

            {/* Flagship Project Case Study */}
            <FlagshipProject onSelectProject={handleSelectProject} />

            {/* Research & Innovation Portfolio Grid */}
            <ProjectsGrid
              onSelectProject={handleSelectProject}
              showFilters={true}
              title="Portfólio de Pesquisa & Inovação"
              subtitle="Projetos documentados no ecossistema NEURON. Criatividade científica com método rigoroso para solucionar desafios da Terra ao Espaço."
            />

            {/* 4-Step Methodology Section */}
            <MethodologySection />

            {/* Team Showcase with Real Photo */}
            <TeamSection />

            {/* Brand Framework Section Preview */}
            <BrandFrameworkSection />

            {/* Trainee Testimonial */}
            <TestimonialSection />

            {/* Recruitment CTA Banner */}
            <RecruitmentCTA
              onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
              onExploreProjects={() => handleNavigateTab('projetos')}
            />
          </>
        )}

        {currentTab === 'projetos' && (
          <div className="pt-8 pb-16">
            <ProjectsGrid
              onSelectProject={handleSelectProject}
              showFilters={true}
              title="Catálogo Geral de Pesquisas & Projetos"
              subtitle="Navegue pelas linhas de investigação ativas no NEURON. Utilize os filtros por categoria ou a barra de busca para encontrar casos de uso, artigos e resultados de bancada."
            />
          </div>
        )}

        {currentTab === 'pesquisa' && (
          <ResearchCasesView
            onSelectProject={handleSelectProject}
            onOpenTraineeModal={() => handleOpenTraineeModal('partnership')}
          />
        )}

        {currentTab === 'brand' && (
          <div className="pt-8 pb-16">
            <BrandFrameworkSection />
          </div>
        )}

        {currentTab === 'equipe' && (
          <AboutTeamView onOpenTraineeModal={() => handleOpenTraineeModal('trainee')} />
        )}
      </main>

      {/* Complete Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenTraineeModal={() => handleOpenTraineeModal('trainee')}
      />

      {/* Individual Project Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenTraineeModal={() => {
          setSelectedProject(null);
          handleOpenTraineeModal('trainee');
        }}
      />

      {/* Trainee Recruitment & Partnership Modal */}
      <TraineeModal
        isOpen={isTraineeModalOpen}
        onClose={() => setIsTraineeModalOpen(false)}
        defaultType={traineeModalType}
      />
    </div>
  );
}
