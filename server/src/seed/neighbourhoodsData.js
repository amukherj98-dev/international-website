// safetyRating is general orientation guidance for newcomers, not an official
// crime statistic - see the CSO source link on each entry for real data.
const src = (label, url) => ({ label, url });

const neighbourhoodsData = [
  {
    name: "Rathmines",
    city: "Dublin",
    description:
      "A busy, walkable south Dublin suburb popular with students for its mix of affordable-ish shared houses, cafes, and quick bus/Luas access into the city centre and several universities.",
    safetyRating: 4,
    costOfLiving: "high",
    transitAccess: "Excellent - multiple bus routes and a short walk to Ranelagh Luas stop; ~20-30 min to most Dublin campuses.",
    studentPopulation: "Large - one of Dublin's most established student and young-professional areas.",
    pros: ["Very walkable", "Lots of cafes and shops", "Good transport links", "Close to Dublin city centre"],
    cons: ["Higher rent than outer suburbs", "Can be noisy at night near main streets"],
    sources: [
      src("Daft.ie - Rathmines listings", "https://www.daft.ie/"),
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
    ],
  },
  {
    name: "Victoria Cross / Western Road",
    city: "Cork",
    description:
      "The area immediately around University College Cork, with a high concentration of student housing, affordable eateries, and a short walk to campus and the city centre.",
    safetyRating: 4,
    costOfLiving: "medium",
    transitAccess: "Good - walkable to UCC campus and Cork city centre; regular city bus routes nearby.",
    studentPopulation: "Very high - the primary student residential area for UCC.",
    pros: ["Walk to campus", "Affordable relative to Dublin", "Strong student community"],
    cons: ["Housing can be dated", "High demand means limited availability at peak times"],
    sources: [
      src("UCC Accommodation Office", "https://www.ucc.ie/en/accommodation/"),
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
    ],
  },
  {
    name: "Salthill",
    city: "Galway",
    description:
      "A seaside suburb of Galway city with a promenade, popular among students who want a slightly quieter residential feel while staying close to the city and University of Galway.",
    safetyRating: 4,
    costOfLiving: "medium",
    transitAccess: "Good - regular city bus routes to University of Galway and city centre; ~20-25 min walk or short bus ride.",
    studentPopulation: "Moderate - mixed with families and long-term residents alongside students.",
    pros: ["Seafront promenade", "Quieter than city centre", "Good local amenities"],
    cons: ["Slightly further from campus than city-centre options", "Can be windy/exposed in winter"],
    sources: [
      src("University of Galway Accommodation Office", "https://www.universityofgalway.ie/accommodation/"),
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
    ],
  },
  {
    name: "Castletroy",
    city: "Limerick",
    description:
      "A suburb adjacent to the University of Limerick campus, with a large share of dedicated student accommodation, a shopping centre, and easy campus access.",
    safetyRating: 4,
    costOfLiving: "medium",
    transitAccess: "Very good - many student residences are within walking distance of UL; local bus routes connect to Limerick city centre.",
    studentPopulation: "Very high - largely built around the university population.",
    pros: ["Purpose-built student accommodation", "Close to campus", "Shopping centre nearby"],
    cons: ["Less city-centre nightlife/culture on the doorstep", "Quieter outside term time"],
    sources: [
      src("University of Limerick Accommodation", "https://www.ul.ie/students/accommodation"),
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
    ],
  },
  {
    name: "City Centre (near SETU)",
    city: "Waterford",
    description:
      "Waterford's compact city centre, walkable to South East Technological University's city campus, with generally lower living costs than Ireland's larger cities.",
    safetyRating: 4,
    costOfLiving: "low",
    transitAccess: "Good - compact city, most amenities and campus buildings within walking distance; local bus routes for outer areas.",
    studentPopulation: "Moderate - growing student population as SETU expands.",
    pros: ["Lower cost of living than Dublin/Cork/Galway", "Compact and walkable", "Friendly, smaller-city feel"],
    cons: ["Fewer part-time job listings than bigger cities", "Smaller international student community"],
    sources: [
      src("SETU Accommodation", "https://www.setu.ie/"),
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
    ],
  },
];

module.exports = neighbourhoodsData;
