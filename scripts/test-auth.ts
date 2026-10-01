import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {
  hashPassword,
  comparePassword,
  signAdminToken,
  verifyAdminToken,
  ADMIN_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  getAdminCookieOptions,
  JWT_ALGORITHM,
  AdminJwtPayload,
} from '../server/utils/auth.js';
import { requireAdminAuth } from '../server/middlewares/requireAdminAuth.js';
import { prisma } from '../server/prisma.js';
import { Request, Response } from 'express';

dotenv.config();

// Ensure JWT_SECRET exists in test environment
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test_secret_for_automated_suite_1234567890_min_32_characters';
}

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`\x1b[32m✔ [PASS]\x1b[0m ${testName}`);
    passed++;
  } else {
    console.error(`\x1b[31m✖ [FAIL]\x1b[0m ${testName}${detail ? ` (${detail})` : ''}`);
    failed++;
  }
}

// Helper to extract cookies from Set-Cookie headers
function parseSetCookie(headers: Headers): Record<string, { value: string; httpOnly?: boolean }> {
  const cookies: Record<string, { value: string; httpOnly?: boolean }> = {};
  const setCookieHeaders: string[] = [];

  // Node fetch may combine or allow raw Set-Cookie
  headers.forEach((val, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      setCookieHeaders.push(val);
    }
  });

  for (const header of setCookieHeaders) {
    // split by comma if multiple cookies packed, but careful with expires date
    const parts = header.split(';');
    const [first, ...flags] = parts;
    const [k, ...v] = first.split('=');
    const cookieName = k.trim();
    const cookieVal = v.join('=').trim();
    const isHttpOnly = flags.some((f) => f.trim().toLowerCase() === 'httponly');
    cookies[cookieName] = { value: cookieVal, httpOnly: isHttpOnly };
  }
  return cookies;
}

