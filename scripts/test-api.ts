/**
 * Automated test suite for NEURON REST API (Etapa 3)
 * Run with: npx tsx scripts/test-api.ts
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

interface TestCase {
  name: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: unknown;
  rawBody?: string;
  expectedStatus: number | number[];
  validateResponse?: (data: unknown) => boolean;
}

const testCases: TestCase[] = [
  {
    name: '1. Health Check (GET /api/health)',
    url: `${BASE_URL}/api/health`,
    method: 'GET',
    expectedStatus: 200,
    validateResponse: (data: unknown) => {
      const d = data as { status?: string; service?: string };
      return d?.status === 'ok' && d?.service === 'neuron-api';
    },
  },
  {
    name: '2. Contacts: Rejeitar payload vazio com 400',
    url: `${BASE_URL}/api/contacts`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {},
    expectedStatus: 400,
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean; details?: unknown[] };
      return d?.success === false && Array.isArray(d?.details) && d.details.length > 0;
    },
  },
  {
    name: '3. Contacts: Rejeitar campos desconhecidos/arbitrários com 400',
    url: `${BASE_URL}/api/contacts`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'Carlos Oliveira',
      email: 'carlos@ufla.br',
      subject: 'Contato sobre P&D',
      message: 'Mensagem válida com mais de 10 caracteres',
      campoInvalido: 'hacker_injection',
    },
    expectedStatus: 400,
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean; error?: string };
      return d?.success === false;
    },
  },
  {
    name: '4. Partnerships: Rejeitar payload com e-mail inválido com 400',
    url: `${BASE_URL}/api/partnerships`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'A',
      email: 'email-invalido',
      institution: 'UFLA',
      type: 'PDI',
      scope: 'Curto',
    },
    expectedStatus: 400,
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean; details?: unknown[] };
      return d?.success === false && Array.isArray(d?.details);
    },
  },
  {
    name: '5. Trainees: Rejeitar payload incompleto com 400',
    url: `${BASE_URL}/api/trainees`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'Maria Santos',
    },
    expectedStatus: 400,
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean; details?: unknown[] };
      return d?.success === false && Array.isArray(d?.details);
    },
  },
  {
    name: '6. Payload com JSON sintaticamente malformado -> 400',
    url: `${BASE_URL}/api/contacts`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    rawBody: '{"invalid_json": ',
    expectedStatus: 400,
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean; error?: string };
      return d?.success === false;
    },
  },
  {
    name: '7. Projects: Consulta (GET /api/projects)',
    url: `${BASE_URL}/api/projects`,
    method: 'GET',
    expectedStatus: [200, 503], // 200 se DB conectado, 503 se sem DB
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean };
      return typeof d?.success === 'boolean';
    },
  },
  {
    name: '8. Publications: Consulta (GET /api/publications)',
    url: `${BASE_URL}/api/publications`,
    method: 'GET',
    expectedStatus: [200, 503], // 200 se DB conectado, 503 se sem DB
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean };
      return typeof d?.success === 'boolean';
    },
  },
  {
    name: '9. Partners: Consulta (GET /api/partners)',
    url: `${BASE_URL}/api/partners`,
    method: 'GET',
    expectedStatus: [200, 503], // 200 se DB conectado, 503 se sem DB
    validateResponse: (data: unknown) => {
      const d = data as { success?: boolean };
      return typeof d?.success === 'boolean';
    },
  },
];

async function runSuite() {
  console.log('='.repeat(60));
  console.log('  SUÍTE DE TESTES AUTOMATIZADOS - ETAPA 3 (API REST)');
  console.log(`  Alvo: ${BASE_URL}`);
  console.log('='.repeat(60));

  let passed = 0;
  let failed = 0;

  for (const test of testCases) {
    try {
      const options: RequestInit = {
        method: test.method,
        headers: test.headers || {},
      };

      if (test.rawBody) {
        options.body = test.rawBody;
      } else if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const res = await fetch(test.url, options);
      const isExpectedStatus = Array.isArray(test.expectedStatus)
        ? test.expectedStatus.includes(res.status)
        : res.status === test.expectedStatus;

      let json: unknown = null;
      try {
        json = await res.json();
      } catch {
        // Not JSON
      }

      const isDataValid = test.validateResponse ? test.validateResponse(json) : true;

      if (isExpectedStatus && isDataValid) {
        console.log(`\x1b[32m✔ [PASS]\x1b[0m ${test.name} -> HTTP ${res.status}`);
        passed++;
      } else {
        console.error(
          `\x1b[31m✖ [FAIL]\x1b[0m ${test.name} -> HTTP ${res.status} (esperado: ${JSON.stringify(
            test.expectedStatus
          )})`
        );
        console.error('   Resposta:', json);
        failed++;
      }
    } catch (err) {
      console.error(`\x1b[31m✖ [ERROR]\x1b[0m ${test.name} ->`, (err as Error).message);
      failed++;
    }
  }

  console.log('='.repeat(60));
  console.log(`Resultado: ${passed} passaram, ${failed} falharam.`);
  console.log('='.repeat(60));

  if (failed > 0) {
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Erro na execução dos testes:', err);
  process.exit(1);
});
