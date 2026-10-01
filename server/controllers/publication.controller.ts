import { Request, Response, NextFunction } from 'express';
import * as publicationService from '../services/publication.service.js';

export async function handleGetPublications(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const publications = await publicationService.getAllPublications();

    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications,
    });
  } catch (error) {
    next(error);
  }
}
