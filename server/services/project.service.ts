import { prisma } from '../prisma.js';

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { year: 'desc' }, { title: 'asc' }],
  });

  return projects;
}
