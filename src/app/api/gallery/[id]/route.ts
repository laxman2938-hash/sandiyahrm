import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Gallery detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const image = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: body.title || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Update gallery image error:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.galleryImage.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Gallery image deleted'
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
