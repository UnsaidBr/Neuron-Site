import { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contact.service.js';

export async function handleCreateContact(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const contact = await contactService.createContactMessage(req.body);

    res.status(201).json({
      success: true,
      message: 'Mensagem de contato enviada com sucesso.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}
