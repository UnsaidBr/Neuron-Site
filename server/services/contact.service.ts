import { prisma } from '../prisma.js';
import { CreateContactDTO } from '../validators/contact.validator.js';

export async function createContactMessage(data: CreateContactDTO) {
  const contact = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      institution: data.institution || null,
      phone: data.phone || null,
      subject: data.subject,
      topic: data.topic || 'parceria',
      message: data.message,
    },
    select: {
      id: true,
      name: true,
      email: true,
      institution: true,
      phone: true,
      subject: true,
      topic: true,
      message: true,
      status: true,
      createdAt: true,
    },
  });

  return contact;
}
