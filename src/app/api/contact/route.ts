import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        status: 'pending'
      }
    });

    // Log to console (for demo purposes)
    console.log('New contact message:', message);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        data: message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ 
      data: messages,
      success: true 
    });
  } catch (error) {
    console.error('Contact messages API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}
