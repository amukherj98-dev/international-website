// Fallback cached articles shown when NEWS_API_KEY isn't configured or the live
// fetch fails, so the News page is never empty. These point to real, stable
// homepages/sections rather than fabricated specific headlines.
const newsFallbackData = [
  {
    title: "Irish Immigration Service - latest updates",
    url: "https://www.irishimmigration.ie/",
    sourceName: "Immigration Service Delivery",
    description: "Official updates on visas, IRP registration, and immigration permissions in Ireland.",
    category: "visa-immigration",
    publishedAt: new Date(),
  },
  {
    title: "Citizens Information - housing and renting",
    url: "https://www.citizensinformation.ie/en/housing/renting-a-home/",
    sourceName: "Citizens Information",
    description: "Guidance on renting, tenant rights, and housing supports in Ireland.",
    category: "accommodation",
    publishedAt: new Date(),
  },
  {
    title: "Workplace Relations Commission - employment rights updates",
    url: "https://www.workplacerelations.ie/en/news-media/",
    sourceName: "Workplace Relations Commission",
    description: "News on employment law, minimum wage, and workplace regulation changes in Ireland.",
    category: "employment",
    publishedAt: new Date(),
  },
  {
    title: "Irish Human Rights and Equality Commission - news",
    url: "https://www.ihrec.ie/news/",
    sourceName: "IHREC",
    description: "News and reports on equality, racism, and discrimination issues in Ireland.",
    category: "racism-discrimination",
    publishedAt: new Date(),
  },
  {
    title: "RTÉ News - Ireland",
    url: "https://www.rte.ie/news/ireland/",
    sourceName: "RTÉ News",
    description: "General national news coverage relevant to life in Ireland.",
    category: "general",
    publishedAt: new Date(),
  },
];

module.exports = newsFallbackData;
