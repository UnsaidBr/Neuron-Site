import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  RefreshCw,
  Search,
  Users,
  X,
} from 'lucide-react';
import { NeuronLogo } from '../NeuronLogo';
import {
  AdminContactRecord,
  AdminContactStatus,
  AdminPagination,
  AdminPartnershipRecord,
  AdminTraineeRecord,
  AdminUserProfile,
} from '../../types';
import {
  getAdminContacts,
  getAdminPartnerships,
  getAdminTrainees,
  updateAdminContactStatus,
} from '../../services/adminApi';
import { ApiError } from '../../services/api';

type AdminSection = 'overview' | 'contacts' | 'partnerships' | 'trainees';

interface AdminDashboardViewProps {
  admin: AdminUserProfile;
  onLogout: () => Promise<void>;
  onBackToSite: () => void;
  onSessionExpired: (message?: string) => void;
}

const CONTACT_STATUS_OPTIONS: { value: AdminContactStatus; label: string }[] = [
  { value: 'unread', label: 'Não lida' },
  { value: 'read', label: 'Lida' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'replied', label: 'Respondida' },
  { value: 'archived', label: 'Arquivada' },
];

const CONTACT_STATUS_STYLES: Record<
  AdminContactStatus,
  { text: string; bg: string; border: string; label: string }
> = {
  unread: {
    text: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
    border: 'border-[#F59E0B]/30',
    label: 'Não lida',
  },
  read: {
    text: 'text-[#A78BFA]',
    bg: 'bg-[#7C3AED]/15',
    border: 'border-[#7C3AED]/35',
    label: 'Lida',
  },
  in_progress: {
    text: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/15',
    border: 'border-[#F59E0B]/35',
    label: 'Em andamento',
  },
  replied: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    label: 'Respondida',
  },
  archived: {
    text: 'text-white/55',
    bg: 'bg-white/5',
    border: 'border-white/15',
    label: 'Arquivada',
  },
};

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function getGenericStatusMeta(status: string): {
  label: string;
  classes: string;
} {
  const normalized = status.toLowerCase();
  if (normalized === 'pending') {
    return {
      label: 'Pendente',
      classes: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
    };
  }
  if (normalized === 'approved' || normalized === 'accepted') {
    return {
      label: 'Aprovado',
      classes: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    };
  }
  if (normalized === 'in_review' || normalized === 'reviewing') {
    return {
      label: 'Em análise',
      classes: 'text-[#A78BFA] bg-[#7C3AED]/15 border-[#7C3AED]/35',
    };
  }
  if (normalized === 'rejected' || normalized === 'archived') {
    return {
      label: 'Arquivado',
      classes: 'text-white/55 bg-white/5 border-white/15',
    };
  }
  return {
    label: status,
    classes: 'text-white/80 bg-white/5 border-white/15',
  };
}

