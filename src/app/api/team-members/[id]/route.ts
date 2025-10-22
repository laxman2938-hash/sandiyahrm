import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name || undefined,
        designation: body.designation || undefined,
        image: body.image || undefined
      }
    });

    return NextResponse.json({ 
      data: member,
      success: true 
    });
  } catch (error) {
    console.error('Update team member error:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = parseInt(params.id);

    await prisma.teamMember.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Team member deleted'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
