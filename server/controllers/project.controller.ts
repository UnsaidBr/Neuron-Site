import { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/project.service.js';

export async function handleGetProjects(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}
