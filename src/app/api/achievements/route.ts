import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany();
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Achievements API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
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

    const achievement = await prisma.achievement.create({
      data: { title, image }
    });

    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    console.error('Create achievement error:', error);
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    );
  }
}
