import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const documents = await prisma.legalDocument.findMany();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Legal documents API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, image } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image' },
        { status: 400 }
      );
    }

    const document = await prisma.legalDocument.create({
      data: { title, image }
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Create legal document error:', error);
    return NextResponse.json(
      { error: 'Failed to create legal document' },
      { status: 500 }
    );
  }
}
