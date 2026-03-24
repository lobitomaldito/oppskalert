import { supabase } from './supabase';

export async function uploadImages(files, submissionId) {
  const urls = [];
  for (const file of files) {
    const ext = file.name.split('.').pop();
    const path = `${submissionId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from('speaker-assets')
      .upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('speaker-assets').getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}
