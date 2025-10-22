import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, photo, description } = body;

    if (!name || !position) {
      return NextResponse.json(
        { error: 'Missing required fields: name, position' },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        position,
        photo: photo || null,
        description: description || null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
