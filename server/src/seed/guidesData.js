// Seed content for the 12-category taxonomy. Summaries are intentionally concise
// starting points with a credible source citation each - meant to be expanded
// later via the admin dashboard, not exhaustive guides.
const src = (label, url) => ({ label, url });

const guidesData = [
  // 1. Visa & Immigration
  {
    category: "visa-immigration",
    title: "Study visa basics (types, application)",
    summary:
      "Non-EEA students on courses longer than 90 days generally need a 'D' study visa, applied for online via AVATS before travel with proof of course enrolment, funds, and private medical insurance. EU/EEA/Swiss students do not need a visa to study in Ireland.",
    sources: [src("Irish Immigration - Coming to study", "https://www.irishimmigration.ie/coming-to-study-in-ireland/")],
    tags: ["visa", "study visa", "AVATS"],
  },
  {
    category: "visa-immigration",
    title: "IRP registration (Immigration Service Delivery, €300 fee)",
    summary:
      "Non-EEA students must register with Irish immigration within 90 days of arrival to get an Irish Residence Permit (IRP) card, costing €300 and usually valid for the length of the course (renewed up to 12 months at a time). Much of this is now done online through the Immigration Service Delivery (ISD) portal.",
    sources: [src("Irish Immigration - Registering your permission", "https://www.irishimmigration.ie/registering-your-immigration-permission/")],
    tags: ["IRP", "registration", "immigration"],
  },
  {
    category: "visa-immigration",
    title: "Stamp 2 explained",
    summary:
      "Stamp 2 is the immigration permission given to full-time non-EEA students on eligible courses (on the Interim List of Eligible Programmes). It permits part-time work of up to 20 hours per week during term and up to 40 hours per week during official college holidays.",
    sources: [src("Citizens Information - Working while studying", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/visas-and-residence-in-ireland/")],
    tags: ["stamp 2", "work rights"],
  },
  {
    category: "visa-immigration",
    title: "PPS number (how and where to get it)",
    summary:
      "A Personal Public Service (PPS) number is required to work, pay tax, or access certain services in Ireland. Apply online via MyWelfare.ie, proving your identity and Irish address as part of the process.",
    sources: [src("MyWelfare - Apply for a PPS Number", "https://www.mywelfare.ie/")],
    tags: ["PPS number", "welfare"],
  },
  {
    category: "visa-immigration",
    title: "First 30 days checklist",
    summary:
      "In your first month, prioritise: registering your IRP (if required), applying for a PPS number, opening a bank account, registering with a GP, and getting a Leap card. Most of these need a confirmed Irish address first.",
    sources: [src("Citizens Information - Moving to Ireland", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/")],
    tags: ["checklist", "first month"],
  },
  {
    category: "visa-immigration",
    title: "Visa renewal / extensions",
    summary:
      "If your course runs longer than your current immigration permission, renew your IRP registration online before it expires, confirming continued enrolment and your current address.",
    sources: [src("Irish Immigration - Renewing your permission", "https://www.irishimmigration.ie/registering-your-immigration-permission/")],
    tags: ["renewal", "extension"],
  },

  // 2. Accommodation
  {
    category: "accommodation",
    title: "Housing types (PBSA, digs, house shares, on-campus)",
    summary:
      "Options range from purpose-built student accommodation (PBSA, usually en-suite with bills included) to 'digs' (a room in a family home, sometimes with meals), private house/apartment shares, and university-run on-campus halls - each with different cost, contract length, and independence trade-offs.",
    sources: [src("Citizens Information - Accommodation for students", "https://www.citizensinformation.ie/en/education/third-level-education/going-to-college/accommodation-for-students/")],
    tags: ["housing types", "PBSA", "digs"],
  },
  {
    category: "accommodation",
    title: "Monthly price ranges by type and area",
    summary:
      "Dublin is Ireland's most expensive city for student housing, with PBSA and shared apartments commonly ranging from roughly €800-€1,400+ per month depending on room type; digs and shared houses outside Dublin (Cork, Galway, Limerick) tend to be more affordable. Check current listings for up-to-date pricing.",
    sources: [src("Daft.ie Rental Price Report", "https://www.daft.ie/report")],
    tags: ["rent prices", "cost"],
  },
  {
    category: "accommodation",
    title: "Where to search (daft.ie, rent.ie, university housing office)",
    summary:
      "Daft.ie and Rent.ie are Ireland's largest rental listing sites. Most universities also run a dedicated student accommodation office listing vetted digs and landlords specifically for their own students.",
    sources: [src("Daft.ie", "https://www.daft.ie/"), src("Rent.ie", "https://www.rent.ie/")],
    tags: ["listings", "search"],
  },
  {
    category: "accommodation",
    title: "Rental scam warnings and safety rules",
    summary:
      "Never transfer a deposit or rent before viewing a property in person or via a live video call and verifying the landlord's identity. A common scam involves a 'landlord' abroad requesting a wire transfer for a property they don't actually own or that doesn't exist.",
    sources: [src("Citizens Information - Avoiding rental scams", "https://www.citizensinformation.ie/en/housing/renting-a-home/")],
    tags: ["scams", "safety"],
  },
  {
    category: "accommodation",
    title: "Deposits, leases, and tenant rights basics",
    summary:
      "Landlords can generally ask for a deposit of up to one month's rent. Tenants are protected under the Residential Tenancies Act, and the Residential Tenancies Board (RTB) handles disputes over deposits, notice periods, and standards.",
    sources: [src("Residential Tenancies Board", "https://www.rtb.ie/")],
    tags: ["tenant rights", "deposit", "lease"],
  },
  {
    category: "accommodation",
    title: "Short-term / arrival options (hostels, temporary stays)",
    summary:
      "If your accommodation isn't ready when you land, hostels, short-let apartments, and some universities' short-stay guest rooms can bridge the gap for your first days or weeks while you house-hunt in person.",
    sources: [src("Citizens Information - Accommodation for students", "https://www.citizensinformation.ie/en/education/third-level-education/going-to-college/accommodation-for-students/")],
    tags: ["arrival", "temporary housing"],
  },

  // 3. Health & Insurance
  {
    category: "health-insurance",
    title: "Private health insurance (visa requirement, what qualifies, costs)",
    summary:
      "Non-EEA students are generally required to hold private medical insurance covering at least accident, illness, and a minimum level of hospital cover for the duration of their immigration permission. Typical student policies cost roughly €150-€400 per year.",
    sources: [src("Irish Immigration - Medical insurance requirement", "https://www.irishimmigration.ie/coming-to-study-in-ireland/")],
    tags: ["health insurance", "visa requirement"],
  },
  {
    category: "health-insurance",
    title: "EHIC for EU students",
    summary:
      "EU/EEA students can use their European Health Insurance Card (EHIC) to access necessary state healthcare in Ireland on the same basis as an insured Irish resident, covering most public healthcare needs during study.",
    sources: [src("HSE - EHIC", "https://www2.hse.ie/services/schemes-allowances/ehic/")],
    tags: ["EHIC", "EU students"],
  },
  {
    category: "health-insurance",
    title: "Registering with a GP",
    summary:
      "Without a medical card, you'll pay a standard consultation fee (commonly around €50-€65) to register with and visit a local GP practice. Many universities also partner with an on-campus or nearby GP practice for students.",
    sources: [src("HSE - Find a GP", "https://www2.hse.ie/services/gp-services/find-a-gp/")],
    tags: ["GP", "registration"],
  },
  {
    category: "health-insurance",
    title: "GP and prescription costs",
    summary:
      "Without a medical card, students typically pay the full GP consultation fee and prescription costs, though the Drugs Payment Scheme caps monthly prescription spending - check what your student insurance policy reimburses.",
    sources: [src("HSE - Drugs Payment Scheme", "https://www2.hse.ie/services/schemes-allowances/dps/")],
    tags: ["prescriptions", "cost"],
  },
  {
    category: "health-insurance",
    title: "Campus health service",
    summary:
      "Most Irish universities operate an on-campus student health centre offering GP appointments, nursing services, and referrals at reduced or subsidised rates compared to private clinics.",
    sources: [src("Example: TCD Student Health Service", "https://www.tcd.ie/collegehealth/")],
    tags: ["campus health"],
  },
  {
    category: "health-insurance",
    title: "Mental health and counselling access",
    summary:
      "Universities provide free, confidential student counselling, and most international offices run peer-support programmes. Ireland's free national supports include the text service 50808 and Samaritans (116 123), available to anyone at any time.",
    sources: [src("YourMentalHealth.ie", "https://www.yourmentalhealth.ie/")],
    tags: ["mental health", "counselling"],
  },

  // 4. Banking & Money
  {
    category: "banking-money",
    title: "Opening a bank account (AIB, Bank of Ireland)",
    summary:
      "AIB and Bank of Ireland are Ireland's two largest banks and both offer student current accounts. You'll typically need photo ID, proof of address, and your PPS number to open an account in person.",
    sources: [src("AIB - Student accounts", "https://aib.ie/"), src("Bank of Ireland - Student accounts", "https://www.bankofireland.com/")],
    tags: ["bank account", "AIB", "Bank of Ireland"],
  },
  {
    category: "banking-money",
    title: "Proof-of-address workaround",
    summary:
      "Since banks want proof of address but new arrivals often can't provide a utility bill yet, most universities issue an official letter confirming your accommodation and enrolment that banks accept as proof of address.",
    sources: [src("Citizens Information - Opening a bank account", "https://www.citizensinformation.ie/en/money-and-tax/personal-finance/current-accounts/opening-a-bank-account/")],
    tags: ["proof of address"],
  },
  {
    category: "banking-money",
    title: "Digital banks (Revolut, N26)",
    summary:
      "Digital banks like Revolut and N26 let you open an account and get a card within minutes using just your phone and passport, making them a popular way to manage money in the first weeks before opening a traditional bank account.",
    sources: [src("Revolut", "https://www.revolut.com/"), src("N26", "https://n26.com/")],
    tags: ["digital banking", "Revolut", "N26"],
  },
  {
    category: "banking-money",
    title: "Cost-of-living breakdown",
    summary:
      "Beyond rent, budget roughly €250-€350/month for food, €50-€100 for transport, plus utilities, phone, and social spending. Dublin runs noticeably higher than Cork, Galway, Limerick, or Waterford.",
    sources: [src("Citizens Information - Cost of living", "https://www.citizensinformation.ie/en/money-and-tax/")],
    tags: ["cost of living", "budget"],
  },
  {
    category: "banking-money",
    title: "Budgeting tips",
    summary:
      "Track recurring costs (rent, phone, insurance) separately from discretionary spending, use student discounts (Student Leap Card, USIT), and use your bank app's budgeting tools to stay on top of spending.",
    sources: [src("Citizens Information - Budgeting", "https://www.citizensinformation.ie/en/money-and-tax/personal-finance/budgeting/")],
    tags: ["budgeting"],
  },

  // 5. Transport
  {
    category: "transport",
    title: "Leap Card & Student Leap Card",
    summary:
      "The Leap Card is a reloadable smart card for discounted travel on Dublin Bus, Luas, DART and other services. The Student Leap Card (for full-time students 16+) adds further transport discounts and doubles as ID for retail discounts nationwide.",
    sources: [src("Student Leap Card", "https://www.studentleapcard.ie/")],
    tags: ["Leap card", "student discounts"],
  },
  {
    category: "transport",
    title: "Dublin Bus, Luas, DART, Intercity",
    summary:
      "Dublin's public transport includes Dublin Bus, the Luas tram, and the DART coastal rail line. Iarnród Éireann intercity trains and Bus Éireann coaches connect Dublin to other cities like Cork, Galway, and Limerick.",
    sources: [src("Transport for Ireland", "https://www.transportforireland.ie/")],
    tags: ["Dublin Bus", "Luas", "DART"],
  },
  {
    category: "transport",
    title: "TFI Live app",
    summary:
      "The TFI Live app provides real-time public transport arrival times, route planning, and Leap Card top-ups across Ireland's national transport network.",
    sources: [src("TFI Live", "https://www.transportforireland.ie/tfi-live/")],
    tags: ["TFI Live", "app"],
  },
  {
    category: "transport",
    title: "Cycling and walking options",
    summary:
      "Dublinbikes offers short-term bike rental docking stations across the city centre. Many students also cycle or walk to campus, particularly in smaller cities like Galway and Cork.",
    sources: [src("Dublinbikes", "https://www.dublinbikes.ie/")],
    tags: ["cycling", "walking"],
  },
  {
    category: "transport",
    title: "Airport-to-city transfers on arrival",
    summary:
      "From Dublin Airport, Aircoach and Dublin Express run frequent direct coach services to the city centre, alongside taxis and public buses. Pre-booking a transfer for your arrival day is a good idea, especially with luggage.",
    sources: [src("Dublin Airport - Transport", "https://www.dublinairport.com/")],
    tags: ["airport transfer"],
  },

  // 6. Phone & Connectivity
  {
    category: "phone-connectivity",
    title: "SIM / eSIM options",
    summary:
      "Irish mobile networks sell prepaid SIM/eSIM starter packs at airports, shops, and online, typically requiring only ID - a good way to get connected immediately on arrival before other paperwork is sorted.",
    sources: [src("Citizens Information - Mobile phones", "https://www.citizensinformation.ie/en/consumer/")],
    tags: ["SIM", "eSIM"],
  },
  {
    category: "phone-connectivity",
    title: "Budget providers (48, GoMo, Three)",
    summary:
      "Budget/MVNO providers like 48, GoMo, and Three offer competitively priced SIM-only prepaid and bill-pay plans with generous data allowances, often cheaper than legacy full-price networks for equivalent usage.",
    sources: [src("ComReg - Compare providers", "https://www.comreg.ie/")],
    tags: ["mobile providers", "budget"],
  },
  {
    category: "phone-connectivity",
    title: "Prepaid vs. bill-pay",
    summary:
      "Prepaid ('pay as you go') plans need no credit check or bank account, ideal for new arrivals. Bill-pay (postpaid) plans usually require an Irish bank account and a minimum contract term but can include a subsidised phone.",
    sources: [src("ComReg - Mobile phone contracts", "https://www.comreg.ie/")],
    tags: ["prepaid", "bill-pay"],
  },
  {
    category: "phone-connectivity",
    title: "Home broadband basics",
    summary:
      "If living off-campus, providers like Eir, Virgin Media, and Sky offer home broadband. PBSA and many house-shares include broadband in the rent, so check your lease before signing a separate contract.",
    sources: [src("ComReg - Broadband", "https://www.comreg.ie/")],
    tags: ["broadband"],
  },

  // 7. Working Part-Time
  {
    category: "working-part-time",
    title: "Stamp 2 work rules (20/40 hours)",
    summary:
      "Stamp 2 students may work up to 20 hours per week during term-time and up to 40 hours per week during official college holiday periods (typically summer and Christmas/Easter breaks as defined by their institution).",
    sources: [src("Citizens Information - Working while studying", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/visas-and-residence-in-ireland/")],
    tags: ["work rules", "stamp 2"],
  },
  {
    category: "working-part-time",
    title: "Minimum wage",
    summary:
      "Ireland's national minimum wage is reviewed annually by the Low Pay Commission. Check the current rate on gov.ie or Citizens Information, as most part-time student jobs (retail, hospitality) pay at or near this rate.",
    sources: [src("Citizens Information - National minimum wage", "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/pay-and-employment/minimum-wage/")],
    tags: ["minimum wage"],
  },
  {
    category: "working-part-time",
    title: "Where to find student jobs",
    summary:
      "University careers services, campus jobs boards, and general sites like Indeed.ie and JobsIreland.ie list part-time roles. Hospitality, retail, and campus positions (library, students' union) are common starting points.",
    sources: [src("JobsIreland.ie", "https://www.jobsireland.ie/")],
    tags: ["job search"],
  },
  {
    category: "working-part-time",
    title: "CV and job application basics for Ireland",
    summary:
      "Irish CVs are typically 1-2 pages, reverse-chronological, and skip a photo. A short tailored cover note is often expected, and your university careers service can review drafts for free.",
    sources: [src("Citizens Information - Applying for a job", "https://www.citizensinformation.ie/en/employment/")],
    tags: ["CV", "applications"],
  },
  {
    category: "working-part-time",
    title: "Tax basics (PPS, emergency tax)",
    summary:
      "Without a PPS number registered with your employer through Revenue's online system, you'll be placed on 'emergency tax' and taxed at a higher rate. Register your job with Revenue (myAccount) promptly to be taxed correctly and reclaim any emergency tax overpaid.",
    sources: [src("Revenue - Emergency tax", "https://www.revenue.ie/en/jobs-and-pensions/emergency-tax/")],
    tags: ["tax", "emergency tax"],
  },

  // 8. Food, Groceries & Cheap Eats
  {
    category: "food-groceries",
    title: "Budget supermarkets (Lidl, Aldi, Tesco)",
    summary:
      "Lidl and Aldi are generally the cheapest large supermarket chains in Ireland, with Tesco and SuperValu offering wider selection at moderately higher prices. Most students shop across a couple of chains to balance cost and choice.",
    sources: [src("Citizens Information - Cost of living", "https://www.citizensinformation.ie/en/money-and-tax/")],
    tags: ["groceries", "supermarkets"],
  },
  {
    category: "food-groceries",
    title: "Cheap eats near campus",
    summary:
      "Most campuses have affordable student-priced canteens, and areas near universities typically have budget-friendly cafes, chippers, and international restaurants popular with students.",
    sources: [src("General student guides", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["cheap eats"],
  },
  {
    category: "food-groceries",
    title: "Student-night deals",
    summary:
      "Many restaurants and cafes near college areas offer midweek student discounts with a valid Student Leap Card or college ID - worth asking about even where it isn't advertised.",
    sources: [src("Student Leap Card - Discounts", "https://www.studentleapcard.ie/")],
    tags: ["student discounts"],
  },
  {
    category: "food-groceries",
    title: "Affordable drinks and pubs",
    summary:
      "Irish pub culture is a major part of social life. Many college-area pubs run student nights with discounted drinks, though budgeting and moderation are worth keeping in mind given Ireland's relatively high alcohol prices.",
    sources: [src("Citizens Information - Cost of living", "https://www.citizensinformation.ie/en/money-and-tax/")],
    tags: ["pubs", "drinks"],
  },
  {
    category: "food-groceries",
    title: "International / specialty grocery shops",
    summary:
      "Cities like Dublin, Cork, and Galway have dedicated international/Asian/African/Eastern European grocery shops carrying ingredients not found in mainstream supermarkets - ask your student society or search local listings for shops near you.",
    sources: [src("General local search", "https://www.google.com/maps")],
    tags: ["international groceries"],
  },

  // 9. Community & Social Life
  {
    category: "community-social",
    title: "Student societies and clubs",
    summary:
      "Nearly every Irish university has dozens of student-run societies (sports, cultural, hobby, academic). Joining during Freshers' Week is one of the fastest ways to meet people with shared interests.",
    sources: [src("Example: UCD Societies", "https://www.ucd.ie/students/")],
    tags: ["societies", "clubs"],
  },
  {
    category: "community-social",
    title: "Cultural and nationality-based groups",
    summary:
      "Many universities and cities have nationality- or culture-specific student associations (e.g. Indian, Nigerian, Chinese, Brazilian student societies) that organise events and provide informal peer support for newly arrived students.",
    sources: [src("University international offices", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["cultural groups"],
  },
  {
    category: "community-social",
    title: "Sports and fitness",
    summary:
      "University sports clubs range from competitive intervarsity teams to casual recreational sessions, and most campuses have affordable student gym memberships through the students' union or sports centre.",
    sources: [src("University sports clubs", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["sports", "fitness"],
  },
  {
    category: "community-social",
    title: "Events and meetups",
    summary:
      "Students' unions, international offices, and platforms like Meetup and Eventbrite regularly list orientation events, city tours, and social meetups aimed specifically at international and new students.",
    sources: [src("Eventbrite Ireland", "https://www.eventbrite.ie/")],
    tags: ["events", "meetups"],
  },
  {
    category: "community-social",
    title: "Tips for meeting locals and fellow internationals",
    summary:
      "Joining a society, attending students' union events, and being open to conversation in shared accommodation or classes are the most reliable ways to build a social circle. Irish people are generally friendly and conversational, especially once you show interest in local culture.",
    sources: [src("General guidance", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["social tips"],
  },

  // 10. Safety & Emergencies
  {
    category: "safety-emergencies",
    title: "Emergency numbers (112 / 999)",
    summary:
      "Both 112 and 999 connect to Ireland's emergency services (Gardaí/police, ambulance, fire) and are free to call from any phone, including without credit or a SIM.",
    sources: [src("An Garda Síochána - Emergency numbers", "https://www.garda.ie/en/contact-us/")],
    tags: ["emergency", "112", "999"],
  },
  {
    category: "safety-emergencies",
    title: "Safe-area guidance",
    summary:
      "Ireland is generally a safe country for students, but as in any city, exercise normal precautions at night, stay aware of your surroundings in busy nightlife areas, and use licensed taxis or ride-hailing apps rather than walking alone late at night in unfamiliar areas.",
    sources: [src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/")],
    tags: ["safety tips"],
  },
  {
    category: "safety-emergencies",
    title: "Campus security",
    summary:
      "Universities operate on-campus security teams (often 24/7) who can escort students to accommodation, respond to incidents, and provide guidance. Their contact number is usually listed on student ID cards and the university app.",
    sources: [src("University security services", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["campus security"],
  },
  {
    category: "safety-emergencies",
    title: "Reporting issues (Garda, university)",
    summary:
      "Non-emergency incidents can be reported to your local Garda station or via the Garda's online portal. Universities also have dedicated staff - often within student services or the international office - to support students who experience harassment, discrimination, or crime.",
    sources: [src("An Garda Síochána", "https://www.garda.ie/")],
    tags: ["reporting", "Garda"],
  },
  {
    category: "safety-emergencies",
    title: "Personal safety tips",
    summary:
      "Keep copies of important documents (passport, IRP) separately from the originals, share your location with a trusted friend on nights out, and consider registering with your home country's embassy or consulate in Ireland where relevant.",
    sources: [src("Citizens Information - Personal safety", "https://www.citizensinformation.ie/en/")],
    tags: ["personal safety"],
  },

  // 11. University Support Services
  {
    category: "university-support",
    title: "International student office",
    summary:
      "Every Irish university has a dedicated international office that assists with visa/immigration questions, orientation, and general settling-in support specifically for non-Irish students.",
    sources: [src("Example: UCD Global", "https://www.ucd.ie/global/")],
    tags: ["international office"],
  },
  {
    category: "university-support",
    title: "Academic writing and study support",
    summary:
      "Most universities offer free academic/writing support centres where students can get help with essays, referencing, and study skills, often via one-to-one appointments or workshops.",
    sources: [src("University writing/study centres", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["academic support"],
  },
  {
    category: "university-support",
    title: "Careers service",
    summary:
      "University careers services offer free CV reviews, mock interviews, and job/internship listings, including guidance specific to international students navigating Irish work permissions.",
    sources: [src("University careers services", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["careers"],
  },
  {
    category: "university-support",
    title: "Counselling and wellbeing",
    summary:
      "Free, confidential student counselling and wellbeing services are available at every university, often with fast access for urgent concerns and longer-term support available by referral.",
    sources: [src("YourMentalHealth.ie", "https://www.yourmentalhealth.ie/")],
    tags: ["wellbeing", "counselling"],
  },
  {
    category: "university-support",
    title: "Disability and accessibility support",
    summary:
      "Universities have a disability support/access service that arranges reasonable accommodations (exam arrangements, assistive technology, note-takers) for students with a disability or specific learning difficulty - register early in the term for fastest support.",
    sources: [src("AHEAD - Association for Higher Education Access & Disability", "https://www.ahead.ie/")],
    tags: ["disability support", "accessibility"],
  },

  // 12. Getting Started (homepage/onboarding)
  {
    category: "getting-started",
    title: "New here? Start with these 5 things",
    summary:
      "1) Register your IRP if required. 2) Get a PPS number. 3) Open a bank account. 4) Get a Leap card. 5) Register with a GP. Doing these in your first few weeks makes everything else - work, tax, healthcare - much easier.",
    sources: [src("Citizens Information - Moving to Ireland", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/")],
    tags: ["getting started", "checklist"],
    order: 1,
  },
  {
    category: "getting-started",
    title: "Pre-arrival checklist",
    summary:
      "Before you fly: confirm your visa/immigration approval, arrange your first few nights' accommodation, sort your private medical insurance, bring printed copies of your offer letter and proof of funds, and download the TFI Live and your chosen banking app.",
    sources: [src("Irish Immigration - Coming to study", "https://www.irishimmigration.ie/coming-to-study-in-ireland/")],
    tags: ["pre-arrival", "checklist"],
    order: 2,
  },
  {
    category: "getting-started",
    title: "First-week checklist",
    summary:
      "In week one: attend orientation, locate your international office, start your IRP/PPS applications, open a bank account, get a Leap card, and register with a GP near your accommodation.",
    sources: [src("Citizens Information - Moving to Ireland", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/")],
    tags: ["first week", "checklist"],
    order: 3,
  },
  {
    category: "getting-started",
    title: "Glossary of Irish terms and acronyms",
    summary:
      "IRP = Irish Residence Permit. PPS = Personal Public Service number. Stamp 2 = the immigration permission for full-time non-EEA students. Leap = the public transport smart card. 'Digs' = a room rented in a family home, often with meals included. ILEP = Interim List of Eligible Programmes.",
    sources: [src("Citizens Information - Glossary", "https://www.citizensinformation.ie/en/")],
    tags: ["glossary", "acronyms"],
    order: 4,
  },
];

module.exports = guidesData;
