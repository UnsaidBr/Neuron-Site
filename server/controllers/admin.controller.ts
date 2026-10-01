import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma.js';
import {
  paginationQuerySchema,
  updateContactStatusSchema,
} from '../validators/admin.validator.js';

/**
 * Controller: handleGetAdminContacts
 * GET /api/admin/contacts?page=1&limit=20
 */
export async function handleGetAdminContacts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [total, contacts] = await Promise.all([
      prisma.contactMessage.count({ where: whereClause }),
      prisma.contactMessage.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller: handleGetAdminPartnerships
 * GET /api/admin/partnerships?page=1&limit=20
 */
export async function handleGetAdminPartnerships(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [total, partnerships] = await Promise.all([
      prisma.partnershipProposal.count({ where: whereClause }),
      prisma.partnershipProposal.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data: partnerships,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller: handleGetAdminTrainees
 * GET /api/admin/trainees?page=1&limit=20
 */
export async function handleGetAdminTrainees(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = paginationQuerySchema.parse(req.query);
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [total, trainees] = await Promise.all([
      prisma.traineeApplication.count({ where: whereClause }),
      prisma.traineeApplication.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data: trainees,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller: handleUpdateContactStatus
 * PATCH /api/admin/contacts/:id
 * Updates administrative status of a contact message ('unread' | 'read' | 'archived' | 'in_progress' | 'replied')
 * Strictly uses existing ContactMessage.status field from Prisma schema.
 */
export async function handleUpdateContactStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const validationResult = updateContactStatusSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: 'Dados de atualização inválidos.',
        details: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { status } = validationResult.data;

    // Check existence
    const existing = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        success: false,
        error: 'Mensagem de contato não encontrada.',
      });
      return;
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: 'Status da mensagem atualizado com sucesso.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}