const SECTION_LABELS: Record<AdminSection, string> = {
  overview: 'Visão Geral',
  contacts: 'Mensagens de Contato',
  partnerships: 'Propostas de Parceria',
  trainees: 'Inscrições de Trainees',
};

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  admin,
  onLogout,
  onBackToSite,
  onSessionExpired,
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Overview aggregates & recent feeds
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    contactsTotal: 0,
    unreadContactsTotal: 0,
    partnershipsTotal: 0,
    traineesTotal: 0,
  });
  const [recentContacts, setRecentContacts] = useState<AdminContactRecord[]>([]);
  const [recentPartnerships, setRecentPartnerships] = useState<AdminPartnershipRecord[]>([]);
  const [recentTrainees, setRecentTrainees] = useState<AdminTraineeRecord[]>([]);

  // Contacts state
  const [contacts, setContacts] = useState<AdminContactRecord[]>([]);
  const [contactsPagination, setContactsPagination] = useState<AdminPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });
  const [contactsStatusFilter, setContactsStatusFilter] = useState<string>('all');
  const [contactsPage, setContactsPage] = useState(1);
  const [contactsSearch, setContactsSearch] = useState('');
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [updatingContactId, setUpdatingContactId] = useState<string | null>(null);
  const [contactActionError, setContactActionError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<AdminContactRecord | null>(null);

  // Partnerships state
  const [partnerships, setPartnerships] = useState<AdminPartnershipRecord[]>([]);
  const [partnershipsPagination, setPartnershipsPagination] = useState<AdminPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });
  const [partnershipsStatusFilter, setPartnershipsStatusFilter] = useState<string>('all');
  const [partnershipsPage, setPartnershipsPage] = useState(1);
  const [partnershipsSearch, setPartnershipsSearch] = useState('');
  const [partnershipsLoading, setPartnershipsLoading] = useState(false);
  const [partnershipsError, setPartnershipsError] = useState<string | null>(null);
  const [selectedPartnership, setSelectedPartnership] =
    useState<AdminPartnershipRecord | null>(null);

  // Trainees state
  const [trainees, setTrainees] = useState<AdminTraineeRecord[]>([]);
  const [traineesPagination, setTraineesPagination] = useState<AdminPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });
  const [traineesStatusFilter, setTraineesStatusFilter] = useState<string>('all');
  const [traineesPage, setTraineesPage] = useState(1);
  const [traineesSearch, setTraineesSearch] = useState('');
  const [traineesLoading, setTraineesLoading] = useState(false);
  const [traineesError, setTraineesError] = useState<string | null>(null);
  const [selectedTrainee, setSelectedTrainee] = useState<AdminTraineeRecord | null>(null);

  const handleApiError = useCallback(
    (err: unknown, fallbackMessage: string): string => {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          onSessionExpired('Sua sessão expirou. Autentique-se novamente.');
        }
        return err.message;
      }
      return fallbackMessage;
    },
    [onSessionExpired]
  );

  const loadOverview = useCallback(async () => {
    setOverviewLoading(true);
    setOverviewError(null);
    try {
      const [contactsRes, unreadRes, partnershipsRes, traineesRes] = await Promise.all([
        getAdminContacts({ page: 1, limit: 5 }),
        getAdminContacts({ page: 1, limit: 1, status: 'unread' }),
        getAdminPartnerships({ page: 1, limit: 5 }),
        getAdminTrainees({ page: 1, limit: 5 }),
      ]);
      setCounts({
        contactsTotal: contactsRes.pagination.total,
        unreadContactsTotal: unreadRes.pagination.total,
        partnershipsTotal: partnershipsRes.pagination.total,
        traineesTotal: traineesRes.pagination.total,
      });
      setRecentContacts(contactsRes.data);
      setRecentPartnerships(partnershipsRes.data);
      setRecentTrainees(traineesRes.data);
    } catch (err) {
      setOverviewError(
        handleApiError(err, 'Não foi possível carregar os indicadores do painel.')
      );
    } finally {
      setOverviewLoading(false);
    }
  }, [handleApiError]);

  const loadContacts = useCallback(async () => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const res = await getAdminContacts({
        page: contactsPage,
        limit: 20,
        status: contactsStatusFilter,
      });
      setContacts(res.data);
      setContactsPagination(res.pagination);
    } catch (err) {
      setContactsError(handleApiError(err, 'Erro ao carregar mensagens de contato.'));
    } finally {
      setContactsLoading(false);
    }
  }, [contactsPage, contactsStatusFilter, handleApiError]);

  const loadPartnerships = useCallback(async () => {
    setPartnershipsLoading(true);
    setPartnershipsError(null);
    try {
      const res = await getAdminPartnerships({
        page: partnershipsPage,
        limit: 20,
        status: partnershipsStatusFilter,
      });
      setPartnerships(res.data);
      setPartnershipsPagination(res.pagination);
    } catch (err) {
      setPartnershipsError(handleApiError(err, 'Erro ao carregar propostas de parceria.'));
    } finally {
      setPartnershipsLoading(false);
    }
  }, [partnershipsPage, partnershipsStatusFilter, handleApiError]);

  const loadTrainees = useCallback(async () => {
    setTraineesLoading(true);
    setTraineesError(null);
    try {
      const res = await getAdminTrainees({
        page: traineesPage,
        limit: 20,
        status: traineesStatusFilter,
      });
      setTrainees(res.data);
      setTraineesPagination(res.pagination);
    } catch (err) {
      setTraineesError(handleApiError(err, 'Erro ao carregar inscrições de trainees.'));
    } finally {
      setTraineesLoading(false);
    }
  }, [traineesPage, traineesStatusFilter, handleApiError]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    if (activeSection === 'contacts') {
      void loadContacts();
    } else if (activeSection === 'partnerships') {
      void loadPartnerships();
    } else if (activeSection === 'trainees') {
      void loadTrainees();
    }
  }, [activeSection, loadContacts, loadPartnerships, loadTrainees]);

  const handleRefreshCurrent = () => {
    if (activeSection === 'overview') void loadOverview();
    if (activeSection === 'contacts') {
      void loadContacts();
      void loadOverview();
    }
    if (activeSection === 'partnerships') {
      void loadPartnerships();
      void loadOverview();
    }
    if (activeSection === 'trainees') {
      void loadTrainees();
      void loadOverview();
    }
  };

  const handleUpdateContactStatus = async (
    contactId: string,
    newStatus: AdminContactStatus
  ) => {
    setUpdatingContactId(contactId);
    setContactActionError(null);
    try {
      const updated = await updateAdminContactStatus(contactId, newStatus);
      setContacts((prev) =>
        prev.map((item) => (item.id === contactId ? updated : item))
      );
      setRecentContacts((prev) =>
        prev.map((item) => (item.id === contactId ? updated : item))
      );
      if (selectedContact?.id === contactId) {
        setSelectedContact(updated);
      }
      // Refresh unread count accurately from backend
      const unreadRes = await getAdminContacts({ page: 1, limit: 1, status: 'unread' });
      setCounts((prev) => ({
        ...prev,
        unreadContactsTotal: unreadRes.pagination.total,
      }));
    } catch (err) {
      setContactActionError(
        handleApiError(err, 'Não foi possível atualizar o status da mensagem.')
      );
    } finally {
      setUpdatingContactId(null);
    }
  };

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const filteredContacts = useMemo(() => {
    const q = contactsSearch.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        (c.institution || '').toLowerCase().includes(q)
    );
  }, [contacts, contactsSearch]);

  const filteredPartnerships = useMemo(() => {
    const q = partnershipsSearch.trim().toLowerCase();
    if (!q) return partnerships;
    return partnerships.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [partnerships, partnershipsSearch]);

  const filteredTrainees = useMemo(() => {
    const q = traineesSearch.trim().toLowerCase();
    if (!q) return trainees;
    return trainees.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.course.toLowerCase().includes(q) ||
        t.areaOfInterest.toLowerCase().includes(q)
    );
  }, [trainees, traineesSearch]);

  const isRefreshing =
    overviewLoading || contactsLoading || partnershipsLoading || traineesLoading;

  const navItems: {
    id: AdminSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number;
    accentClass: string;
  }[] = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      count:
        counts.contactsTotal + counts.partnershipsTotal + counts.traineesTotal,
      accentClass: 'text-[#A78BFA]',
    },
    {
      id: 'contacts',
      label: 'Mensagens',
      icon: Mail,
      count: counts.contactsTotal,
      accentClass: 'text-[#7C3AED]',
    },
    {
      id: 'partnerships',
      label: 'Parcerias',
      icon: Handshake,
      count: counts.partnershipsTotal,
      accentClass: 'text-[#F59E0B]',
    },
    {
      id: 'trainees',
      label: 'Trainees',
      icon: Users,
      count: counts.traineesTotal,
      accentClass: 'text-[#DB2777]',
    },
  ];

  const handleSelectSection = (section: AdminSection) => {
    setActiveSection(section);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070510] text-[#F3F4F6] flex relative overflow-x-hidden">
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#7C3AED]/15 blur-[140px]" />
        <div className="absolute bottom-[-140px] right-[-100px] w-[520px] h-[520px] rounded-full bg-[#DB2777]/12 blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-70" />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar (256px desktop, drawer on mobile) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 shrink-0 border-r border-white/10 bg-[#0A0814]/95 backdrop-blur-xl flex flex-col transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-20 px-5 border-b border-white/10 flex items-center justify-between">
          <div className="min-w-0">
            <NeuronLogo variant="navbar" />
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-white/5">
          <p className="text-xs font-semibold text-white truncate">{admin.name}</p>
          <p className="text-xs text-white/50 truncate mt-0.5">{admin.email}</p>
          <p className="text-[11px] text-[#A78BFA] mt-1 capitalize">
            Perfil · {admin.role}
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${
                  isActive
                    ? 'bg-[#7C3AED]/20 text-white border border-[#7C3AED]/40'
                    : 'text-white/65 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#F59E0B]' : item.accentClass
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {item.id !== 'overview' && (
                  <span className="text-xs font-mono tabular-nums text-white/60 ml-2">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-2">
          <button
            type="button"
            onClick={onBackToSite}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#A78BFA]" />
            <span>Voltar ao Site</span>
          </button>

          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-pink-200 bg-[#DB2777]/10 hover:bg-[#DB2777]/20 border border-[#DB2777]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
          >
            <LogOut className="w-4 h-4 text-[#DB2777]" />
            <span>{isLoggingOut ? 'Saindo...' : 'Encerrar Sessão'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* Top Workspace Header */}
        <header className="h-20 border-b border-white/10 bg-[#0A0814]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white cursor-pointer shrink-0"
              aria-label="Abrir navegação administrativa"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span>Administração</span>
                <span aria-hidden="true">/</span>
                <span className="text-[#F59E0B] font-medium truncate">
                  {SECTION_LABELS[activeSection]}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                {SECTION_LABELS[activeSection]}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleRefreshCurrent}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/85 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#A78BFA] ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

            <button
              type="button"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
            >
              <LogOut className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
            </button>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ================= OVERVIEW SECTION ================= */}
          {activeSection === 'overview' && (
            <>
              {overviewError && (
                <ErrorBanner message={overviewError} onRetry={loadOverview} />
              )}

              {/* 3 Real KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {overviewLoading ? (
                  <>
                    <KpiSkeleton />
                    <KpiSkeleton />
                    <KpiSkeleton />
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-white/60">
                            Mensagens de Contato
                          </p>
                          <p className="text-3xl font-bold text-white font-mono tabular-nums mt-2">
                            {counts.contactsTotal}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-[#A78BFA]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <span className="text-white/60 font-mono tabular-nums">
                          {counts.unreadContactsTotal} não lida(s)
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveSection('contacts')}
                          className="text-[#A78BFA] hover:text-white font-semibold cursor-pointer whitespace-nowrap"
                        >
                          Gerenciar →
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-white/60">
                            Propostas de Parceria
                          </p>
                          <p className="text-3xl font-bold text-white font-mono tabular-nums mt-2">
                            {counts.partnershipsTotal}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0">
                          <Handshake className="w-5 h-5 text-[#F59E0B]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <span className="text-white/60">
                          Submissões institucionais
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveSection('partnerships')}
                          className="text-[#F59E0B] hover:text-white font-semibold cursor-pointer whitespace-nowrap"
                        >
                          Visualizar →
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-white/60">
                            Inscrições de Trainees
                          </p>
                          <p className="text-3xl font-bold text-white font-mono tabular-nums mt-2">
                            {counts.traineesTotal}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#DB2777]/15 border border-[#DB2777]/30 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-[#DB2777]" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <span className="text-white/60">
                          Candidaturas registradas
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveSection('trainees')}
                          className="text-[#DB2777] hover:text-white font-semibold cursor-pointer whitespace-nowrap"
                        >
                          Visualizar →
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Recent Records Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Contacts */}
                <section className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-base font-bold text-white">
                      Últimas Mensagens
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveSection('contacts')}
                      className="text-xs font-semibold text-[#A78BFA] hover:text-white cursor-pointer whitespace-nowrap"
                    >
                      Ver todas
                    </button>
                  </div>

                  {overviewLoading ? (
                    <ListSkeleton rows={3} />
                  ) : recentContacts.length === 0 ? (
                    <p className="text-sm text-white/50 py-6 text-center">
                      Nenhuma mensagem de contato recebida até o momento.
                    </p>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {recentContacts.map((msg) => {
                        const st =
                          CONTACT_STATUS_STYLES[msg.status] ||
                          CONTACT_STATUS_STYLES.unread;
                        return (
                          <div
                            key={msg.id}
                            className="py-3 flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">
                                {msg.subject}
                              </p>
                              <p className="text-xs text-white/55 truncate mt-0.5">
                                {msg.name} · {msg.email}
                              </p>
                              <p className="text-[11px] text-white/40 font-mono tabular-nums mt-1">
                                {formatDateTime(msg.createdAt)}
                              </p>
                            </div>
                            <span
                              className={`px-2.5 py-1 rounded-md border text-[11px] font-medium whitespace-nowrap shrink-0 ${st.bg} ${st.border} ${st.text}`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Recent Partnerships & Trainees */}
                <section className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-base font-bold text-white">
                      Parcerias &amp; Trainees Recentes
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveSection('partnerships')}
                        className="text-xs font-semibold text-[#F59E0B] hover:text-white cursor-pointer whitespace-nowrap"
                      >
                        Parcerias
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection('trainees')}
                        className="text-xs font-semibold text-[#DB2777] hover:text-white cursor-pointer whitespace-nowrap"
                      >
                        Trainees
                      </button>
                    </div>
                  </div>

                  {overviewLoading ? (
                    <ListSkeleton rows={3} />
                  ) : recentPartnerships.length === 0 && recentTrainees.length === 0 ? (
                    <p className="text-sm text-white/50 py-6 text-center">
                      Nenhuma proposta de parceria ou inscrição de trainee registrada até o momento.
                    </p>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {recentPartnerships.slice(0, 3).map((partner) => (
                        <div
                          key={`p-${partner.id}`}
                          className="py-3 flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {partner.institution}
                            </p>
                            <p className="text-xs text-white/55 truncate mt-0.5">
                              Parceria · {partner.name} · {partner.type}
                            </p>
                          </div>
                          <span className="text-[11px] text-[#F59E0B] font-mono tabular-nums whitespace-nowrap shrink-0">
                            {formatDateTime(partner.createdAt)}
                          </span>
                        </div>
                      ))}

                      {recentTrainees.slice(0, 3).map((trainee) => (
                        <div
                          key={`t-${trainee.id}`}
                          className="py-3 flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {trainee.name}
                            </p>
                            <p className="text-xs text-white/55 truncate mt-0.5">
                              Trainee · {trainee.course} ({trainee.period})
                            </p>
                          </div>
                          <span className="text-[11px] text-[#DB2777] font-mono tabular-nums whitespace-nowrap shrink-0">
                            {formatDateTime(trainee.createdAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </>
          )}

          {/* ================= CONTACTS SECTION ================= */}
          {activeSection === 'contacts' && (
            <div className="space-y-5">
              {/* Filter & Search Toolbar */}
              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setContactsStatusFilter('all');
                      setContactsPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      contactsStatusFilter === 'all'
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-white/5 text-white/65 hover:text-white'
                    }`}
                  >
                    Todos
                  </button>
                  {CONTACT_STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setContactsStatusFilter(opt.value);
                        setContactsPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        contactsStatusFilter === opt.value
                          ? 'bg-[#7C3AED] text-white'
                          : 'bg-white/5 text-white/65 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full lg:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={contactsSearch}
                    onChange={(e) => setContactsSearch(e.target.value)}
                    placeholder="Buscar por nome, e-mail ou assunto..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              {contactsError && (
                <ErrorBanner message={contactsError} onRetry={loadContacts} />
              )}
              {contactActionError && (
                <ErrorBanner message={contactActionError} />
              )}

              {/* Contacts Table */}
              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 overflow-hidden">
                {contactsLoading ? (
                  <TableSkeleton cols={5} rows={5} />
                ) : filteredContacts.length === 0 ? (
                  <EmptyState
                    icon={Mail}
                    title="Nenhuma mensagem encontrada"
                    description={
                      contactsSearch || contactsStatusFilter !== 'all'
                        ? 'Nenhuma mensagem corresponde aos filtros selecionados.'
                        : 'Quando visitantes enviarem mensagens de contato, elas aparecerão aqui.'
                    }
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/50">
                          <th className="py-3.5 px-4 font-semibold">Remetente</th>
                          <th className="py-3.5 px-4 font-semibold">Assunto</th>
                          <th className="py-3.5 px-4 font-semibold">Status</th>
                          <th className="py-3.5 px-4 font-semibold">Recebida em</th>
                          <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-sm">
                        {filteredContacts.map((msg) => {
                          const st =
                            CONTACT_STATUS_STYLES[msg.status] ||
                            CONTACT_STATUS_STYLES.unread;
                          const isUpdating = updatingContactId === msg.id;

                          return (
                            <tr
                              key={msg.id}
                              className="hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="py-3.5 px-4 align-top">
                                <p className="font-semibold text-white">{msg.name}</p>
                                <p className="text-xs text-white/55">{msg.email}</p>
                                {msg.institution && (
                                  <p className="text-xs text-white/40 mt-0.5">
                                    {msg.institution}
                                  </p>
                                )}
                              </td>
                              <td className="py-3.5 px-4 align-top max-w-xs">
                                <p className="font-medium text-white truncate">
                                  {msg.subject}
                                </p>
                                <p className="text-xs text-[#A78BFA] mt-0.5 capitalize">
                                  Tópico: {msg.topic}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium whitespace-nowrap ${st.bg} ${st.border} ${st.text}`}
                                >
                                  {st.label}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 align-top text-xs text-white/60 font-mono tabular-nums whitespace-nowrap">
                                {formatDateTime(msg.createdAt)}
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <div className="flex items-center justify-end gap-2">
                                  <select
                                    aria-label={`Alterar status da mensagem de ${msg.name}`}
                                    value={msg.status}
                                    disabled={isUpdating}
                                    onChange={(e) =>
                                      handleUpdateContactStatus(
                                        msg.id,
                                        e.target.value as AdminContactStatus
                                      )
                                    }
                                    className="px-2.5 py-1.5 rounded-lg bg-[#141122] border border-white/15 text-xs text-white focus:outline-none focus:border-[#7C3AED] disabled:opacity-50 cursor-pointer"
                                  >
                                    {CONTACT_STATUS_OPTIONS.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedContact(msg)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#7C3AED]/20 border border-white/10 hover:border-[#7C3AED]/40 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-[#A78BFA]" />
                                    <span>Abrir</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <PaginationBar
                  pagination={contactsPagination}
                  onPageChange={setContactsPage}
                />
              </div>
            </div>
          )}

          {/* ================= PARTNERSHIPS SECTION ================= */}
          {activeSection === 'partnerships' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { value: 'all', label: 'Todas' },
                    { value: 'pending', label: 'Pendentes' },
                    { value: 'in_review', label: 'Em análise' },
                    { value: 'approved', label: 'Aprovadas' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPartnershipsStatusFilter(opt.value);
                        setPartnershipsPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        partnershipsStatusFilter === opt.value
                          ? 'bg-[#F59E0B] text-black font-semibold'
                          : 'bg-white/5 text-white/65 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={partnershipsSearch}
                    onChange={(e) => setPartnershipsSearch(e.target.value)}
                    placeholder="Buscar instituição, proponente ou tipo..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {partnershipsError && (
                <ErrorBanner
                  message={partnershipsError}
                  onRetry={loadPartnerships}
                />
              )}

              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 overflow-hidden">
                {partnershipsLoading ? (
                  <TableSkeleton cols={5} rows={5} />
                ) : filteredPartnerships.length === 0 ? (
                  <EmptyState
                    icon={Handshake}
                    title="Nenhuma proposta de parceria encontrada"
                    description={
                      partnershipsSearch || partnershipsStatusFilter !== 'all'
                        ? 'Nenhuma proposta corresponde aos filtros atuais.'
                        : 'As propostas de parceria enviadas pelo site aparecerão listadas aqui.'
                    }
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/50">
                          <th className="py-3.5 px-4 font-semibold">Proponente</th>
                          <th className="py-3.5 px-4 font-semibold">Instituição &amp; Tipo</th>
                          <th className="py-3.5 px-4 font-semibold">Escopo</th>
                          <th className="py-3.5 px-4 font-semibold">Status</th>
                          <th className="py-3.5 px-4 font-semibold">Recebida em</th>
                          <th className="py-3.5 px-4 font-semibold text-right">Detalhes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-sm">
                        {filteredPartnerships.map((item) => {
                          const st = getGenericStatusMeta(item.status);
                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="py-3.5 px-4 align-top">
                                <p className="font-semibold text-white">{item.name}</p>
                                <p className="text-xs text-white/55">{item.email}</p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <p className="font-medium text-white">
                                  {item.institution}
                                </p>
                                <p className="text-xs text-[#F59E0B] mt-0.5">
                                  {item.type}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top max-w-xs">
                                <p className="text-xs text-white/70 line-clamp-2">
                                  {item.scope}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium whitespace-nowrap ${st.classes}`}
                                >
                                  {st.label}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 align-top text-xs text-white/60 font-mono tabular-nums whitespace-nowrap">
                                {formatDateTime(item.createdAt)}
                              </td>
                              <td className="py-3.5 px-4 align-top text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPartnership(item)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#F59E0B]/15 border border-white/10 hover:border-[#F59E0B]/40 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#F59E0B]" />
                                  <span>Visualizar</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <PaginationBar
                  pagination={partnershipsPagination}
                  onPageChange={setPartnershipsPage}
                />
              </div>
            </div>
          )}

          {/* ================= TRAINEES SECTION ================= */}
          {activeSection === 'trainees' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { value: 'all', label: 'Todas' },
                    { value: 'pending', label: 'Pendentes' },
                    { value: 'in_review', label: 'Em análise' },
                    { value: 'approved', label: 'Aprovadas' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setTraineesStatusFilter(opt.value);
                        setTraineesPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        traineesStatusFilter === opt.value
                          ? 'bg-[#DB2777] text-white font-semibold'
                          : 'bg-white/5 text-white/65 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={traineesSearch}
                    onChange={(e) => setTraineesSearch(e.target.value)}
                    placeholder="Buscar candidato, curso ou área..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-[#DB2777]"
                  />
                </div>
              </div>

              {traineesError && (
                <ErrorBanner message={traineesError} onRetry={loadTrainees} />
              )}

              <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 overflow-hidden">
                {traineesLoading ? (
                  <TableSkeleton cols={5} rows={5} />
                ) : filteredTrainees.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="Nenhuma inscrição de trainee encontrada"
                    description={
                      traineesSearch || traineesStatusFilter !== 'all'
                        ? 'Nenhuma inscrição corresponde aos filtros selecionados.'
                        : 'As inscrições de trainees enviadas pela plataforma aparecerão aqui.'
                    }
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/50">
                          <th className="py-3.5 px-4 font-semibold">Candidato</th>
                          <th className="py-3.5 px-4 font-semibold">Curso &amp; Período</th>
                          <th className="py-3.5 px-4 font-semibold">Área de Interesse</th>
                          <th className="py-3.5 px-4 font-semibold">Status</th>
                          <th className="py-3.5 px-4 font-semibold">Inscrito em</th>
                          <th className="py-3.5 px-4 font-semibold text-right">Detalhes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-sm">
                        {filteredTrainees.map((item) => {
                          const st = getGenericStatusMeta(item.status);
                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-white/[0.03] transition-colors"
                            >
                              <td className="py-3.5 px-4 align-top">
                                <p className="font-semibold text-white">{item.name}</p>
                                <p className="text-xs text-white/55">{item.email}</p>
                                <p className="text-xs text-white/40 font-mono tabular-nums mt-0.5">
                                  {item.phone}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <p className="font-medium text-white">{item.course}</p>
                                <p className="text-xs text-white/55 mt-0.5">
                                  {item.period}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <p className="text-xs text-[#A78BFA] font-medium">
                                  {item.areaOfInterest}
                                </p>
                                <p className="text-[11px] text-white/45 mt-0.5 capitalize">
                                  Tipo: {item.type}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium whitespace-nowrap ${st.classes}`}
                                >
                                  {st.label}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 align-top text-xs text-white/60 font-mono tabular-nums whitespace-nowrap">
                                {formatDateTime(item.createdAt)}
                              </td>
                              <td className="py-3.5 px-4 align-top text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedTrainee(item)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#DB2777]/15 border border-white/10 hover:border-[#DB2777]/40 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#DB2777]" />
                                  <span>Visualizar</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <PaginationBar
                  pagination={traineesPagination}
                  onPageChange={setTraineesPage}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= CONTACT DETAIL MODAL ================= */}
      {selectedContact && (
        <DetailModal
          title={selectedContact.subject}
          subtitle={`${selectedContact.name} · ${selectedContact.email}`}
          onClose={() => setSelectedContact(null)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-white/10 pb-4">
            <div>
              <p className="text-white/45">Instituição</p>
              <p className="text-white mt-0.5">
                {selectedContact.institution || 'Não informada'}
              </p>
            </div>
            <div>
              <p className="text-white/45">Telefone</p>
              <p className="text-white font-mono tabular-nums mt-0.5">
                {selectedContact.phone || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-white/45">Tópico</p>
              <p className="text-[#A78BFA] capitalize mt-0.5">
                {selectedContact.topic}
              </p>
            </div>
            <div>
              <p className="text-white/45">Recebida em</p>
              <p className="text-white font-mono tabular-nums mt-0.5">
                {formatDateTime(selectedContact.createdAt)}
              </p>
            </div>
          </div>

          <div className="py-4">
            <p className="text-xs text-white/45 mb-2">Mensagem</p>
            <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
              {selectedContact.message}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-white/60">Atualizar status da mensagem:</span>
            <select
              value={selectedContact.status}
              disabled={updatingContactId === selectedContact.id}
              onChange={(e) =>
                handleUpdateContactStatus(
                  selectedContact.id,
                  e.target.value as AdminContactStatus
                )
              }
              className="px-3 py-2 rounded-xl bg-[#141122] border border-white/15 text-xs text-white focus:outline-none focus:border-[#7C3AED] disabled:opacity-50 cursor-pointer"
            >
              {CONTACT_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </DetailModal>
      )}

      {/* ================= PARTNERSHIP DETAIL MODAL (READ-ONLY) ================= */}
      {selectedPartnership && (
        <DetailModal
          title={selectedPartnership.institution}
          subtitle={`${selectedPartnership.name} · ${selectedPartnership.email}`}
          onClose={() => setSelectedPartnership(null)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-white/10 pb-4">
            <div>
              <p className="text-white/45">Tipo de Parceria</p>
              <p className="text-[#F59E0B] mt-0.5">{selectedPartnership.type}</p>
            </div>
            <div>
              <p className="text-white/45">Status</p>
              <p className="text-white mt-0.5">
                {getGenericStatusMeta(selectedPartnership.status).label}
              </p>
            </div>
            <div>
              <p className="text-white/45">Recebida em</p>
              <p className="text-white font-mono tabular-nums mt-0.5">
                {formatDateTime(selectedPartnership.createdAt)}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-white/45 mb-2">Escopo da Proposta</p>
            <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
              {selectedPartnership.scope}
            </p>
          </div>
        </DetailModal>
      )}

      {/* ================= TRAINEE DETAIL MODAL (READ-ONLY) ================= */}
      {selectedTrainee && (
        <DetailModal
          title={selectedTrainee.name}
          subtitle={`${selectedTrainee.email} · ${selectedTrainee.phone}`}
          onClose={() => setSelectedTrainee(null)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-white/10 pb-4">
            <div>
              <p className="text-white/45">Curso</p>
              <p className="text-white mt-0.5">{selectedTrainee.course}</p>
            </div>
            <div>
              <p className="text-white/45">Período</p>
              <p className="text-white mt-0.5">{selectedTrainee.period}</p>
            </div>
            <div>
              <p className="text-white/45">Área de Interesse</p>
              <p className="text-[#DB2777] mt-0.5">{selectedTrainee.areaOfInterest}</p>
            </div>
            <div>
              <p className="text-white/45">Status · Tipo</p>
              <p className="text-white mt-0.5 capitalize">
                {getGenericStatusMeta(selectedTrainee.status).label} · {selectedTrainee.type}
              </p>
            </div>
            <div>
              <p className="text-white/45">Inscrito em</p>
              <p className="text-white font-mono tabular-nums mt-0.5">
                {formatDateTime(selectedTrainee.createdAt)}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs text-white/45 mb-2">Motivação</p>
            <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
              {selectedTrainee.motivation}
            </p>
          </div>
        </DetailModal>
      )}
    </div>
  );
};

/* ================= REUSABLE INTERNAL UI SUBCOMPONENTS ================= */

const ErrorBanner: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div
    role="alert"
    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#DB2777]/40 bg-[#DB2777]/10 px-4 py-3 text-sm text-pink-200"
  >
    <div className="flex items-start gap-2.5">
      <AlertCircle className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer whitespace-nowrap self-start sm:self-auto"
      >
        Tentar novamente
      </button>
    )}
  </div>
);

const EmptyState: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="py-14 px-6 text-center flex flex-col items-center gap-3">
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-[#A78BFA]" />
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="text-sm text-white/55 max-w-md">{description}</p>
  </div>
);

const PaginationBar: React.FC<{
  pagination: AdminPagination;
  onPageChange: (nextPage: number) => void;
}> = ({ pagination, onPageChange }) => {
  if (pagination.total === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
      <span className="font-mono tabular-nums">
        Total: {pagination.total} registro(s) · Página {pagination.page} de{' '}
        {pagination.totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={pagination.page <= 1}
          onClick={() => onPageChange(pagination.page - 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Anterior</span>
        </button>
        <button
          type="button"
          disabled={!pagination.hasMore}
          onClick={() => onPageChange(pagination.page + 1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Próxima</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const DetailModal: React.FC<{
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, subtitle, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0D0B18] p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white break-words">{title}</h3>
          <p className="text-xs text-white/55 mt-1 break-words">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 cursor-pointer shrink-0"
          aria-label="Fechar janela de detalhes"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const KpiSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-white/10 bg-[#0D0B18]/85 p-6 space-y-4 animate-pulse">
    <div className="h-3 w-32 bg-white/10 rounded" />
    <div className="h-8 w-16 bg-white/15 rounded" />
    <div className="h-3 w-full bg-white/5 rounded" />
  </div>
);

const ListSkeleton: React.FC<{ rows: number }> = ({ rows }) => (
  <div className="space-y-3 py-2 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-14 rounded-xl bg-white/5" />
    ))}
  </div>
);

const TableSkeleton: React.FC<{ cols: number; rows: number }> = ({
  cols,
  rows,
}) => (
  <div className="p-4 space-y-3 animate-pulse">
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div key={rowIdx} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols }).map((__, colIdx) => (
          <div key={colIdx} className="h-10 rounded-lg bg-white/5" />
        ))}
      </div>
    ))}
  </div>
);
