import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, image } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image' },
        { status: 400 }
      );
    }

    const newImage = await prisma.galleryImage.create({
      data: { title, image }
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('Gallery POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
