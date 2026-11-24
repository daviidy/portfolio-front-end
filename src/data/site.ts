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

// Retirement Plan Workshop (in-person). Local visitors RSVP via the CRM form;
// anyone farther than WORKSHOP_RADIUS_MILES is sent to a one-on-one call instead.
export const WORKSHOP_FORM_ID = "HcyA4YgSLIAiTli1vhEY";
export const WORKSHOP_FORM_SRC = `https://apps.iulinsiders.com/widget/form/${WORKSHOP_FORM_ID}`;
// Brandywine Hundred Library, 1300 Foulk Rd, Wilmington, DE 19803
export const WORKSHOP_LAT = 39.8036;
export const WORKSHOP_LNG = -75.5411;
// ~45 minutes of driving is roughly 35 miles in a straight line.
export const WORKSHOP_RADIUS_MILES = 35;

// Wealth-roadmap freebie
export const ROADMAP_BOOKING_URL = "https://calendly.com/yaodavidarmel/1-1-david-yao";
// GoHighLevel (Insiders CRM) form embed. Filled in once the form is created.
export const ROADMAP_FORM_ID = "sDooGBXPyls01t83d23k";
export const ROADMAP_FORM_URL = `https://app.iulinsiders.com/widget/form/${ROADMAP_FORM_ID}`;
