import { Request, Response, NextFunction } from 'express';
import * as traineeService from '../services/trainee.service.js';

export async function handleCreateTrainee(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const application = await traineeService.createTraineeApplication(req.body);

    res.status(201).json({
      success: true,
      message: 'Candidatura de trainee enviada com sucesso.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
}
