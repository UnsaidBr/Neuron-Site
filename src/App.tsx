import React, { useState } from 'react';
import { PageTab, Project } from './types';
import { PROJECTS_LIST, FLAGSHIP_PROJECT } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { AboutAndTeamView } from './components/AboutAndTeamView';
import { PublicationsAndProjectsView } from './components/PublicationsAndProjectsView';
import { PartnershipsView } from './components/PartnershipsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TraineeModal } from './components/TraineeModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('equipe-sobre');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTraineeModalOpen, setIsTraineeModalOpen] = useState(false);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS_LIST.find((p) => p.id === id) || FLAGSHIP_PROJECT;
    setSelectedProject(found);
  };

  const handleNavigateTab = (tab: PageTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#070510] bg-gradient-to-b from-[#090514] via-[#0b081e] via-[#070918] to-[#06040e] text-[#F3F4F6] min-h-screen flex flex-col selection:bg-[#7C3AED] selection:text-white relative overflow-x-hidden">
      {/* Continuous Futuristic Multi-Layered Background Engine */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient Cosmic Light Orbs positioned across scroll depths */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[130px] animate-ambient-slow" />
        <div className="absolute top-[18%] -right-40 w-[650px] h-[650px] rounded-full bg-[#DB2777]/15 blur-[140px] animate-ambient-reverse" />
        <div className="absolute top-[42%] -left-36 w-[700px] h-[700px] rounded-full bg-[#4F46E5]/18 blur-[150px] animate-ambient-slow" />
        <div className="absolute top-[65%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#7C3AED]/16 blur-[140px] animate-ambient-reverse" />
        <div className="absolute top-[85%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#DB2777]/16 blur-[130px] animate-ambient-slow" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-[#4338CA]/20 blur-[130px]" />
        
        {/* Subtle Cybernetic Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        
        {/* Subtle Tech Micro-Nodes */}
        <div className="absolute inset-0 bg-tech-dots opacity-70" />

        {/* Vertical Center Glow Line for subtle depth */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#7C3AED]/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Sticky Navigation */}
      <div className="relative z-20">
        <Navbar
          currentTab={currentTab}
          setCurrentTab={handleNavigateTab}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {(currentTab === 'equipe-sobre' || currentTab === 'home') && (
          <AboutAndTeamView
            onNavigateTab={handleNavigateTab}
            onOpenTraineeModal={() => setIsTraineeModalOpen(true)}
          />
        )}

        {(currentTab === 'publicacoes-projetos' || currentTab === 'projetos') && (
          <PublicationsAndProjectsView
            onSelectProject={handleSelectProject}
          />
        )}

        {currentTab === 'parcerias' && (
          <PartnershipsView />
        )}

        {currentTab === 'contatos' && (
          <ContactView />
        )}
      </main>

      {/* Complete Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
      />

      {/* Individual Project Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigateToContact={() => {
          setSelectedProject(null);
          handleNavigateTab('contatos');
        }}
      />

      {/* Trainee Recruitment Modal */}
      <TraineeModal
        isOpen={isTraineeModalOpen}
        onClose={() => setIsTraineeModalOpen(false)}
        defaultType="trainee"
      />
    </div>
  );
}
