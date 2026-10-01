import { Request, Response, NextFunction } from 'express';
import * as partnerService from '../services/partner.service.js';

export async function handleGetPartners(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const partners = await partnerService.getAllPartners();

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners,
    });
  } catch (error) {
    next(error);
  }
}
