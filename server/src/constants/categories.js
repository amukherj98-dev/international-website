// The 12-category content taxonomy for Guide topics (homepage "Getting Started" is category #12).
const GUIDE_CATEGORIES = [
  { slug: "visa-immigration", label: "Visa & Immigration" },
  { slug: "accommodation", label: "Accommodation" },
  { slug: "health-insurance", label: "Health & Insurance" },
  { slug: "banking-money", label: "Banking & Money" },
  { slug: "transport", label: "Transport" },
  { slug: "phone-connectivity", label: "Phone & Connectivity" },
  { slug: "working-part-time", label: "Working Part-Time" },
  { slug: "food-groceries", label: "Food, Groceries & Cheap Eats" },
  { slug: "community-social", label: "Community & Social Life" },
  { slug: "safety-emergencies", label: "Safety & Emergencies" },
  { slug: "university-support", label: "University Support Services" },
  { slug: "getting-started", label: "Getting Started" },
];

const GUIDE_CATEGORY_SLUGS = GUIDE_CATEGORIES.map((c) => c.slug);

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
  NEWS_CATEGORIES,
  NEWS_CATEGORY_SLUGS,
  SUBMISSION_CATEGORIES,
  SUBMISSION_CATEGORY_SLUGS,
};
