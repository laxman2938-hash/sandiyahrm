import { NextResponse } from 'next/server';
import { saveImageToStorage } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Save image using storage abstraction (Vercel Blob in prod, local in dev)
    const publicUrl = await saveImageToStorage(file, `uploads/${folder}`);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
