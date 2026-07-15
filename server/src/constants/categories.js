// The 16-category content taxonomy for Guide topics, front-loaded by urgency
// (pre-arrival -> settling in -> daily life -> belonging & beyond).
const GUIDE_CATEGORIES = [
  { slug: "before-you-leave", label: "Before You Leave" },
  { slug: "getting-started", label: "Getting Started" },
  { slug: "visa-immigration", label: "Visa & Immigration" },
  { slug: "accommodation", label: "Accommodation" },
  { slug: "health-insurance", label: "Health & Insurance" },
  { slug: "banking-money", label: "Banking & Money" },
  { slug: "transport", label: "Transport" },
  { slug: "phone-connectivity", label: "Phone & Connectivity" },
  { slug: "working-part-time", label: "Working Part-Time" },
  { slug: "food-groceries", label: "Food, Groceries & Cheap Eats" },
  { slug: "people-in-ireland", label: "People in Ireland" },
  { slug: "dos-donts-rights", label: "Dos, Don'ts & Your Rights" },
  { slug: "community-social", label: "Community & Social Life" },
  { slug: "activities", label: "Activities & Getting Out of the City" },
  { slug: "safety-emergencies", label: "Safety & Emergencies" },
  { slug: "university-support", label: "University Support Services" },
];

const GUIDE_CATEGORY_SLUGS = GUIDE_CATEGORIES.map((c) => c.slug);

// Grouping for the Navbar mega-menu - 4 clusters instead of a flat 16-item list.
const GUIDE_CATEGORY_CLUSTERS = [
  { label: "Before Arrival", slugs: ["before-you-leave"] },
  {
    label: "Settling In",
    slugs: ["getting-started", "visa-immigration", "accommodation", "health-insurance", "banking-money"],
  },
  {
    label: "Daily Life",
    slugs: ["transport", "phone-connectivity", "working-part-time", "food-groceries"],
  },
  {
    label: "Belonging & Beyond",
    slugs: [
      "people-in-ireland",
      "dos-donts-rights",
      "community-social",
      "activities",
      "safety-emergencies",
      "university-support",
    ],
  },
];

// News & Updates spans a broader set of topics than just discrimination.
const NEWS_CATEGORIES = [
  { slug: "visa-immigration", label: "Visa & Immigration" },
  { slug: "accommodation", label: "Housing & Accommodation" },
  { slug: "employment", label: "Employment & Regulation" },
  { slug: "racism-discrimination", label: "Racism & Discrimination" },
  { slug: "general", label: "General Student Life" },
];

const NEWS_CATEGORY_SLUGS = NEWS_CATEGORIES.map((c) => c.slug);

// Community submissions reuse guide categories plus a couple of story-only topics.
const SUBMISSION_CATEGORIES = [
  ...GUIDE_CATEGORIES.filter((c) => c.slug !== "getting-started"),
  { slug: "racism-discrimination", label: "Racism & Discrimination" },
  { slug: "general", label: "General Experience" },
];

const SUBMISSION_CATEGORY_SLUGS = SUBMISSION_CATEGORIES.map((c) => c.slug);

module.exports = {
  GUIDE_CATEGORIES,
  GUIDE_CATEGORY_SLUGS,
  GUIDE_CATEGORY_CLUSTERS,
  NEWS_CATEGORIES,
  NEWS_CATEGORY_SLUGS,
  SUBMISSION_CATEGORIES,
  SUBMISSION_CATEGORY_SLUGS,
};
