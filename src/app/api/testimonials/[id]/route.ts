import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name || undefined,
        position: body.position || undefined,
        photo: body.photo || undefined,
        description: body.description || undefined,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
