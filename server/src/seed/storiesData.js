// Seeded from the one available real contributor account, split across the three
// Story display modes per the master spec. Author identity is intentionally left
// generic (no invented name/origin/programme) - more contributors are meant to be
// added for real via the admin dashboard, not fabricated here.
const storiesData = [
  // --- reflection ---
  {
    author: "Contributor",
    body: "Landing here, the first thing that struck me wasn't the weather or the food - it was how differently people communicate. Nobody tells you something is wrong outright; you have to learn to hear the 'we'll sort it' for what it actually means. It took weeks to stop taking things at face value.",
    themes: ["people-in-ireland"],
    featuredQuote: "You have to learn to hear the 'we'll sort it' for what it actually means.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "I was warned about the rain and thought I was prepared. I wasn't. It's less about heavy downpours and more a constant, low-grade dampness that gets into everything - your shoes, your mood, your plans. Being honest about that upfront would have saved me a lot of frustration in the first month.",
    themes: ["activities"],
    featuredQuote: "It's less about heavy downpours and more a constant, low-grade dampness that gets into everything.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "What actually got me through the first few weeks wasn't a checklist, it was people. A classmate who noticed I was eating lunch alone and just sat down. A neighbour who explained the bins without making me feel stupid for asking twice. Small, unasked-for warmth, repeated, is what made this feel survivable before it felt good.",
    themes: ["before-you-leave"],
    featuredQuote: "Small, unasked-for warmth, repeated, is what made this feel survivable before it felt good.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "Summer changed everything for me. The city felt like a different place once the evenings got long and everyone spilled outdoors - parks, pub gardens, random football games. That's when it stopped feeling like I was surviving somewhere new and started feeling like I actually lived here.",
    themes: ["getting-started"],
    featuredQuote: "That's when it stopped feeling like I was surviving somewhere new and started feeling like I actually lived here.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "Nobody hands you the answers here the way they might back home - a lot more is discussion-based, and you're expected to argue a position, not just recite one. It rattled me at first because I thought I was doing something wrong by not having a 'correct' answer memorised. I wasn't; I just hadn't adjusted yet.",
    themes: ["university-support"],
    featuredQuote: "I thought I was doing something wrong by not having a 'correct' answer memorised. I wasn't; I just hadn't adjusted yet.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "I want to be honest that the housing stress doesn't fully go away after move-in - it's not just a pre-arrival problem. Rent increases, lease renewals, and housemates moving out mid-year keep it a live concern well into your second and third semester, not something you solve once and forget.",
    themes: ["accommodation"],
    featuredQuote: "The housing stress doesn't fully go away after move-in - it's not just a pre-arrival problem.",
    displayMode: "reflection",
    status: "published",
  },
  {
    author: "Contributor",
    body: "Looking back, this wasn't just a logistics exercise - visas, accounts, registrations - it was one of the most transformative chapters of my life so far. The hard parts were real, but so was everything I gained: independence, a wider sense of what 'home' can mean, and people I wouldn't have met any other way.",
    themes: [],
    featuredQuote: "This wasn't just a logistics exercise - it was one of the most transformative chapters of my life so far.",
    displayMode: "reflection",
    status: "published",
  },

  // --- must-do ---
  {
    author: "Contributor",
    body: "Join the Facebook and WhatsApp student housing groups for your city before you even book your flight. Listings move fast once the season picks up, and being in the groups early means you see rooms before they're gone, not after.",
    themes: ["before-you-leave", "accommodation"],
    featuredQuote: "Good listings move fast once the season picks up - being in the groups early is the whole advantage.",
    displayMode: "must-do",
    status: "published",
  },
  {
    author: "Contributor",
    body: "Get your Student Leap Card sorted in your first week, not 'eventually'. Every full-fare bus and train ride before you get it is money you'll wish you'd saved, and the discount adds up fast once you're commuting daily.",
    themes: ["transport", "getting-started"],
    featuredQuote: "Every full-fare ride before you get the card is money you'll wish you'd saved.",
    displayMode: "must-do",
    status: "published",
    lastVerified: new Date(),
  },
  {
    author: "Contributor",
    body: "Cook at home as much as you can. I kept my grocery spend to roughly €160-200 a month by meal-planning and sticking to Lidl/Aldi for basics, and it made the single biggest difference to my budget of anything I did - bigger than any one-off saving.",
    themes: ["food-groceries", "banking-money"],
    featuredQuote: "It made the single biggest difference to my budget of anything I did - bigger than any one-off saving.",
    displayMode: "must-do",
    status: "published",
    lastVerified: new Date(),
  },
  {
    author: "Contributor",
    body: "Actually leave the city on your free weekends. It's easy to let a whole semester pass without seeing anything past your own neighbourhood - a cheap train ticket and one free Saturday is often all it takes, and it resets you for the week ahead better than staying in ever does.",
    themes: ["activities"],
    featuredQuote: "A cheap train ticket and one free Saturday resets you for the week ahead better than staying in ever does.",
    displayMode: "must-do",
    status: "published",
  },
  {
    author: "Contributor",
    body: "Go to Dún Laoghaire, walk the pier, and get ice cream from Teddy's at the end of it. It sounds small, but it's the single most-recommended low-cost outing I give to anyone visiting or newly arrived - easy to reach, free to do (bar the ice cream), and it never gets old.",
    themes: ["activities"],
    featuredQuote: "Easy to reach, free to do (bar the ice cream), and it never gets old.",
    displayMode: "must-do",
    status: "published",
  },

  // --- testimonial ---
  {
    author: "Contributor",
    body: "If I'm having a rough week, my move is always the same: the DART out to Dún Laoghaire, a walk the full length of the pier no matter the weather, and a 99 from Teddy's on the way back. It's not exciting, but it's mine, and it's how I unwind more than anything else here.",
    themes: ["activities"],
    featuredQuote: "The DART out to Dún Laoghaire, a walk the full length of the pier, and a 99 from Teddy's - that's how I unwind.",
    displayMode: "testimonial",
    status: "published",
  },
];

module.exports = storiesData;
