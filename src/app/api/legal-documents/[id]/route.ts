import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);
    const document = await prisma.legalDocument.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Legal document detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal document' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const document = await prisma.legalDocument.update({
      where: { id },
      data: {
        title: body.title || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Update legal document error:', error);
    return NextResponse.json(
      { error: 'Failed to update legal document' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.legalDocument.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Legal document deleted'
    });
  } catch (error) {
    console.error('Delete legal document error:', error);
    return NextResponse.json(
      { error: 'Failed to delete legal document' },
      { status: 500 }
    );
  }
}
