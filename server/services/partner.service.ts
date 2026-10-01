import { prisma } from '../prisma.js';

export async function getAllPartners() {
  const partners = await prisma.partner.findMany({
    orderBy: { name: 'asc' },
  });

  return partners;
}
