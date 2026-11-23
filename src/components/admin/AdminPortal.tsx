import React, { useCallback, useEffect, useState } from 'react';
import { AdminUserProfile } from '../../types';
import { adminLogout, getAdminMe } from '../../services/adminApi';
import { AdminLoginView } from './AdminLoginView';
import { AdminDashboardView } from './AdminDashboardView';
import { NeuronLogo } from '../NeuronLogo';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const [adminUser, setAdminUser] = useState<AdminUserProfile | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const verifySession = useCallback(async () => {
    setIsCheckingSession(true);
    try {
      const profile = await getAdminMe();
      setAdminUser(profile);
      setSessionNotice(null);
    } catch {
      setAdminUser(null);
    } finally {
      setIsCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    void verifySession();
  }, [verifySession]);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch {
      // Clear local authenticated view even if cookie already expired
    } finally {
      setAdminUser(null);
      setSessionNotice(null);
    }
  };

  const handleSessionExpired = useCallback((message?: string) => {
    setAdminUser(null);
    setSessionNotice(message || 'Sessão encerrada. Faça login novamente.');
  }, []);

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#070510] text-[#F3F4F6] flex flex-col items-center justify-center gap-5 px-4">
        <NeuronLogo variant="navbar" />
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="w-4 h-4 border-2 border-[#7C3AED]/40 border-t-[#F59E0B] rounded-full animate-spin" />
          <span>Verificando sessão administrativa...</span>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <AdminLoginView
        onLoginSuccess={(profile) => {
          setSessionNotice(null);
          setAdminUser(profile);
        }}
        onBackToSite={onBackToSite}
        sessionMessage={sessionNotice}
      />
    );
  }

  return (
    <AdminDashboardView
      admin={adminUser}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
      onSessionExpired={handleSessionExpired}
    />
  );
};
