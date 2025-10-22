import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const client = await prisma.client.update({
      where: { id },
      data: {
        name: body.name || undefined,
        logo: body.logo || undefined
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.client.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Client deleted'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
