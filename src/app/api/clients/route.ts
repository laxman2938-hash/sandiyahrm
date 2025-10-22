import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Clients API error:', error);
    
    // Fallback mock data
    const mockClients = [
      {
        id: 1,
        name: 'Global Tech Solutions',
        logo: 'https://via.placeholder.com/200x100?text=Global+Tech',
        description: { en: 'Leading tech company', np: 'प्रमुख प्रযुक्ति कंपनी' },
        website: 'https://example.com',
        since: 2015
      },
      {
        id: 2,
        name: 'International Hospitality',
        logo: 'https://via.placeholder.com/200x100?text=Hospitality',
        description: { en: 'Hospitality services provider', np: 'आतिथ्य सेवा प्रदानकर्ता' },
        website: 'https://example.com',
        since: 2016
      },
    ];
    
    return NextResponse.json({ 
      data: mockClients,
      success: true 
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, logo } = body;

    if (!name || !logo) {
      return NextResponse.json(
        { error: 'Missing required fields: name, logo' },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: { name, logo }
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
