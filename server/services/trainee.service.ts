import { prisma } from '../prisma.js';
import { CreateTraineeDTO } from '../validators/trainee.validator.js';

export async function createTraineeApplication(data: CreateTraineeDTO) {
  const application = await prisma.traineeApplication.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: data.course,
      period: data.period,
      areaOfInterest: data.areaOfInterest,
      motivation: data.motivation,
      type: data.type || 'trainee',
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      course: true,
      period: true,
      areaOfInterest: true,
      motivation: true,
      type: true,
      status: true,
      createdAt: true,
    },
  });

  return application;
}
