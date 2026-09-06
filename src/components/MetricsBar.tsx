import React from 'react';
import { METRICS } from '../data/projectsData';
import { StaggerContainer, StaggerItem } from './ScrollReveal';

export const MetricsBar: React.FC = () => {
  return (
    <section className="border-y border-white/5 bg-white/[0.015] backdrop-blur-sm py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {METRICS.map((metric, idx) => (
            <StaggerItem
              key={idx}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-center items-center hover:border-white/15 hover:bg-white/[0.05] transition-all group"
            >
              <span
                className={`block text-3xl lg:text-4xl font-bold font-display leading-tight ${
                  idx % 2 === 0 ? 'text-[#F59E0B]' : 'text-[#7C3AED]'
                }`}
              >
                {metric.value}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-wider text-white">
                {metric.label}
              </span>
              <p className="text-xs text-white/40 mt-1 max-w-[220px] leading-relaxed font-light">
                {metric.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

