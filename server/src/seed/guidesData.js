// Seed content for the 16-category taxonomy. Summaries are intentionally concise
// starting points with a credible source citation each - meant to be expanded
// later via the admin dashboard, not exhaustive guides.
const src = (label, url) => ({ label, url });
const mapsLink = (label, query) => src(label, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);

const guidesData = [
  // 0. Before You Leave
  {
    category: "before-you-leave",
    title: "Documents to carry in hand luggage",
    summary:
      "Keep your passport, visa/IRP letter, offer/CoE letter, proof of funds, insurance certificate, and academic/medical records in your hand luggage rather than checked bags - immigration officers may ask for them on arrival, and a lost suitcase shouldn't mean lost paperwork.",
    sources: [src("Irish Immigration - Coming to study", "https://www.irishimmigration.ie/coming-to-study-in-ireland/")],
    tags: ["hand luggage", "documents", "checklist"],
    order: 1,
  },
  {
    category: "before-you-leave",
    title: "Buying health/travel insurance before departure",
    summary:
      "Non-EEA students generally need private medical insurance in place before or on arrival to satisfy the visa/immigration requirement - buy it before you fly so you're covered from day one, rather than scrambling to arrange it once you land.",
    sources: [src("Irish Immigration - Medical insurance requirement", "https://www.irishimmigration.ie/coming-to-study-in-ireland/")],
    tags: ["insurance", "pre-departure"],
    order: 2,
  },
  {
    category: "before-you-leave",
    title: "Finding accommodation from abroad",
    summary:
      "Facebook and WhatsApp student housing groups (see the Accommodation category for named groups) are one of the most active ways to arrange a room before you land, but the same scam precautions apply doubly from abroad: never wire a deposit before verifying the listing and landlord, ideally via a live video call.",
    sources: [src("Citizens Information - Avoiding rental scams", "https://www.citizensinformation.ie/en/housing/renting-a-home/")],
    tags: ["accommodation", "scams", "Facebook"],
    order: 3,
  },
  {
    category: "before-you-leave",
    title: "Setting up an eSIM before departure",
    summary:
      "An eSIM bought before you fly gets you connected the moment you land, without hunting for a shop. Keep your home SIM active (even in a spare phone or as a second eSIM profile) so you can still receive OTP/verification texts from your home bank and other accounts during the transition.",
    sources: [src("ComReg - Mobile phones", "https://www.comreg.ie/")],
    tags: ["eSIM", "connectivity", "OTP"],
    order: 4,
  },
  {
    category: "before-you-leave",
    title: "Packing for Irish weather",
    summary:
      "Ireland is mild but consistently damp and windy rather than extreme - pack a proper waterproof jacket, layers, and comfortable waterproof shoes over heavy winter coats. Sunny, dry days are the exception, not the rule, even in summer.",
    sources: [src("Met Éireann - Climate of Ireland", "https://www.met.ie/climate/climate-of-ireland")],
    tags: ["packing", "weather"],
    order: 5,
  },
  {
    category: "before-you-leave",
    title: "Currency and first-week cash/card access",
    summary:
      "Ireland uses the Euro. Bring or order some cash in euros for your first days before a local bank account is open, and check your home debit/credit card's foreign transaction fees - a travel-friendly card or a digital bank like Revolut/N26 (see Banking & Money) can bridge the gap cheaply.",
    sources: [src("Citizens Information - Opening a bank account", "https://www.citizensinformation.ie/en/money-and-tax/personal-finance/current-accounts/opening-a-bank-account/")],
    tags: ["currency", "euro", "cash"],
    order: 6,
  },
  {
    category: "before-you-leave",
    title: "What to expect at Dublin Airport immigration",
    summary:
      "Non-EEA students go through an immigration checkpoint on arrival where an officer checks your visa/permission, passport, and supporting documents (offer letter, proof of funds, insurance) before stamping you in - keep these easily accessible rather than buried in checked luggage.",
    sources: [src("Dublin Airport - Immigration", "https://www.dublinairport.com/")],
    tags: ["airport", "immigration", "arrival"],
    order: 7,
  },
  {
    category: "before-you-leave",
    title: "Airport to your address - save your Eircode",
    summary:
      "Ireland's postal system relies on Eircodes (a unique code per address) as much as street names - look up and save your accommodation's full address and Eircode before you fly so taxi drivers, delivery apps, and transfer bookings can find it precisely.",
    sources: [src("Eircode - Finder", "https://www.eircode.ie/eircode-finder")],
    tags: ["Eircode", "airport transfer"],
    order: 8,
  },
  {
    category: "before-you-leave",
    title: "Setting realistic expectations",
    summary:
      "The first few weeks are genuinely hard for most people - weather, homesickness, and admin overload hit everyone, not just you. Expect an adjustment period rather than instant comfort, and see the Community & Social Life and People in Ireland categories for what tends to help.",
    sources: [src("YourMentalHealth.ie", "https://www.yourmentalhealth.ie/")],
    tags: ["expectations", "adjustment"],
    order: 9,
  },

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
      "A Personal Public Service (PPS) number is a unique identifier required to work, pay tax, and access public services in Ireland. Apply online via MyWelfare.ie, proving your identity and Irish address as part of the process - and get it sorted before your first payday, whether the job is part-time or full-time.",
    sections: [
      {
        heading: "Why it matters for both part-time and full-time jobs",
        body: "Your employer needs your PPSN to register your job with Revenue and get a Revenue Payroll Notification (RPN), which tells them how much tax and USC to deduct. This applies just as much to a part-time campus or retail job as it does to full-time work - a lot of students assume a few hours a week doesn't count, but it does. Without your PPSN registered against that job, you'll be put on 'emergency tax': taxed at 20% for the first 4 weeks (with no tax credits applied) and then a flat 40% on everything after that. If your employer doesn't even have your PPSN at all, you're taxed at 40% from day one. None of this is a fine or a penalty - it's fully refundable once you register - but it can mean a much smaller paycheck for weeks while you sort it out.",
      },
      {
        heading: "How to apply",
        body: "Apply online through MyWelfare.ie (the fastest route) or in person at an Intreo Centre. You'll need photo ID (passport), proof of your Irish address, and evidence of why you need a PPSN (e.g. a job offer letter or proof of college enrolment). Processing is usually quick once your documents are verified, but apply as early as possible after you arrive, ideally before you accept or start any paid work.",
      },
      {
        heading: "After you have it",
        body: "Give your PPSN to your employer before your first payroll run, and register the job yourself via Revenue's myAccount so an RPN is issued. If you were placed on emergency tax before registering, any overpaid tax is refunded automatically through payroll once your correct tax credits kick in - you don't need to claim it separately in most cases.",
      },
    ],
    sources: [
      src("MyWelfare - Apply for a PPS Number", "https://www.mywelfare.ie/"),
      src("Revenue - Emergency tax", "https://www.revenue.ie/en/jobs-and-pensions/emergency-tax/index.aspx"),
      src("Revenue - Personal Public Service Number", "https://www.revenue.ie/en/jobs-and-pensions/personal-public-service-number/index.aspx"),
    ],
    tags: ["PPS number", "welfare", "PPSN"],
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
    title: "Facebook accommodation groups",
    summary:
      "Alongside Daft.ie and Rent.ie, Facebook groups are one of the most active places students find rooms, house shares, and replacement-housemate listings in Ireland - especially for last-minute or short-notice options - but the same scam precautions apply as anywhere else.",
    sections: [
      {
        heading: "Groups worth joining",
        body: "'Dublin Student Accommodation' and 'International Student Accommodation Dublin' are active groups aimed specifically at students. Searching Facebook for 'Rent a Room/House/Apartment [city]' (e.g. 'Dublin Rent a Room', 'Cork Student Accommodation', 'Galway Student Housing') surfaces further city-specific groups, and most universities have their own informal housing groups for current and incoming students - check with your international office or students' union for the right one to join.",
      },
      {
        heading: "Timing",
        body: "The Irish student rental market is busiest from around July to September for a September start, so join relevant groups and start watching listings from June if you can - good listings for shared houses near campus move fast.",
      },
      {
        heading: "Stay safe",
        body: "The same rules as any rental listing apply on Facebook: never send a deposit before viewing in person or via a live video call, and verify the poster is actually the landlord/current tenant, not someone posing as one - see the rental scam warnings topic in this category.",
      },
    ],
    sources: [
      src("Dublin Student Accommodation (Facebook group)", "https://www.facebook.com/groups/762413034501113/"),
      src("International Student Accommodation Dublin (Facebook page)", "https://www.facebook.com/IntStudentAccommodationDublin/"),
    ],
    tags: ["Facebook", "accommodation groups", "housing search"],
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
    title: "Digital banks (Revolut, N26, Monzo)",
    summary:
      "Digital banks like Revolut, N26, and Monzo let you open an account and get a card within minutes using just your phone and passport, making them a popular way to manage money in the first weeks before opening a traditional bank account.",
    sections: [
      {
        heading: "Monzo",
        body: "Monzo is a UK-based digital bank that operates entirely through a mobile app. It offers a debit card, current account, budgeting tools, savings features, and instant spending notifications.",
      },
      {
        heading: "Is Monzo used in Dublin?",
        body: "Yes, Monzo cards work in Dublin and throughout Ireland anywhere Mastercard is accepted.",
      },
      {
        heading: "How is Monzo beneficial for students?",
        body: "If you already have a Monzo account, it offers several student-friendly features: budgeting tools that categorize your spending automatically; Savings Pots to set aside money for rent, groceries, or travel; instant spending notifications to help you track every purchase; bill splitting with friends; fee-free card payments abroad in many countries; and monthly spending insights to help manage your finances.",
      },
    ],
    sources: [src("Revolut", "https://www.revolut.com/"), src("N26", "https://n26.com/"), src("Monzo", "https://monzo.com/")],
    tags: ["digital banking", "Revolut", "N26", "Monzo"],
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
    title: "Price and benefits comparison: mobile providers in Ireland",
    summary:
      "Only Three, Vodafone, and Eir own physical network infrastructure in Ireland - every other provider (48, GoMo, Tesco Mobile, Clear Mobile, Lycamobile) is a budget reseller (MVNO) riding on one of those three networks, often at a noticeably lower price for the same underlying coverage.",
    sections: [
      {
        heading: "Budget resellers (MVNOs) - cheapest for most students",
        body: "48 (runs on Three's network): around €12.99/month for roughly 200GB of 5G data plus unlimited calls and texts, with no built-in price increases during the plan - one of the strongest value SIM-only deals available. GoMo (runs on Eir's network): around €14.99/month, a solid pick specifically if Three's coverage is weak at your address but Eir's isn't. Tesco Mobile (runs on Three's network): roughly €10-€15/month for unlimited Irish calls and generous data, plus Tesco Clubcard perks. Lycamobile: around €10/month for unlimited data, one of the cheapest headline prices, though check current network/coverage terms. Clear Mobile (runs on Vodafone's network): around €12.99-€14.99/month depending on switching promotions.",
      },
      {
        heading: "The three network owners - pay more, get the parent brand",
        body: "Vodafone is generally considered the most reliable network for consistent nationwide coverage, which matters if you're often outside Dublin or in rural areas. Three has invested heavily in 5G rollout and offers some of the most competitive data allowances directly, not just through its MVNOs. Eir is the third network owner and also sells broadband, useful if you want mobile and home broadband from the same provider.",
      },
      {
        heading: "How to choose",
        body: "Since MVNOs use their parent network's actual towers, you get identical coverage to the full-price brand for less - check which of Three, Vodafone, or Eir has the best signal at your specific address (ComReg's coverage checker helps), then pick the cheapest reseller sitting on that same network rather than paying more for the parent brand's own-label SIM.",
      },
    ],
    sources: [
      src("ComReg - Compare providers", "https://www.comreg.ie/"),
      src("Settle.ie - Mobile Phones in Ireland", "https://settle.ie/guides/mobile-phones-ireland/"),
      src("SmartSaver.ie - Best Mobile Plans Ireland", "https://www.smartsaver.ie/mobile"),
    ],
    tags: ["mobile providers", "budget", "48", "GoMo", "Tesco Mobile", "price comparison"],
    lastVerified: new Date(),
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
      "Without a PPS number registered with your employer through Revenue's online system, you'll be placed on 'emergency tax' and taxed at a higher rate - this applies to part-time and full-time jobs alike. Register your job with Revenue (myAccount) promptly to be taxed correctly and reclaim any emergency tax overpaid.",
    sections: [
      {
        heading: "How emergency tax works",
        body: "If you've given your employer your PPSN but Revenue hasn't yet issued a Revenue Payroll Notification (RPN) for that job, you're taxed at 20% for the first 4 weeks (no tax credits applied) and then 40% flat after that. If your employer doesn't have your PPSN at all, you're taxed at 40% from your very first payslip. This catches out a lot of students working just one or two shifts a week who assume part-time work is somehow exempt - it isn't.",
      },
      {
        heading: "Fixing it",
        body: "Register your employment yourself on Revenue's myAccount as soon as you start (or even before your first shift). Once Revenue issues the RPN to your employer, your next payslip should reflect your correct tax credits, and any emergency tax already deducted is normally refunded automatically through payroll.",
      },
    ],
    sources: [
      src("Revenue - Emergency tax", "https://www.revenue.ie/en/jobs-and-pensions/emergency-tax/index.aspx"),
      src("Revenue - Starting your first job", "https://www.revenue.ie/en/jobs-and-pensions/starting-your-first-job/what-you-should-do.aspx"),
    ],
    tags: ["tax", "emergency tax", "PPSN"],
  },
  {
    category: "working-part-time",
    title: "Sector training requirements (QQI Level 5, PSA licence)",
    summary:
      "Some part-time sectors require a specific qualification before you can legally work in them - healthcare assistant roles generally require a QQI Level 5 award, and security work (bouncer, retail security) requires a PSA (Private Security Authority) licence. Factor training time and cost into your job search if you're aiming for either.",
    sources: [src("PSA - Private Security Authority", "https://www.psa.gov.ie/"), src("QQI", "https://www.qqi.ie/")],
    tags: ["QQI", "PSA licence", "training"],
  },
  {
    category: "working-part-time",
    title: "Holding multiple part-time jobs within the 20-hour cap",
    summary:
      "The 20 hours/week term-time limit under Stamp 2 is an aggregate across all your jobs combined, not per employer - if you take on a second part-time role, your total hours across both must still stay under the cap. Keep a running note of your scheduled hours across all employers so you don't accidentally go over.",
    sources: [src("Citizens Information - Working while studying", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/visas-and-residence-in-ireland/")],
    tags: ["multiple jobs", "stamp 2", "work hours"],
  },

  // 8. Food, Groceries & Cheap Eats
  {
    category: "food-groceries",
    title: "Budget supermarkets (Tesco, Lidl, Aldi, Dunnes)",
    summary:
      "Lidl and Aldi are generally the cheapest large supermarket chains in Ireland, Tesco and Dunnes Stores offer wider selection at moderately higher prices, and most students end up shopping across a couple of chains to balance cost and choice.",
    sections: [
      {
        heading: "Finding your nearest branch",
        body: "All four chains have dozens of branches across Dublin and the other main cities, so it's easiest to just search Google Maps for the chain name and let it show you the closest ones to your accommodation or campus - links below.",
      },
    ],
    sources: [
      src("Citizens Information - Cost of living", "https://www.citizensinformation.ie/en/money-and-tax/"),
      mapsLink("Tesco - find locations", "Tesco Ireland"),
      mapsLink("Lidl - find locations", "Lidl Ireland"),
      mapsLink("Aldi - find locations", "Aldi Ireland"),
      mapsLink("Dunnes Stores - find locations", "Dunnes Stores Ireland"),
    ],
    tags: ["groceries", "supermarkets", "Tesco", "Lidl", "Aldi", "Dunnes"],
  },
  {
    category: "food-groceries",
    title: "Budget clothes shopping (Penneys, TK Maxx, Kildare Village)",
    summary:
      "Penneys (Primark's Irish name - same shop, same owner) is the go-to for cheap everyday clothing, TK Maxx sells discounted branded clothing and homeware, and Kildare Village is a designer outlet centre about 40 minutes from Dublin by train, popular for a day-trip splurge on sale-price designer labels.",
    sections: [
      {
        heading: "Penneys / Primark",
        body: "Penneys is simply what Primark is called in Ireland - large branches are in every major city, with the flagship on Mary Street in Dublin city centre. No online shopping, cash and card accepted in-store, and it's usually the cheapest option for basics, uniforms, and homeware.",
      },
      {
        heading: "TK Maxx",
        body: "TK Maxx sells last-season and overstock branded clothing, shoes, and homeware at a discount. Stock changes constantly and varies a lot by branch, so it's worth checking more than one location if you're after something specific.",
      },
      {
        heading: "Kildare Village",
        body: "An outlet shopping village in Co. Kildare with discounted designer brands, reachable by direct train from Dublin's Heuston Station (around 40 minutes) plus a short shuttle bus, or by car. Popular as a half-day or full-day trip rather than routine shopping.",
      },
    ],
    sources: [
      mapsLink("Penneys/Primark - find locations", "Penneys Primark Ireland"),
      mapsLink("TK Maxx - find locations", "TK Maxx Ireland"),
      mapsLink("Kildare Village", "Kildare Village"),
    ],
    tags: ["shopping", "clothes", "Penneys", "Primark", "TK Maxx", "Kildare Village"],
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
    title: "International / specialty grocery shops (incl. South Asian)",
    summary:
      "Cities like Dublin, Cork, and Galway have dedicated international/Asian/African/Eastern European grocery shops carrying ingredients not found in mainstream supermarkets - a few well-established South Asian and Asian grocers are listed below, and it's worth searching Google Maps for what's closest to you too.",
    sections: [
      {
        heading: "South Asian & Asian grocers in Dublin",
        body: "Asia Market (branches on Drury Street and in Ballymount) has been Ireland's largest Asian supermarket since 1981, stocking Indian, Chinese, Thai, Malaysian, Korean, Vietnamese, and Indonesian ingredients. Spice Bazaar, running since 2006, focuses on Indian, Filipino, and African groceries at affordable prices. Eurasia Supermarket bills itself as Ireland's largest ethnic supermarket, serving Dublin's diverse communities since 2010. Oriental Pantry stocks Indian, Chinese, Korean, Thai, Japanese, and Pakistani groceries. Availability and exact branches change over time, so check each shop's own site before a special trip.",
      },
      {
        heading: "Outside Dublin",
        body: "Cork, Galway, and Limerick all have smaller independent Asian/international grocers too, though fewer than Dublin - search Google Maps for 'Asian grocery' or 'Indian grocery' near your area, or ask a cultural/nationality-based student society for local recommendations.",
      },
    ],
    sources: [
      src("Asia Market", "https://www.asiamarket.ie/"),
      src("Spice Bazaar", "https://spicebazaar.ie/"),
      src("Eurasia Supermarket", "https://www.eurasia.ie/"),
      src("Oriental Pantry", "http://www.orientalpantry.ie/"),
      mapsLink("Search Asian/Indian groceries near you", "Asian grocery Ireland"),
    ],
    tags: ["international groceries", "South Asian", "Indian", "Asian grocery"],
  },
  {
    category: "food-groceries",
    title: "Supermarket loyalty apps and the Re-turn deposit scheme",
    summary:
      "The Lidl Plus app unlocks extra in-store discounts and personalised coupons at no cost. Tesco Clubcard and SuperValu Real Rewards work similarly. Separately, the Re-turn scheme adds a small refundable deposit to most bottles and cans, returned via reverse vending machines in supermarkets when you bring the empty container back - worth knowing so you're not caught out by the higher sticker price at checkout.",
    sources: [src("Re-turn - Deposit Return Scheme", "https://www.re-turn.ie/"), src("Lidl Ireland - Lidl Plus", "https://www.lidl.ie/c/lidl-plus/s10024577")],
    tags: ["Lidl Plus", "Re-turn", "deposit scheme", "loyalty apps"],
  },
  {
    category: "food-groceries",
    title: "Indian restaurants & grocers in Dublin",
    summary:
      "A curated list of Indian restaurants and grocery stores around Dublin, with direct Google Maps links for each branch - worth cross-checking current hours/menus before a visit since details change.",
    sections: [
      {
        heading: "Indian restaurants",
        body: "Andhra Bhavan (Marlborough St and Abbey St), Thindi (Dundrum, Phibsborough, and Rathmines), Indian Vibe (Dun Laoghaire), Southern Spices (Sandyford), Hyderabadi Kitchen (Camden St), Daata (George's St, Glasthule, and Sandymount), Diwali (George's St and Camden St), and Govinda's (Middle Abbey St).",
      },
      {
        heading: "Indian grocery stores",
        body: "Mini India (Westmoreland St and Sandyford), Ingredients (Finglas), Eurasia Supermarket (Lucan), and Spice Bazaar (Tallaght and Phibsborough).",
      },
    ],
    sources: [
      src("Andhra Bhavan - Marlborough St", "https://www.google.com/maps/place/?q=place_id:ChIJ2y8Z4pcPZ0gRHrmnm9Ic_zg"),
      src("Andhra Bhavan - Abbey St", "https://www.google.com/maps/place/?q=place_id:ChIJpxRpfQAPZ0gRjRXfgldTHFU"),
      src("Thindi - Dundrum", "https://www.google.com/maps/place/?q=place_id:ChIJP_fZ0G4JZ0gRQJYIUPGGEDI"),
      src("Thindi - Phibsborough", "https://www.google.com/maps/place/?q=place_id:ChIJs4-iHk8NZ0gR5K_eBuqTWTk"),
      src("Thindi - Rathmines", "https://www.google.com/maps/place/?q=place_id:ChIJj0nZnzcNZ0gRc3BjstA1jMs"),
      src("Indian Vibe - Dun Laoghaire", "https://www.google.com/maps/place/?q=place_id:ChIJn9OVyyEGZ0gRqUJnm6XWaDY"),
      src("Southern Spices - Sandyford", "https://www.google.com/maps/place/?q=place_id:ChIJb9uNYrUJZ0gR4A7OsjNruIY"),
      src("Hyderabadi Kitchen - Camden St", "https://www.google.com/maps/place/?q=place_id:ChIJh--jaa8PZ0gRW93wrFXQyUs"),
      src("Daata - George's St", "https://www.google.com/maps/place/?q=place_id:ChIJdQA4BgAPZ0gRDZTvoNfHnDo"),
      src("Daata - Glasthule", "https://www.google.com/maps/place/?q=place_id:ChIJx8trCQYHZ0gRUTlTa14w5eQ"),
      src("Daata - Sandymount", "https://www.google.com/maps/place/?q=place_id:ChIJazsTd8YPZ0gRlgXIIWhJdVk"),
      src("Diwali - George's St", "https://www.google.com/maps/place/?q=place_id:ChIJ4W1Q4JwOZ0gRmQp-j5AKEbo"),
      src("Diwali - Camden St", "https://www.google.com/maps/place/?q=place_id:ChIJ-0ofIXwPZ0gRa0nUz_mzVdg"),
      src("Govinda's - Middle Abbey St", "https://www.google.com/maps/place/?q=place_id:ChIJO5jqY4QOZ0gRtqEPoGYiCpA"),
      src("Mini India - Westmoreland St", "https://www.google.com/maps/place/?q=place_id:ChIJ7-zkCCcPZ0gR5cRinghRR9s"),
      src("Mini India - Sandyford", "https://www.google.com/maps/place/?q=place_id:ChIJC6vcII8JZ0gR0iC9XdDsWw4"),
      src("Ingredients - Finglas", "https://www.google.com/maps/place/?q=place_id:ChIJdxu-WAoSZ0gRqbS8U_oQ8Mc"),
      src("Eurasia Supermarket - Lucan", "https://www.google.com/maps/place/?q=place_id:ChIJIQx9ct9yZ0gRM8kxjgsUPEM"),
      src("Spice Bazaar - Tallaght", "https://www.google.com/maps/place/?q=place_id:ChIJ6eVG_LR0Z0gRWFMGmdecaUg"),
      src("Spice Bazaar - Phibsborough", "https://www.google.com/maps/place/?q=place_id:ChIJmQU889UNZ0gRJ7KoSWyYnuk"),
    ],
    tags: ["Indian restaurants", "Indian stores", "Dublin"],
  },
  {
    category: "food-groceries",
    title: "Affordable nights out",
    summary:
      "Wetherspoons pubs (e.g. The Silver Penny, The Dame Tavern in Dublin) are consistently among the cheapest options for food and drink in city centres, making them a common budget choice for a night out or a cheap meal.",
    sources: [mapsLink("Wetherspoons Ireland locations", "Wetherspoons Ireland")],
    tags: ["nights out", "Wetherspoons", "budget"],
  },
  {
    category: "food-groceries",
    title: "Food delivery apps and student promos",
    summary:
      "Uber Eats, Deliveroo, and Just Eat all operate in Ireland's main cities, each running rotating student-specific promo codes and subscription discounts (e.g. reduced/free delivery) - worth comparing all three for your regular order rather than defaulting to one app, since fees and promos shift often.",
    sources: [src("Uber Eats", "https://www.ubereats.com/ie"), src("Deliveroo", "https://deliveroo.ie/"), src("Just Eat", "https://www.just-eat.ie/")],
    tags: ["delivery apps", "Uber Eats", "Deliveroo", "Just Eat"],
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
  {
    category: "community-social",
    title: "Volunteering",
    summary:
      "The iVol app and volunteer.ie list volunteering opportunities across Ireland by cause and location - a good way to build local connections and Irish work-reference experience alongside study. Pieta House (suicide/self-harm crisis support) is one well-known example organisation that regularly takes volunteers.",
    sources: [src("Volunteer Ireland", "https://www.volunteer.ie/"), src("Pieta House", "https://www.pieta.ie/")],
    tags: ["volunteering", "iVol", "Pieta House"],
  },
  {
    category: "community-social",
    title: "Toastmasters International",
    summary:
      "Toastmasters clubs (public-speaking and leadership practice groups) run chapters in most Irish cities and are open to anyone, including students - a low-pressure way to build English confidence, meet a mixed group of locals and internationals, and practise communication skills outside class.",
    sources: [src("Toastmasters International - Find a club", "https://www.toastmasters.org/find-a-club")],
    tags: ["Toastmasters", "public speaking"],
  },
  {
    category: "community-social",
    title: "Free public libraries",
    summary:
      "Public libraries are free to join with ID and proof of address, and give access to study space, book borrowing, and digital apps like BorrowBox (ebooks/audiobooks) and PressReader (newspapers/magazines from home) at no cost - useful both for study and for staying connected to news from your home country.",
    sources: [src("Libraries Ireland", "https://www.librariesireland.ie/"), src("BorrowBox", "https://www.borrowbox.com/")],
    tags: ["libraries", "BorrowBox", "PressReader"],
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
    sections: [
      {
        heading: "How to judge an area before you commit",
        body: "Rather than relying on a single label of 'good' or 'bad' (which dates quickly and varies street-by-street), check a few things before renting or wandering somewhere new: official recorded-crime statistics by Garda division (CSO link below), this site's Neighbourhood Guides for areas with a published safety rating, recent local news coverage, and honest opinions from current students in your university's Facebook/WhatsApp groups. Viewing an area on Google Maps Street View, and ideally visiting in person during the day and after dark before signing a lease, tells you more than any single rating.",
      },
      {
        heading: "General precautions that apply almost everywhere",
        body: "Stick to well-lit, busier main streets at night rather than shortcuts through quiet side streets or parks; keep valuables out of sight on public transport; use a licensed taxi (look for the yellow/blue roof-sign licence disc) or a reputable ride-hailing app instead of walking alone late at night in an unfamiliar area; and let a housemate or friend know your plans on a night out.",
      },
    ],
    sources: [
      src("CSO - Recorded crime statistics", "https://www.cso.ie/en/statistics/crimeandjustice/"),
      src("An Garda Síochána - Crime prevention advice", "https://www.garda.ie/en/crime-prevention/"),
    ],
    tags: ["safety tips", "neighbourhood safety"],
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
  {
    category: "university-support",
    title: "Attending extra seminars, guest lectures & electives for networking",
    summary:
      "Beyond your core timetable, sitting in on open guest lectures, extra seminars, and cross-department electives is a low-effort way to meet people outside your immediate course group and build a wider academic network - most universities list these publicly and non-attendees are welcome.",
    sources: [src("University event listings", "https://www.citizensinformation.ie/en/education/third-level-education/")],
    tags: ["networking", "guest lectures", "seminars"],
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
    title: "First-week checklist",
    summary:
      "In week one: attend orientation, register with the university, get your student card, activate your accounts, inspect and photograph your accommodation, start your IRP registration, find a GP/pharmacy near you, and open a bank account.",
    sources: [src("Citizens Information - Moving to Ireland", "https://www.citizensinformation.ie/en/moving-country/moving-to-ireland/")],
    tags: ["first week", "checklist"],
    order: 2,
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

  // 13. People in Ireland
  {
    category: "people-in-ireland",
    title: "Irish communication style: indirectness and understatement",
    summary:
      "Irish conversational style leans indirect - \"we'll sort it\" or \"maybe, we'll see\" often functions as a soft no rather than a real maybe. Understatement is common too (\"not too bad\" can mean genuinely good). Reading the tone and context matters as much as the literal words.",
    sources: [src("Culture Atlas - Irish Culture: Communication", "https://culturalatlas.sbs.com.au/irish-culture/irish-culture-communication")],
    tags: ["communication", "indirectness"],
  },
  {
    category: "people-in-ireland",
    title: "Slagging and self-deprecating humour",
    summary:
      "\"Slagging\" - light, affectionate teasing - is a common way Irish people build rapport, and self-deprecating humour is generally preferred over boasting. Being teased is often a sign of acceptance, not hostility, though it can feel jarring before you're used to the register.",
    sources: [src("Culture Atlas - Irish Culture: Communication", "https://culturalatlas.sbs.com.au/irish-culture/irish-culture-communication")],
    tags: ["slagging", "humour"],
  },
  {
    category: "people-in-ireland",
    title: "Small talk as social ritual, not literal inquiry",
    summary:
      "Comments about the weather or a casual \"how's it going?\" are usually a social ritual to open a conversation, not a literal request for a detailed answer - a brief, friendly reply is the expected response, not a full status update.",
    sources: [src("Culture Atlas - Irish Culture: Communication", "https://culturalatlas.sbs.com.au/irish-culture/irish-culture-communication")],
    tags: ["small talk"],
  },
  {
    category: "people-in-ireland",
    title: "Pub culture and rounds",
    summary:
      "Pubs are a central social space, not just for drinking - many host food, music, and conversation for all ages. If you're out in a group and someone buys \"a round\" (a drink for everyone), the informal expectation is that you buy a round back in turn if you're staying for more than one.",
    sources: [src("Culture Atlas - Irish Culture", "https://culturalatlas.sbs.com.au/irish-culture")],
    tags: ["pub culture", "rounds"],
  },
  {
    category: "people-in-ireland",
    title: "Punctuality, queueing, and tipping norms",
    summary:
      "Social punctuality is looser than professional punctuality - arriving a little late to a casual gathering is normal, but being on time for university/work commitments is expected. Queueing (\"the queue\") is taken seriously and jumping it is a real faux pas. Tipping isn't obligatory but is appreciated in restaurants (roughly 10%) for good table service.",
    sources: [src("Culture Atlas - Irish Culture: Business Etiquette", "https://culturalatlas.sbs.com.au/irish-culture/irish-culture-business-culture")],
    tags: ["punctuality", "queueing", "tipping"],
  },
  {
    category: "people-in-ireland",
    title: "Common Irish-English phrases and slang",
    summary:
      "A few common ones you'll hear early: \"grand\" (fine/okay, used constantly), \"craic\" (fun/good times, as in \"what's the craic?\"), \"deadly\" (excellent), \"sound\" (good/reliable, said of a person), and \"yer man/yer one\" (a way of referring to someone whose name you don't know or aren't using).",
    sources: [src("Culture Atlas - Irish Culture: Communication", "https://culturalatlas.sbs.com.au/irish-culture/irish-culture-communication")],
    tags: ["slang", "phrases"],
  },
  {
    category: "people-in-ireland",
    title: "The academic culture shift",
    summary:
      "Irish third-level teaching tends to be more discussion-based and practical than rote-memorisation-heavy systems elsewhere, with more emphasis on independent critical thinking, essay argumentation, and continuous assessment alongside exams. It can take a semester to adjust expectations around participation and self-directed study.",
    sources: [src("Irish Universities Association", "https://www.iua.ie/")],
    tags: ["academic culture", "study style"],
  },
  {
    category: "people-in-ireland",
    title: "How acquaintances become real friends in an Irish context",
    summary:
      "Irish social circles often form gradually through repeated low-stakes contact - the same class, society, or team - rather than fast, deliberate friend-making. Showing up consistently (weekly society meetup, regular gym class) tends to build real friendship faster than one-off big efforts.",
    sources: [src("Culture Atlas - Irish Culture", "https://culturalatlas.sbs.com.au/irish-culture")],
    tags: ["friendship", "socialising"],
  },

  // 14. Dos, Don'ts & Your Rights
  {
    category: "dos-donts-rights",
    title: "Cultural Dos & Don'ts",
    summary:
      "A quick-reference etiquette guide: do read indirect language rather than taking it literally, do buy your round back at the pub, do show up on time for university/work even though social plans run looser, and do use everyday greetings like a casual \"how's it going?\" without over-explaining your answer. Don't jump a queue, don't take slagging personally, and don't assume \"grand\" always means genuinely great - context matters.",
    sections: [
      {
        heading: "Greeting norms",
        body: "A handshake is standard for first professional/formal introductions; among peers and in casual settings a simple hello, nod, or \"how's it going\" is normal - hugging and cheek-kissing are less automatic than in some cultures and usually reserved for closer relationships.",
      },
      {
        heading: "What \"grand\" means",
        body: "\"Grand\" is one of the most common words you'll hear, and it's flexible: it can mean genuinely good, merely acceptable, or \"I don't want to make a fuss about this\" depending on tone - listen for the tone and context, not just the word itself.",
      },
    ],
    sources: [src("Culture Atlas - Irish Culture", "https://culturalatlas.sbs.com.au/irish-culture")],
    tags: ["etiquette", "dos and donts", "greetings"],
    order: 1,
  },
  {
    category: "dos-donts-rights",
    title: "Racism, Discrimination & Your Rights",
    summary:
      "Racism occurs in Ireland and under-reporting is documented - roughly 1 in 5 racist incidents recorded by iReport are also reported to An Garda Síochána. Knowing the right reporting route for what's happened to you matters, because immediate danger, hate crimes, and discrimination in employment/housing/services are handled through different, separate systems.",
    sections: [
      {
        heading: "Hate crimes are about perceived motivation",
        body: "Under the Criminal Justice (Hate Offences) Act 2024, a hate crime is defined by the offender's perceived prejudice/motivation toward a protected characteristic (such as race, religion, or nationality), not just the severity of the act itself. This matters because clearly asking for an incident to be logged as a hate crime - not just a generic incident - affects how it's recorded and investigated.",
      },
      {
        heading: "Reporting routes, by situation",
        body: "Immediate danger: call 999 or 112. A hate crime (already happened, not an emergency): report to your local Garda station or via the garda.ie hate crime portal, and explicitly ask that it be logged as a hate crime. If you'd rather not attend a station in person, a Garda Diversity Officer or the Garda National Diversity & Integration Unit are alternative points of contact. Confidential, anonymous logging without involving the Gardaí: iReport.ie, run by INAR (Irish Network Against Racism) - useful for building a record even if you don't want to formally report, but it is not a substitute for a Garda report if you do want the incident investigated. Discrimination in employment, housing, or services (rather than a criminal incident) is a separate legal track handled by the Workplace Relations Commission, not the Gardaí.",
      },
      {
        heading: "Everyday safety practice",
        body: "Ordinary urban safety practice applies regardless of background: stick to well-lit main routes at night, share your live location with a trusted friend on nights out, and save your campus security number in your phone. For questions about which areas are considered safer, use this site's sourced, dated Neighbourhood Guides (with a CSO crime-statistics link on each) rather than relying on informal reputation, which is often out of date or unreliable.",
      },
    ],
    sources: [
      src("iReport.ie (INAR)", "https://ireport.ie/"),
      src("An Garda Síochána - Hate crime", "https://www.garda.ie/en/crime-prevention/hate-crime/"),
      src("Workplace Relations Commission", "https://www.workplacerelations.ie/"),
      src("Irish Statute Book - Criminal Justice (Hate Offences) Act 2024", "https://www.irishstatutebook.ie/"),
    ],
    tags: ["racism", "discrimination", "hate crime", "rights", "reporting"],
    order: 2,
  },

  // 15. Activities & Getting Out of the City
  {
    category: "activities",
    title: "Hikes reachable by public transport",
    summary:
      "Several good hikes near Dublin need nothing but a Leap card: Howth Head Cliff Walk and the Bray-Greystones Cliff Walk are both DART-accessible, Killiney Hill Park is a short walk from the Dalkey/Killiney DART stop, and the Ticknock/Fairy Castle Loop is reachable via the Luas Green Line plus a short walk/bus.",
    sources: [mapsLink("Howth Head Cliff Walk", "Howth Head Cliff Walk"), mapsLink("Bray to Greystones Cliff Walk", "Bray to Greystones Cliff Walk")],
    tags: ["hiking", "Howth", "Bray", "Killiney", "Ticknock"],
  },
  {
    category: "activities",
    title: "Howth and the Ireland's Eye ferry",
    summary:
      "From Howth's West Pier, small ferries run a roughly 15-20 minute crossing toward Ireland's Eye island - note that operators vary on whether they actually land you on the island (via rock-cut steps, not a pontoon) or just circle it, so check before booking if landing matters to you. The island has a Martello tower and seabird/seal colonies. Sailings are weather-dependent and generally seasonal (spring to autumn).",
    sources: [mapsLink("Howth West Pier ferries", "Howth West Pier Ireland's Eye ferry")],
    tags: ["Howth", "Ireland's Eye", "ferry"],
  },
  {
    category: "activities",
    title: "Cliffs of Moher & the Wild Atlantic Way",
    summary:
      "The Wild Atlantic Way is a signposted coastal touring route running roughly 2,500km from Donegal to Cork - the umbrella concept behind most of Ireland's west-coast scenic drives and viewpoints. The Cliffs of Moher, one of its best-known stops, sit within the Burren and Cliffs of Moher UNESCO Global Geopark.",
    sources: [src("Wild Atlantic Way", "https://www.wildatlanticway.com/"), src("Cliffs of Moher", "https://www.cliffsofmoher.ie/")],
    tags: ["Wild Atlantic Way", "Cliffs of Moher"],
  },
  {
    category: "activities",
    title: "Doolin to Cliffs of Moher coastal walk",
    summary:
      "The full historic Doolin-Liscannor route runs roughly 14-18km across two sections; the Doolin-to-Visitor-Centre leg alone is commonly cited at 6.6-8km / 2-3 hours. As of the most recent check, large sections are closed for safety/maintenance, with only the Doolin-Surfers Path and the paved Visitor Centre paths open - the old shuttle bus back to Doolin no longer runs, so Bus Éireann route 350 or a taxi are the current return options. A guided option (around 4 hours, including a taxi back) also exists. Closure status changes seasonally, so treat this as a priority check-before-you-go topic.",
    sources: [src("Cliffs of Moher - Walking route info", "https://www.cliffsofmoher.ie/"), src("Clare Tourism", "https://www.clare.ie/")],
    tags: ["Doolin", "Cliffs of Moher walk", "trail closure"],
    lastVerified: new Date(),
  },
  {
    category: "activities",
    title: "Aran Islands",
    summary:
      "Three islands off the Galway/Clare coast: Inis Mór (largest, home to the Dún Aonghasa fort), Inis Meáin (quietest), and Inis Oírr (closest to the mainland, smallest). Ferries run from Doolin (shortest crossing, roughly 15-35 minutes, seasonal March-November, combinable with a Cliffs of Moher boat cruise) or from Rossaveel (year-round, about 40 minutes, with a Galway city shuttle or ~1 hour drive to the pier). Cars aren't allowed on the ferries - bikes and pony-and-trap are the way to get around once there. Seeing all three islands properly in a single day isn't realistic; pick one or plan an overnight.",
    sources: [src("Aran Island Ferries", "https://www.aranislandferries.com/"), src("Doolin Ferry Co.", "https://www.doolinferries.com/")],
    tags: ["Aran Islands", "Inis Mór", "ferry"],
  },
  {
    category: "activities",
    title: "Navigation and trip-planning apps",
    summary:
      "AllTrails and HiiKER are the two most useful hiking/trail apps for Ireland, with HiiKER particularly well-regarded for Irish terrain and trail-specific detail. TFI Live remains the best tool for the public transport leg of getting to trailheads and ferry departure points.",
    sources: [src("HiiKER", "https://www.hiiker.app/"), src("AllTrails", "https://www.alltrails.com/")],
    tags: ["AllTrails", "HiiKER", "TFI Live", "navigation"],
  },
];

module.exports = guidesData;
