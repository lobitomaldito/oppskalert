import { supabase } from './supabase';
import { uploadImages } from './uploadImages';

export async function submitIntake(formData, imageFiles) {
  // Insert row first to get the ID
  const { data, error } = await supabase
    .from('speaker_intake_submissions')
    .insert([{
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      talerlisten_url: formData.talerlistenUrl,
      existing_website: formData.existingWebsite,
      linkedin_url: formData.linkedinUrl,
      identity_labels: formData.identityLabels,
      positioning: formData.positioning,
      signature_concept: formData.signatureConcept,
      target_audience: formData.targetAudience,
      red_thread: formData.redThread,
      topics: formData.topics,
      hero_video_url: formData.heroVideoUrl,
      extra_video_urls: formData.extraVideoUrls,
      talerlisten_rating: formData.talerlistenRating,
      stat_events: formData.statEvents,
      stat_audience: formData.statAudience,
      stat_satisfaction: formData.statSatisfaction,
      media_mentions: formData.mediaMentions,
      book: formData.book,
      testimonials: formData.testimonials,
      aesthetic_preset: formData.aestheticPreset,
      brand_color: formData.brandColor,
      cta_text: formData.ctaText,
      booking_url: formData.bookingUrl,
      extra_notes: formData.extraNotes,
      status: 'new',
    }])
    .select()
    .single();

  if (error) throw error;

  const submissionId = data.id;

  // Upload images if any
  let imageUrls = [];
  if (imageFiles && imageFiles.length > 0) {
    imageUrls = await uploadImages(imageFiles, submissionId);
    await supabase
      .from('speaker_intake_submissions')
      .update({ image_urls: imageUrls })
      .eq('id', submissionId);
  }

  return { ...data, image_urls: imageUrls };
}
