import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  });

  if (!article) {
    return NextResponse.json({ error: 'article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
