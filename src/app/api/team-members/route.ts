import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    return NextResponse.json({ 
      data: teamMembers,
      success: true 
    });
  } catch (error) {
    console.error('Team members API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, designation, image } = body;

    if (!name || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: name, image' },
        { status: 400 }
      );
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        designation: designation || null,
        image
      }
    });

    return NextResponse.json({ 
      data: teamMember,
      success: true 
    }, { status: 201 });
  } catch (error) {
    console.error('Create team member error:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
