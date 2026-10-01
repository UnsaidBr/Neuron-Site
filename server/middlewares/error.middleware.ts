import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const issues = (err.issues || (err as unknown as { errors: typeof err.issues }).errors || []).map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      error: 'Dados de requisição inválidos.',
      details: issues,
    });
    return;
  }

  // 2. Syntax Error (e.g. malformed JSON body)
  if (err instanceof SyntaxError && 'status' in err && (err as { status?: number }).status === 400) {
    res.status(400).json({
      success: false,
      error: 'JSON malformado no corpo da requisição.',
    });
    return;
  }

  // 3. Prisma Database Initialization / Connection Error (e.g. no DB reachable)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error('[Database Connection Error]: Não foi possível conectar ao PostgreSQL.', err.message);
    res.status(503).json({
      success: false,
      error: 'O serviço de banco de dados está temporariamente indisponível. Verifique a configuração da DATABASE_URL.',
    });
    return;
  }

  // 4. Prisma Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(`[Prisma Request Error ${err.code}]:`, err.message);

    // Unique constraint violation
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: 'Registro conflitante: já existe um registro com os identificadores fornecidos.',
      });
      return;
    }

    // Record not found
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        error: 'Recurso não encontrado.',
      });
      return;
    }

    res.status(400).json({
      success: false,
      error: 'Erro na operação de banco de dados.',
    });
    return;
  }

  // 5. Generic / Unhandled Internal Server Errors
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    error: 'Ocorreu um erro interno no servidor ao processar sua solicitação.',
  });
}
