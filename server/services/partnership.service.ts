import { prisma } from '../prisma.js';
import { CreatePartnershipDTO } from '../validators/partnership.validator.js';

export async function createPartnershipProposal(data: CreatePartnershipDTO) {
  const proposal = await prisma.partnershipProposal.create({
    data: {
      name: data.name,
      email: data.email,
      institution: data.institution,
      type: data.type,
      scope: data.scope,
    },
    select: {
      id: true,
      name: true,
      email: true,
      institution: true,
      type: true,
      scope: true,
      status: true,
      createdAt: true,
    },
  });

  return proposal;
}
