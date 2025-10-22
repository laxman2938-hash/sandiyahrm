import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const demandLetters = await prisma.demandLetter.findMany();
    return NextResponse.json(demandLetters);
  } catch (error) {
    console.error('Demand letters API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demand letters' },
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

    const demandLetter = await prisma.demandLetter.create({
      data: { title, image }
    });

    return NextResponse.json(demandLetter, { status: 201 });
  } catch (error) {
    console.error('Create demand letter error:', error);
    return NextResponse.json(
      { error: 'Failed to create demand letter' },
      { status: 500 }
    );
  }
}
