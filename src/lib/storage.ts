import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function saveImageToStorage(file: File, folder = 'uploads'): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const safeName = file.name?.replace(/[^a-zA-Z0-9.-]/g, '_') || 'upload.bin';
  const filename = `${timestamp}-${safeName}`;

  // Prefer Supabase Storage when configured
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_BUCKET || 'uploads';

  if (supabaseUrl && supabaseServiceKey) {
    const supabase = getSupabaseAdmin();

    // Normalize key path inside the bucket
    const keyFolder = folder
      .replace(/^\/+/, '')
      .replace(/^uploads\//, '')
      .trim();
    const objectKey = keyFolder ? `${keyFolder}/${filename}` : filename;

    // Ensure bucket exists (idempotent)
    try {
      // Will succeed only if using service role key
      await supabase.storage.createBucket(bucket, { public: true });
    } catch (_) {
      // ignore if exists or if not permitted
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectKey, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(objectKey);
    return data.publicUrl;
  }

  // Fallback: local filesystem (works in dev, not on Vercel runtime)
  const uploadDir = join(process.cwd(), 'public', folder);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);
  return `/${folder}/${filename}`;
}
