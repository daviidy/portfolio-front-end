// Single place for homepage conversion + positioning constants.
export const BOOKING_URL =
  "https://calendly.com/iamgratefulandwealthy/30min?month=2026-11";

export const CONTACT_FALLBACK = "mailto:nda.yao94@gmail.com?subject=Book%20a%20call";

export const bookingHref = BOOKING_URL || CONTACT_FALLBACK;

// Lead capture for gated resources. Posts to an Inbound Webhook workflow in the
// Insiders CRM (creates the contact, tags it, starts the follow-up).
// Leave empty until the workflow exists: the gate then still unlocks, and logs a warning.
export const LEAD_WEBHOOK_URL = "";
