import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);
    const achievement = await prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Achievement detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievement' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();

    const achievement = await prisma.achievement.update({
      where: { id },
      data: {
        title: body.title || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Update achievement error:', error);
    return NextResponse.json(
      { error: 'Failed to update achievement' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);

    await prisma.achievement.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Achievement deleted'
    });
  } catch (error) {
    console.error('Delete achievement error:', error);
    return NextResponse.json(
      { error: 'Failed to delete achievement' },
      { status: 500 }
    );
  }
}
