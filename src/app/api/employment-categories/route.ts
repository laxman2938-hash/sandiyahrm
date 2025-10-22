import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.employmentCategory.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Employment categories API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employment categories' },
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

    const category = await prisma.employmentCategory.create({
      data: { title, image }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Create employment category error:', error);
    return NextResponse.json(
      { error: 'Failed to create employment category' },
      { status: 500 }
    );
  }
}
