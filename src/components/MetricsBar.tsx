import React from 'react';
import { METRICS } from '../data/projectsData';

export const MetricsBar: React.FC = () => {
  return (
    <section className="border-y border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-center items-center hover:border-white/15 transition-all group"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
