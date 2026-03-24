export function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateStep1(data) {
  const errors = {};
  if (!data.fullName?.trim()) errors.fullName = 'Påkrevd';
  if (!data.email?.trim()) errors.email = 'Påkrevd';
  else if (!isValidEmail(data.email)) errors.email = 'Ugyldig e-postadresse';
  if (!data.talerlistenUrl?.trim()) errors.talerlistenUrl = 'Påkrevd';
  else if (!isValidUrl(data.talerlistenUrl)) errors.talerlistenUrl = 'Ugyldig URL';
  if (data.existingWebsite && !isValidUrl(data.existingWebsite)) errors.existingWebsite = 'Ugyldig URL';
  if (data.linkedinUrl && !isValidUrl(data.linkedinUrl)) errors.linkedinUrl = 'Ugyldig URL';
  return errors;
}

export function validateStep2(data) {
  const errors = {};
  if (!data.identityLabels?.length) errors.identityLabels = 'Legg til minst én etikett';
  if (!data.positioning?.trim()) errors.positioning = 'Påkrevd';
  if (!data.targetAudience?.length) errors.targetAudience = 'Legg til minst én målgruppe';
  return errors;
}

export function validateStep3(data) {
  const errors = {};
  if (!data.topics?.length || !data.topics[0]?.title?.trim()) errors.topics = 'Minst ett foredragstema er påkrevd';
  return errors;
}

export function validateStep4(data) {
  const errors = {};
  if (!data.heroVideoUrl?.trim()) errors.heroVideoUrl = 'Påkrevd';
  else if (!isValidUrl(data.heroVideoUrl)) errors.heroVideoUrl = 'Ugyldig URL';
  return errors;
}

export function validateStep5(data) {
  const errors = {};
  if (!data.aestheticPreset) errors.aestheticPreset = 'Velg et estetikkvalg';
  if (!data.ctaText?.trim()) errors.ctaText = 'Påkrevd';
  return errors;
}
