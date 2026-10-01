import { prisma } from '../prisma.js';

export async function getAllPublications() {
  const publications = await prisma.publication.findMany({
    include: {
      project: {
        select: {
          title: true,
        },
      },
    },
    orderBy: [{ year: 'desc' }, { title: 'asc' }],
  });

  // Normalize response with projectTitle derived from Project relation
  return publications.map((pub) => ({
    id: pub.id,
    title: pub.title,
    authors: pub.authors,
    venue: pub.venue,
    year: pub.year,
    projectId: pub.projectId,
    projectTitle: pub.project?.title || '',
    type: pub.type,
    typeLabel: pub.typeLabel,
    abstract: pub.abstract,
    tags: pub.tags,
    link: pub.link,
    badge: pub.badge,
    createdAt: pub.createdAt,
    updatedAt: pub.updatedAt,
  }));
}