async function runAuthTests() {
  console.log('============================================================');
  console.log('  SUÍTE DE TESTES UNITÁRIOS & ENDPOINTS (ETAPAS 6B & 6C)    ');
  console.log('============================================================');

  // ============================================================
  // PARTE 1: TESTES UNITÁRIOS DE CRIPTOGRAFIA & TOKENS (ETAPA 6B)
  // ============================================================
  try {
    const rawPass = 'SenhaSeguraNeuron2026!';
    const hashed = await hashPassword(rawPass);

    assert(
      hashed.startsWith('$2a$') || hashed.startsWith('$2b$'),
      '1. hashPassword: Gera hash bcrypt válido com prefixo $2a$/$2b$'
    );
    assert(
      hashed.length === 60,
      '2. hashPassword: Hash possui comprimento padrão de 60 caracteres'
    );

    const matchesCorrect = await comparePassword(rawPass, hashed);
    assert(
      matchesCorrect === true,
      '3. comparePassword: Valida corretamente a senha correta'
    );

    const matchesIncorrect = await comparePassword('SenhaIncorretaErrada!', hashed);
    assert(
      matchesIncorrect === false,
      '4. comparePassword: Rejeita senha incorreta com false'
    );
  } catch (err: any) {
    assert(false, 'Testes de Senha falharam com exceção', err.message);
  }

  const samplePayload: AdminJwtPayload = {
    sub: 'test-admin-uuid-1234',
    email: 'admin.teste@neuron.dcc.ufla.br',
    role: 'superadmin',
    tokenVersion: 1,
  };

  try {
    const validToken = signAdminToken(samplePayload);
    assert(
      typeof validToken === 'string' && validToken.split('.').length === 3,
      '5. signAdminToken: Cria token JWT assinado válido em 3 partes'
    );

    const decoded = verifyAdminToken(validToken);
    assert(
      decoded.sub === samplePayload.sub &&
        decoded.email === samplePayload.email &&
        decoded.tokenVersion === 1,
      '6. verifyAdminToken: Decodifica e valida payload íntegro'
    );
  } catch (err: any) {
    assert(false, 'Criação e verificação de JWT válido falharam', err.message);
  }

  // Rejeição de Token Adulterado
  try {
    const validToken = signAdminToken(samplePayload);
    const tamperedToken = validToken.substring(0, validToken.length - 4) + 'abcd';
    verifyAdminToken(tamperedToken);
    assert(false, '7. verifyAdminToken: Deveria rejeitar token com assinatura adulterada');
  } catch {
    assert(true, '7. verifyAdminToken: Rejeita token com assinatura adulterada');
  }

  // Rejeição de Token Expirado
  try {
    const expiredToken = jwt.sign(samplePayload, process.env.JWT_SECRET!, {
      expiresIn: '-10s',
      algorithm: JWT_ALGORITHM,
    });
    verifyAdminToken(expiredToken);
    assert(false, '8. verifyAdminToken: Deveria rejeitar token expirado');
  } catch {
    assert(true, '8. verifyAdminToken: Rejeita token expirado');
  }

  // Rejeição de Algoritmo Inesperado
  try {
    const noneAlgorithmToken = jwt.sign(samplePayload, '', {
      algorithm: 'none',
    });
    verifyAdminToken(noneAlgorithmToken);
    assert(false, '9. verifyAdminToken: Deveria rejeitar token com algoritmo "none"');
  } catch {
    assert(true, '9. verifyAdminToken: Rejeita token com algoritmo "none"');
  }

  // Configuração de Cookie
  const cookieOpts = getAdminCookieOptions();
  assert(
    ADMIN_COOKIE_NAME === 'neuron_admin_token' &&
      cookieOpts.httpOnly === true &&
      cookieOpts.sameSite === 'lax' &&
      cookieOpts.path === '/' &&
      cookieOpts.maxAge === 8 * 60 * 60 * 1000,
    '10. Cookie: Configuração centralizada com HttpOnly, SameSite=Lax e 8h de maxAge'
  );

  // ============================================================
  // PARTE 2: TESTES ENDPOINT REST DE LOGIN (ETAPA 6C)
  // ============================================================
  const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@neuron.dcc.ufla.br').trim().toLowerCase();
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'NeuronAdminSecret2026!';

  // 1. Login com payload inválido -> HTTP 400
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'email_invalido', password: '' }),
    });
    const json = await res.json();
    assert(
      res.status === 400 && json.success === false,
      '11. Login com payload inválido -> HTTP 400'
    );
  } catch (e: any) {
    assert(false, '11. Login payload inválido', e.message);
  }

  // 2. Login com email inexistente -> HTTP 401
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'inexistente@dcc.ufla.br', password: 'QualquerSenha123!' }),
    });
    const json = await res.json();
    assert(
      res.status === 401 && json.error === 'Credenciais inválidas.',
      '12. Login com email inexistente -> HTTP 401 com mensagem genérica'
    );
  } catch (e: any) {
    assert(false, '12. Login email inexistente', e.message);
  }

  // 3. Login com senha errada -> HTTP 401
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: 'SenhaTotalmenteIncorreta999!' }),
    });
    const json = await res.json();
    assert(
      res.status === 401 && json.error === 'Credenciais inválidas.',
      '13. Login com senha incorreta -> HTTP 401 com mensagem genérica'
    );
  } catch (e: any) {
    assert(false, '13. Login senha incorreta', e.message);
  }

  // 4. Login com usuário inativo -> HTTP 401
  try {
    const adminInDb = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
    if (adminInDb) {
      await prisma.adminUser.update({
        where: { id: adminInDb.id },
        data: { isActive: false },
      });

      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      assert(
        res.status === 401,
        '14. Login com usuário inativo -> HTTP 401'
      );

      // Reativar usuário
      await prisma.adminUser.update({
        where: { id: adminInDb.id },
        data: { isActive: true },
      });
    }
  } catch (e: any) {
    assert(false, '14. Login usuário inativo', e.message);
  }

  // 5. Login Válido -> HTTP 200, Sem JWT no JSON, Sem passwordHash, Cookies corretos
  let authCookie = '';
  let csrfCookie = '';
  let csrfTokenValue = '';

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: adminPassword }),
    });
    const json = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';

    // Extrair cookies
    authCookie = (setCookie.match(/neuron_admin_token=([^;]+)/) || [])[0] || '';
    csrfCookie = (setCookie.match(/neuron_csrf_token=([^;]+)/) || [])[0] || '';
    csrfTokenValue = csrfCookie ? csrfCookie.replace('neuron_csrf_token=', '') : '';

    const hasJwtInBody = Boolean((json as any).token || (json as any).jwt || (json as any).data?.token);
    const hasHashInBody = Boolean((json as any).passwordHash || (json as any).data?.passwordHash);
    const isHttpOnlyCookie = setCookie.toLowerCase().includes('httponly');

    assert(
      res.status === 200 && json.success === true && json.data?.email === adminEmail,
      '15. Login válido -> HTTP 200 com dados de perfil retornados'
    );
    assert(!hasJwtInBody, '16. JWT NÃO aparece no corpo JSON da resposta');
    assert(!hasHashInBody, '17. passwordHash NÃO aparece na resposta');
    assert(isHttpOnlyCookie && authCookie.length > 0, '18. Cookie neuron_admin_token é HttpOnly');
    assert(csrfCookie.length > 0, '19. Cookie CSRF gerado e atribuído na resposta');
  } catch (e: any) {
    assert(false, '15-19. Login válido', e.message);
  }

  // ============================================================
  // PARTE 3: TESTES DE SESSÃO (/api/auth/me)
  // ============================================================
  // 1. GET /api/auth/me sem cookie -> 401
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    assert(res.status === 401, '20. GET /api/auth/me sem cookie -> HTTP 401');
  } catch (e: any) {
    assert(false, '20. GET /api/auth/me sem cookie', e.message);
  }

  // 2. GET /api/auth/me com sessão válida -> 200
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: `${authCookie}; ${csrfCookie}` },
    });
    const json = await res.json();
    assert(
      res.status === 200 && json.data?.email === adminEmail && !json.data?.passwordHash,
      '21. GET /api/auth/me com sessão válida -> HTTP 200 e dados sem senha'
    );
  } catch (e: any) {
    assert(false, '21. GET /api/auth/me válido', e.message);
  }

  // 3. GET /api/auth/me com JWT inválido -> 401
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: `neuron_admin_token=token_invalido_malformado` },
    });
    assert(res.status === 401, '22. GET /api/auth/me com JWT inválido -> HTTP 401');
  } catch (e: any) {
    assert(false, '22. GET /api/auth/me token inválido', e.message);
  }

  // 4. GET /api/auth/me com tokenVersion divergente -> 401
  try {
    const adminInDb = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
    if (adminInDb) {
      const revokedToken = signAdminToken({
        sub: adminInDb.id,
        email: adminInDb.email,
        role: adminInDb.role,
        tokenVersion: adminInDb.tokenVersion + 10,
      });
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Cookie: `neuron_admin_token=${revokedToken}` },
      });
      assert(res.status === 401, '23. GET /api/auth/me com tokenVersion divergente -> HTTP 401');
    }
  } catch (e: any) {
    assert(false, '23. GET /api/auth/me tokenVersion divergente', e.message);
  }

  // ============================================================
  // PARTE 4: TESTES DE ROTAS ADMINISTRATIVAS (/api/admin/*)
  // ============================================================
  // 1. Sem autenticação -> 401
  try {
    const [resContacts, resPartners, resTrainees, resPatch] = await Promise.all([
      fetch(`${BASE_URL}/api/admin/contacts`),
      fetch(`${BASE_URL}/api/admin/partnerships`),
      fetch(`${BASE_URL}/api/admin/trainees`),
      fetch(`${BASE_URL}/api/admin/contacts/test-id`, { method: 'PATCH' }),
    ]);

    assert(resContacts.status === 401, '24. GET /api/admin/contacts sem autenticação -> HTTP 401');
    assert(resPartners.status === 401, '25. GET /api/admin/partnerships sem autenticação -> HTTP 401');
    assert(resTrainees.status === 401, '26. GET /api/admin/trainees sem autenticação -> HTTP 401');
    assert(resPatch.status === 401, '27. PATCH /api/admin/contacts/:id sem autenticação -> HTTP 401');
  } catch (e: any) {
    assert(false, '24-27. Rotas admin sem autenticação', e.message);
  }

  // 2. Com autenticação -> 200 (consultas)
  try {
    const res = await fetch(`${BASE_URL}/api/admin/contacts?page=1&limit=10`, {
      headers: { Cookie: `${authCookie}; ${csrfCookie}` },
    });
    const json = await res.json();
    assert(
      res.status === 200 && json.success === true && Array.isArray(json.data) && json.pagination,
      '28. GET /api/admin/contacts autenticado -> HTTP 200 com paginação'
    );
  } catch (e: any) {
    assert(false, '28. GET /api/admin/contacts autenticado', e.message);
  }

  // 3. Criar registro temporário para testar PATCH
  const tempContact = await prisma.contactMessage.create({
    data: {
      name: 'Temp Test Contact',
      email: 'temp.test@dcc.ufla.br',
      subject: 'Teste de PATCH administrativo',
      message: 'Mensagem temporária para validação de CSRF e atualização de status.',
      status: 'unread',
    },
  });

  // 4. PATCH administrativo sem CSRF -> 403
  try {
    const res = await fetch(`${BASE_URL}/api/admin/contacts/${tempContact.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${authCookie}; ${csrfCookie}`,
      },
      body: JSON.stringify({ status: 'read' }),
    });
    assert(res.status === 403, '29. PATCH /api/admin/contacts/:id sem cabeçalho CSRF -> HTTP 403');
  } catch (e: any) {
    assert(false, '29. PATCH sem CSRF', e.message);
  }

  // 5. PATCH administrativo com CSRF válido -> 200
  try {
    const res = await fetch(`${BASE_URL}/api/admin/contacts/${tempContact.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${authCookie}; ${csrfCookie}`,
        'X-CSRF-Token': csrfTokenValue,
      },
      body: JSON.stringify({ status: 'in_progress' }),
    });
    const json = await res.json();
    assert(
      res.status === 200 && json.data?.status === 'in_progress',
      '30. PATCH /api/admin/contacts/:id com CSRF válido -> HTTP 200 e status atualizado'
    );
  } catch (e: any) {
    assert(false, '30. PATCH com CSRF válido', e.message);
  }

  // Remover registro temporário
  await prisma.contactMessage.delete({ where: { id: tempContact.id } });

  // ============================================================
  // PARTE 5: LOGOUT SEGURO & INVALIDAÇÃO
  // ============================================================
  // 1. Logout com CSRF válido
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Cookie: `${authCookie}; ${csrfCookie}`,
        'X-CSRF-Token': csrfTokenValue,
      },
    });
    const json = await res.json();
    const setCookie = res.headers.get('set-cookie') || '';
    const clearedToken = setCookie.includes('neuron_admin_token=;') || setCookie.includes('Max-Age=0');

    assert(
      res.status === 200 && json.success === true && clearedToken,
      '31. POST /api/auth/logout com CSRF -> HTTP 200 e cookies de sessão limpos'
    );
  } catch (e: any) {
    assert(false, '31. Logout seguro', e.message);
  }

  // 2. Verificar que requisições subsequentes sem cookies retornam 401
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    assert(
      res.status === 401,
      '32. Sessão não é mais aceita sem o cookie após o logout -> HTTP 401'
    );
  } catch (e: any) {
    assert(false, '32. Sessão após logout', e.message);
  }

  // ============================================================
  // PARTE 6: RATE LIMITING NO LOGIN
  // ============================================================
  try {
    let hitRateLimit = false;
    // We already performed 3-4 failed/successful logins from this IP; trigger up to 6 more to hit 5-attempt limit
    for (let i = 0; i < 7; i++) {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'rate.limit@teste.com', password: 'senha' }),
      });
      if (res.status === 429) {
        hitRateLimit = true;
        break;
      }
    }
    assert(
      hitRateLimit,
      '33. Rate Limiting no Login: Produz HTTP 429 após exceder 5 tentativas na janela'
    );
  } catch (e: any) {
    assert(false, '33. Rate limiting test', e.message);
  }

  await prisma.$disconnect();

  console.log('============================================================');
  console.log(`Resultado da Suíte de Autenticação: ${passed} passaram, ${failed} falharam.`);
  console.log('============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runAuthTests().catch((e) => {
  console.error('Erro na execução dos testes:', e);
  process.exit(1);
});
