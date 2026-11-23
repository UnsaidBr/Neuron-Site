import {
  AdminContactRecord,
  AdminContactStatus,
  AdminPaginatedResponse,
  AdminPartnershipRecord,
  AdminTraineeRecord,
  AdminUserProfile,
} from '../types';
import { ApiResponse, request } from './api';

const CSRF_COOKIE_NAME = 'neuron_csrf_token';

/**
 * Lê o token CSRF (cookie não-HttpOnly) exclusivamente para envio no header X-CSRF-Token.
 * O JWT da sessão permanece estritamente em cookie HttpOnly inacessível ao JavaScript.
 */
export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [rawName, ...rest] = cookie.trim().split('=');
    if (rawName === CSRF_COOKIE_NAME) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

function buildCsrfHeaders(): Record<string, string> {
  const csrfToken = getCsrfTokenFromCookie();
  if (!csrfToken) return {};
  return { 'X-CSRF-Token': csrfToken };
}

export interface AdminQueryParams {
  page?: number;
  limit?: number;
  status?: string;
}

function buildQueryString(params: AdminQueryParams = {}): string {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.status && params.status !== 'all') search.set('status', params.status);
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export async function adminLogin(
  email: string,
  password: string
): Promise<AdminUserProfile> {
  const res = await request<ApiResponse<AdminUserProfile>>('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return res.data;
}

export async function adminLogout(): Promise<void> {
  await request<ApiResponse<null>>('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: buildCsrfHeaders(),
  });
}

export async function getAdminMe(): Promise<AdminUserProfile> {
  const res = await request<ApiResponse<AdminUserProfile>>('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });
  return res.data;
}

export async function getAdminContacts(
  params: AdminQueryParams = {}
): Promise<AdminPaginatedResponse<AdminContactRecord>> {
  return request<AdminPaginatedResponse<AdminContactRecord>>(
    `/api/admin/contacts${buildQueryString(params)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
}

export async function updateAdminContactStatus(
  id: string,
  status: AdminContactStatus
): Promise<AdminContactRecord> {
  const res = await request<ApiResponse<AdminContactRecord>>(
    `/api/admin/contacts/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: buildCsrfHeaders(),
      body: JSON.stringify({ status }),
    }
  );
  return res.data;
}

export async function getAdminPartnerships(
  params: AdminQueryParams = {}
): Promise<AdminPaginatedResponse<AdminPartnershipRecord>> {
  return request<AdminPaginatedResponse<AdminPartnershipRecord>>(
    `/api/admin/partnerships${buildQueryString(params)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
}

export async function getAdminTrainees(
  params: AdminQueryParams = {}
): Promise<AdminPaginatedResponse<AdminTraineeRecord>> {
  return request<AdminPaginatedResponse<AdminTraineeRecord>>(
    `/api/admin/trainees${buildQueryString(params)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
}
