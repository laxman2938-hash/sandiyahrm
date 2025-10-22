import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const letter = await prisma.demandLetter.update({
      where: { id },
      data: {
        title: body.title || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json(letter);
  } catch (error) {
    console.error('Update demand letter error:', error);
    return NextResponse.json(
      { error: 'Failed to update demand letter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.demandLetter.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Demand letter deleted'
    });
  } catch (error) {
    console.error('Delete demand letter error:', error);
    return NextResponse.json(
      { error: 'Failed to delete demand letter' },
      { status: 500 }
    );
  }
}
