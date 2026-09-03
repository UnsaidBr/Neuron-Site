import React, { useState, useEffect } from 'react';
import { TraineeApplication } from '../types';
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface TraineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'trainee' | 'partnership';
}

export const TraineeModal: React.FC<TraineeModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'trainee',
}) => {
  const [formData, setFormData] = useState<TraineeApplication>({
    name: '',
    email: '',
    phone: '',
    course: '',
    period: '1º - 3º Período',
    areaOfInterest: 'Robótica Teomórfica & IA Social',
    motivation: '',
    type: defaultType,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: defaultType }));
  }, [defaultType]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-1 relative w-full max-w-2xl max-h-[90vh] overflow-hidden group shadow-2xl">
        <div className="relative w-full max-h-[calc(90vh-8px)] overflow-y-auto bg-[#0A0A0A] rounded-xl p-6 sm:p-10 border border-white/5 text-white">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors cursor-pointer z-10"
            aria-label="Fechar formulário"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {formData.type === 'trainee'
                  ? 'Inscrição Registrada com Sucesso!'
                  : 'Proposta Enviada com Sucesso!'}
              </h3>

              <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                Recebemos seu manifesto de interesse. Nossa equipe de coordenação do NEURON (UFLA)
                entrará em contato pelo e-mail informado com os próximos passos e datas das dinâmicas.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs font-mono text-white/60 text-left space-y-1">
                <p>
                  <b className="text-white">Candidato:</b> {formData.name}
                </p>
                <p>
                  <b className="text-white">E-mail:</b> {formData.email}
                </p>
                <p>
                  <b className="text-white">Linha:</b> {formData.areaOfInterest}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://instagram.com/neuron_ufla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Acompanhar no Instagram @neuron_ufla</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase tracking-wider text-white/70 hover:text-white"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold mb-2">
                  <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                  <span>CICLO DE NOVOS TALENTOS • 2025</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {formData.type === 'trainee'
                    ? 'Processo Seletivo Trainee NEURON'
                    : 'Proposta de Parceria ou Pesquisa'}
                </h2>
                <p className="text-xs sm:text-sm text-white/50 mt-1 leading-relaxed font-light">
                  Preencha os dados abaixo para submeter sua candidatura ao núcleo de inteligência
                  artificial da UFLA.
                </p>
              </div>

              {/* Type selector toggle */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'trainee' })}
                  className={`py-2 rounded-md font-semibold transition-all cursor-pointer ${
                    formData.type === 'trainee'
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Inscrição Trainee (UFLA)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'partnership' })}
                  className={`py-2 rounded-md font-semibold transition-all cursor-pointer ${
                    formData.type === 'partnership'
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Parceria de P&amp;D / Indústria
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ana Clara Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      E-mail Institucional ou Pessoal *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: ana.silva@estudante.ufla.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(35) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      {formData.type === 'trainee' ? 'Curso de Graduação *' : 'Empresa / Instituição *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        formData.type === 'trainee'
                          ? 'Ex: Ciência da Computação / Eng. de Controle'
                          : 'Ex: Empresa Tech / Laboratório'
                      }
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      {formData.type === 'trainee' ? 'Período Atual' : 'Porte / Fase'}
                    </label>
                    <select
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#111] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    >
                      <option value="1º - 3º Período">1º ao 3º Período</option>
                      <option value="4º - 6º Período">4º ao 6º Período</option>
                      <option value="7º - 10º Período">7º ao 10º Período</option>
                      <option value="Pós-Graduação">Pós-Graduação / Mestrado</option>
                      <option value="Empresa / Organização">Empresa / Organização</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-medium text-white/70">
                      Área de Maior Interesse
                    </label>
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#111] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                    >
                      <option value="Robótica Teomórfica & IA Social">
                        Robótica Teomórfica &amp; IA Social
                      </option>
                      <option value="Agricultura Espacial & Bio-Engenharia">
                        Agricultura Espacial &amp; Bio-Engenharia
                      </option>
                      <option value="Visão Computacional & Drones">
                        Visão Computacional &amp; Drones
                      </option>
                      <option value="Modelos de Linguagem & HRI">
                        Modelos de Linguagem &amp; HRI
                      </option>
                      <option value="Hardware & Prototipagem Rápida">
                        Hardware &amp; Prototipagem Rápida
                      </option>
                      <option value="Gestão de Projetos & Design">
                        Gestão de Projetos &amp; Design
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-white/70">
                    Por que você quer fazer parte do NEURON? (Motivação breve)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte um pouco sobre sua trajetória, projetos anteriores ou por que essa área desperta sua curiosidade..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED] text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <p className="text-[11px] font-mono text-white/40">
                    Processo seletivo oficial do Núcleo de Estudos da UFLA.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-xs uppercase tracking-wider font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submeter Inscrição</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
