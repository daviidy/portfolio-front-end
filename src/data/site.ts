// Single place for homepage conversion + positioning constants.
export const BOOKING_URL =
  "https://calendly.com/iamgratefulandwealthy/30min?month=2026-11";

export const CONTACT_FALLBACK = "mailto:nda.yao94@gmail.com?subject=Book%20a%20call";

export const bookingHref = BOOKING_URL || CONTACT_FALLBACK;

// Lead capture for gated resources: an Insiders CRM form embedded on the page.
// Its "On submit" action redirects to <page>?access=granted, which unlocks the resource.
export const CRM_FORM_ID = "gSlUJsOQllsEM41znuU3";
export const CRM_FORM_SRC = `https://apps.iulinsiders.com/widget/form/${CRM_FORM_ID}`;
export const CRM_FORM_SCRIPT = "https://apps.iulinsiders.com/js/form_embed.js";
