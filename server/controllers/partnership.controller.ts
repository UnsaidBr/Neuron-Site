import { Request, Response, NextFunction } from 'express';
import * as partnershipService from '../services/partnership.service.js';

export async function handleCreatePartnership(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const proposal = await partnershipService.createPartnershipProposal(req.body);

    res.status(201).json({
      success: true,
      message: 'Proposta de parceria enviada com sucesso.',
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
}
