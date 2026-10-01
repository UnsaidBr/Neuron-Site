import { Project, Publication, Partner, ContactMessage, TraineeApplication } from '../types';
import { PROJECTS_LIST } from '../data/projectsData';
import { PUBLICATIONS_LIST } from '../data/publicationsData';
import { PARTNERS_LIST } from '../data/partnersData';

/**
 * Base URL for API requests.
 * Uses VITE_API_URL if configured, otherwise relative path '' to hit Express/Vite server.
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
  source?: 'api' | 'fallback';
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors?: ApiErrorDetail[];

  constructor(message: string, statusCode: number, errors?: ApiErrorDetail[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Generic fetch wrapper with timeout, JSON parsing and consistent error normalization.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    throw new ApiError(
      'Falha na conexão com o servidor. Verifique sua conexão de rede.',
      0
    );
  }

  // Parse response payload
  let data: any = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const defaultMessage =
      response.status === 503
        ? 'Serviço de banco de dados temporariamente indisponível.'
        : response.status === 429
        ? 'Muitas requisições enviadas. Aguarde alguns instantes antes de tentar novamente.'
        : `Erro na requisição (código ${response.status}).`;

    const errorMessage = data?.message || defaultMessage;
    const errors: ApiErrorDetail[] = data?.errors || [];

    throw new ApiError(errorMessage, response.status, errors);
  }

  return data as T;
}

// ==========================================
// CONSULTAS (GET) COM FALLBACK INTELIGENTE
// ==========================================

/**
 * Busca a listagem de projetos.
 * Caso a API falhe ou retorne HTTP 503 (ausência de banco real), usa PROJECTS_LIST como fallback transparente.
 */
export async function getProjects(): Promise<{ projects: Project[]; source: 'api' | 'fallback' }> {
  try {
    const res = await request<ApiResponse<Project[]>>('/api/projects');
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return { projects: res.data, source: 'api' };
    }
    return { projects: PROJECTS_LIST, source: 'fallback' };
  } catch (err) {
    // Graceful fallback para manter funcionamento da interface
    return { projects: PROJECTS_LIST, source: 'fallback' };
  }
}

/**
 * Busca a listagem de publicações científicas.
 * Normaliza os dados e usa PUBLICATIONS_LIST como fallback.
 */
export async function getPublications(): Promise<{ publications: Publication[]; source: 'api' | 'fallback' }> {
  try {
    const res = await request<ApiResponse<Publication[]>>('/api/publications');
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return { publications: res.data, source: 'api' };
    }
    return { publications: PUBLICATIONS_LIST, source: 'fallback' };
  } catch (err) {
    return { publications: PUBLICATIONS_LIST, source: 'fallback' };
  }
}

/**
 * Busca a listagem de parceiros do ecossistema.
 * Usa PARTNERS_LIST como fallback.
 */
export async function getPartners(): Promise<{ partners: Partner[]; source: 'api' | 'fallback' }> {
  try {
    const res = await request<ApiResponse<Partner[]>>('/api/partners');
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return { partners: res.data, source: 'api' };
    }
    return { partners: PARTNERS_LIST, source: 'fallback' };
  } catch (err) {
    return { partners: PARTNERS_LIST, source: 'fallback' };
  }
}

// ==========================================
// FORMULÁRIOS (POST) COM RETORNO DE ERRO
// ==========================================

export interface CreateContactPayload {
  name: string;
  email: string;
  institution?: string;
  phone?: string;
  subject: string;
  topic: string;
  message: string;
}

export interface CreatePartnershipPayload {
  name: string;
  email: string;
  institution: string;
  type: string;
  scope: string;
}

export interface CreateTraineePayload {
  name: string;
  email: string;
  phone: string;
  course: string;
  period: string;
  areaOfInterest: string;
  motivation: string;
  type?: string;
}

/**
 * Envia mensagem pelo formulário de contato.
 * Endpoint: POST /api/contacts
 */
export async function submitContact(payload: CreateContactPayload): Promise<ApiResponse<any>> {
  return request<ApiResponse<any>>('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Envia proposta de parceria institucional.
 * Endpoint: POST /api/partnerships
 */
export async function submitPartnership(payload: CreatePartnershipPayload): Promise<ApiResponse<any>> {
  return request<ApiResponse<any>>('/api/partnerships', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Envia manifesto de interesse/inscrição trainee.
 * Endpoint: POST /api/trainees
 */
export async function submitTraineeApplication(payload: CreateTraineePayload): Promise<ApiResponse<any>> {
  return request<ApiResponse<any>>('/api/trainees', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
