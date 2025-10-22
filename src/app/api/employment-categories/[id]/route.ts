import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const id = parseInt(params.id);
    const category = await prisma.employmentCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Employment category detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employment category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const category = await prisma.employmentCategory.update({
      where: { id },
      data: {
        title: body.title || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Update employment category error:', error);
    return NextResponse.json(
      { error: 'Failed to update employment category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.employmentCategory.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Employment category deleted'
    });
  } catch (error) {
    console.error('Delete employment category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete employment category' },
      { status: 500 }
    );
  }
}
