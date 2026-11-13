/**
 * MACH SCHNELL · SITE CONTENT
 *
 * Every price, phone number, address, package and line of copy on the website lives here.
 * Edit the text between the quotes, save, and the site updates. Keep the brand voice:
 * short, direct, dry. No exclamation marks, no emoji, no hype words. Use " · " between items.
 *
 * Search this file for "TODO:" to find every placeholder that still needs a real value.
 *
 * Photos: put the file in /public/photos/ and set `src` to "/photos/your-file.jpg".
 * Leave `src` empty ("") and that photo spot is hidden; the layout closes up around it.
 * The Gallery page, its nav link and the home gallery strip appear once one gallery photo has a file.
 */

export type Photo = {
  /** Path under /public, e.g. "/photos/storage-floor.jpg". Empty string hides the photo. */
  src: string;
  /** Describes the photo for screen readers and search engines. Required. */
  alt: string;
  /** Short label, shown under the photo in the gallery lightbox. */
  caption: string;
};

export type PlanId = "storage" | "storage-1-detail" | "storage-2-details";
export type UpgradeId = "pit-stop" | "grand-prix" | "concours";


export const site = {
  name: "Mach Schnell Automotive Club",
  shortName: "Mach Schnell",
  established: "2026",
  description:
    "Private, climate-controlled car storage and detailing club in Houston. We store your car, detail it, and keep it ready to drive.",

  contact: {
    /** Shown as written. The tel: link is built from its digits automatically. */
    phone: "(832) 804-8410",
    /** Club inbox. Membership requests are sent here and sent from here. */
    email: "info@mach-schnell.com",
    address: {
      street: "9225 Rasmus Dr",
      city: "Houston",
      region: "TX",
      postalCode: "77063",
      country: "US",
    },
    mapEmbedUrl:
      "https://www.google.com/maps?q=9225+Rasmus+Dr,+Houston,+TX+77063&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9225+Rasmus+Dr,+Houston,+TX+77063",
    /** Access hours. Shown on the site and sent to search engines. 24-hour times. */
    hours: {
      label: "Mon–Fri · 09:00–17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
      /** How far ahead a member calls before collecting a car. */
      notice: "Call 1 hour 30 minutes ahead",
    },
    instagram: {
      handle: "@machschnell.htx",
      url: "https://www.instagram.com/machschnell.htx/",
    },
  },

  /** Top navigation. Order matters. */
  nav: [
    { label: "Storage", href: "/storage" },
    { label: "Detailing", href: "/detailing" },
    { label: "Gallery", href: "/gallery" },
  ],
  cta: { label: "Become a member", href: "/join" },

  /** Events are not live yet. Set enabled: true to show the EVENTS link and make /events public. */
  events: {
    enabled: false,
    label: "Events",
    href: "/events",
    title: "Events",
    kicker: "Members · Coming soon",
    intro:
      "Drives, cars and coffee, and evenings at the garage. The calendar opens to members first.",
    seoDescription: "Mach Schnell club events in Houston. Drives, meets and evenings at the garage.",
    comingSoon: {
      kicker: "Calendar",
      title: "Coming soon",
      text: "The first dates go to members. Join now and you hear about every drive and meet before anyone else.",
      cta: { label: "Become a member", href: "/join" },
    },
  },

  footer: {
    copyright: "© Mach Schnell Automotive Club · Est. 2026",
    /** Shown while the site uses placeholder photography. Set to "" once real club photos are in. */
    photoNote: "Photography: representative images.",
  },

  /* ------------------------------------------------------------------ */
  /* STORAGE                                                             */
  /* ------------------------------------------------------------------ */

  amenities: [
    { title: "Climate controlled", text: "Temperature and humidity held steady all year." },
    { title: "Secure, gated, camera-monitored", text: "Gated entry and cameras on the floor." },
    { title: "Battery tender and car cover included", text: "Every car on a tender, under a cover, ready to start." },
  ],

  /** Security, climate and access, in detail. Shown on the Storage page. */
  facility: {
    kicker: "The facility",
    title: "Security · Climate · Access",
    items: [
      { title: "Security", text: "Gated entry, a monitored alarm and cameras on the floor." },
      { title: "Fire protection", text: "Fire protection across the building." },
      { title: "Climate", text: "Temperature and humidity held steady all year, with backup power on site." },
      { title: "Staff", text: "Staff on call." },
      { title: "Access", text: "Monday to Friday, 09:00 to 17:00. Call 1 hour 30 minutes ahead and your car is out, charged and ready to drive." },
      { title: "Tours", text: "See the garage before you decide. Call us or ask for a callback and we set a time." },
    ],
    termNote: "Six-month minimum term · One plan per car · Three cars or more: call us",
  },

  /** Membership builder on the Storage page. Totals are worked out from `plans` and `upgrades`. */
  builder: {
    kicker: "Build yours",
    title: "Your membership",
    carsLabel: "Cars",
    carsOptions: ["1", "2", "3+"],
    detailsLabel: "Details per month",
    packageLabel: "Detailing package",
    totalLabel: "Estimated monthly total",
    totalNote: "From. Final price confirmed on the call.",
    perCar: "per car",
    manyTitle: "Three cars or more",
    manyText: "Call us and we set up the collection together.",
    cta: "Continue",
  },

  plans: [
    {
      id: "storage" as PlanId,
      name: "Storage",
      price: "$300", // starting price
      pricePrefix: "From",
      priceSuffix: "/month",
      summary: "Storage only.",
      detailsPerMonth: 0,
      featured: false,
    },
    {
      id: "storage-1-detail" as PlanId,
      name: "Storage + 1 Detail",
      price: "$450",
      pricePrefix: "",
      priceSuffix: "/month",
      summary: "Storage plus one Pit Stop detail per month.",
      detailsPerMonth: 1,
      featured: true,
    },
    {
      id: "storage-2-details" as PlanId,
      name: "Storage + 2 Details",
      price: "$575",
      pricePrefix: "",
      priceSuffix: "/month",
      summary: "Storage plus two Pit Stop details per month.",
      detailsPerMonth: 2,
      featured: false,
    },
  ],

  /** Per-detail upgrades offered on the Storage + Detail plans. Pit Stop is included. */
  upgrades: [
    {
      id: "pit-stop" as UpgradeId,
      name: "Pit Stop",
      price: "Included",
      description: "Maintenance wash, included with every detail.",
    },
    {
      id: "grand-prix" as UpgradeId,
      name: "Grand Prix",
      price: "+$75",
      description: "Full interior and exterior, leather conditioning, protective wax.",
    },
    {
      id: "concours" as UpgradeId,
      name: "Concours",
      price: "+$150",
      description: "Our full collector-car detail with clay bar and premium wax.",
    },
  ],

  storageFaq: [
    {
      q: "Can I get to my car?",
      a: "Yes. Monday to Friday, 09:00 to 17:00. Call 1 hour 30 minutes ahead and your car will be out, charged and ready to drive.",
    },
    {
      q: "Do I need my own insurance?",
      a: "Yes. We insure the facility, and your car needs its own active policy while it is stored with us.",
    },
    {
      q: "Is there a minimum term?",
      a: "Yes. Memberships start with a six-month minimum.",
    },
    {
      q: "What size vehicles do you take?",
      a: "Anything from a compact two-seater to a full-size, heavy-duty pickup.",
    },
    {
      q: "Can I see the garage first?",
      a: "Yes. We offer tours. Call us or ask for a callback and we set a time.",
    },
    {
      q: "I have more than one car.",
      a: "Each car gets its own space and plan. For three cars or more, call us and we set it up together.",
    },
    {
      q: "How is the garage secured?",
      a: "Gated entry, a monitored alarm, cameras on the floor and fire protection across the building. Staff are on call.",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* DETAILING                                                           */
  /* ------------------------------------------------------------------ */

  detailing: {
    bookingNotice: "Book at least 2 days in advance.",
    phoneCta: "Call us to schedule your detailing appointment",
    membersNote:
      "Storage + Detail members get Pit Stop included, with upgrades to Grand Prix or Concours.",
  },

  packages: [
    {
      id: "pit-stop" as UpgradeId,
      number: "01",
      name: "Pit Stop",
      price: "$125",
      tagline: "Maintenance wash.",
      includes: [
        "Hand wash exterior",
        "Wheel and tire cleaning",
        "Light interior vacuum and glass cleaning",
      ],
    },
    {
      id: "qualifying",
      number: "02",
      name: "Qualifying",
      price: "$225",
      tagline: "Exterior: wash, clay bar and wax.",
      includes: [
        "Detailed exterior wash",
        "Wheel and tire cleaning",
        "Paint decontamination with clay bar",
        "Premium wax application",
      ],
    },
    {
      id: "grand-prix" as UpgradeId,
      number: "03",
      name: "Grand Prix",
      price: "$275",
      tagline: "Full interior and exterior.",
      includes: [
        "Premium exterior wash",
        "Detailed interior cleaning",
        "Carpet and trunk vacuum",
        "Glass cleaning and leather conditioning",
        "Protective wax",
      ],
    },
    {
      id: "concours" as UpgradeId,
      number: "04",
      name: "Concours",
      price: "$350",
      tagline: "Full detail for collector cars.",
      includes: [
        "Gentle exterior wash",
        "Premium interior detailing",
        "Clay bar paint decontamination",
        "Premium wax",
        "Attention to emblems, trim and delicate details",
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* PAGES                                                               */
  /* ------------------------------------------------------------------ */

  home: {
    seoTitle: "Mach Schnell Automotive Club · Car storage and detailing in Houston",
    kicker: "Automotive club · Houston",
    title: "Mach Schnell",
    lead: "We store your car, detail it, and keep it ready to drive.",
    primaryCta: { label: "Become a member", href: "/join" },
    secondaryCta: { label: "See storage", href: "/storage" },
    /** Price line under the hero lead. */
    priceLine: "Storage from $300/month · Detailing from $125",
    callLabel: "Call",
    /** Pit-wall ticker under the hero. Short items; they scroll in a loop. */
    ticker: [
      "Climate controlled",
      "Secure · Gated · Camera-monitored",
      "Battery tender and car cover included",
      "Detailing from $125",
      "Storage from $300/month",
      "Access Mon–Fri · 09:00–17:00",
      "Tours by appointment",
      "Houston · Est. 2026",
    ],
    heroPhoto: { src: "/photos/coupe-side-garage.jpg", alt: "A red coupé parked side-on in a garage", caption: "Side-on" },

    whatWeDo: {
      kicker: "What we do",
      title: "Store · Detail · Drive",
      blocks: [
        {
          title: "Storage",
          text: "Climate-controlled, gated and camera-monitored space for luxury and collector cars. Battery tender and car cover on every car.",
          link: { label: "See storage", href: "/storage" },
          photo: { src: "/photos/lineup-showroom.jpg", alt: "A line of classic cars parked nose to tail on a polished floor", caption: "Lineup" },
        },
        {
          title: "Detailing",
          text: "Four packages, done in our facility by a professional detailer. From a maintenance wash to a full collector-car detail.",
          link: { label: "See detailing", href: "/detailing" },
          photo: { src: "/photos/polisher-hood.jpg", alt: "A detailer machine-polishing a car hood", caption: "Detailing" },
        },
        {
          title: "Club",
          text: "Drives, meets and evenings at the garage for members. Events are coming soon.",
          link: { label: "Book a tour", href: "/join#callback" },
          photo: { src: "/photos/classics-pair.jpg", alt: "Two classic sports cars parked side by side", caption: "Club" },
        },
      ],
    },

    storageTeaser: {
      kicker: "Storage",
      title: "Storage from $300/month",
      text: "Three memberships. Storage on its own, or storage with one or two details a month.",
      link: { label: "Storage plans", href: "/storage" },
    },

    detailingTeaser: {
      kicker: "Detailing",
      title: "Four packages",
      text: "Done at our climate-controlled facility by a professional detailer. Book at least 2 days in advance.",
      link: { label: "All packages", href: "/detailing" },
    },

    space: {
      kicker: "The space",
      title: "Built for cars that sit well",
      photos: [
        { src: "/photos/storage-hall.jpg", alt: "A long indoor hall of stored collector cars", caption: "Storage hall" },
      ] as Photo[],
      /** Readouts over the garage section. Facts only. */
      specs: [
        { label: "Climate", value: "Held steady" },
        { label: "Entry", value: "Gated" },
        { label: "Cameras", value: "On the floor" },
        { label: "Alarm", value: "Monitored" },
        { label: "Power", value: "Backup on site" },
        { label: "Staff", value: "On call" },
      ],
    },

    /** How a member gets a car out. */
    readyBy: {
      kicker: "Access",
      title: "Call ahead. Drive away.",
      text: "Monday to Friday, 09:00 to 17:00.",
      steps: [
        { tag: "1:30 ahead", title: "You call", text: "Tell us which car and when." },
        { tag: "In the garage", title: "We pull it", text: "Cover off, tender off, car out of its bay." },
        { tag: "On time", title: "You drive", text: "Out front, charged and ready." },
      ],
    },

    galleryStrip: {
      kicker: "Gallery",
      title: "In the garage",
      link: { label: "Full gallery", href: "/gallery" },
    },

    location: {
      kicker: "Location",
      title: "Find us",
      text: "West Houston, inside the Beltway.",
      directionsLabel: "Get directions",
    },

    finalCta: {
      title: "Reserve your space",
      text: "Tell us about your car and we'll call you within one business day.",
      cta: { label: "Become a member", href: "/join" },
      tourCta: { label: "Book a tour", href: "/join#callback" },
    },
  },

  storage: {
    seoTitle: "Car storage in Houston",
    seoDescription:
      "Climate-controlled, secure car storage in Houston from $300/month. Battery tender and car cover included. Plans with monthly detailing.",
    kicker: "Storage · Houston",
    title: "Car storage",
    /** The title broken by hand for the wide display face. */
    titleLines: ["Car", "storage"],
    amenitiesTitle: "What's included",
    lead: "A climate-controlled, gated, camera-monitored garage for luxury and collector cars. Every car goes on a battery tender, under a cover, and stays ready to drive.",
    introPhoto: { src: "/photos/roadster-bay.jpg", alt: "A blue roadster parked in a clean garage bay", caption: "Storage bay" },
    plansKicker: "Memberships",
    plansTitle: "Three plans",
    upgradesLabel: "Per detail upgrades",
    faqTitle: "Questions",
    plansLink: { label: "See the plans", href: "#plans" },
    finalCta: {
      title: "Reserve your space",
      text: "Tell us about your car and we'll call you within one business day.",
    },
    betweenPhotos: [
      { src: "/photos/garage-hall-wide.jpg", alt: "Classic cars on the floor of a brick-walled garage hall", caption: "Garage hall" },
      { src: "/photos/white-coupe-nose.jpg", alt: "The nose of a white classic coupé in a dark garage", caption: "In storage" },
    ] as Photo[],
  },

  detailingPage: {
    seoTitle: "Car detailing in Houston",
    seoDescription:
      "Four detailing packages for luxury and collector cars in Houston, from $125. Done at our climate-controlled facility by a professional detailer.",
    kicker: "Detailing · Houston",
    title: "Detailing",
    lead: "Performed at our climate-controlled facility by a professional detailer.",
    packagesKicker: "Packages",
    packagesTitle: "Four packages",
    membersLink: { label: "Storage plans", href: "/storage" },
    photos: [
      { src: "/photos/hand-wash.jpg", alt: "Hand washing a car door with a wash mitt", caption: "Hand wash" },
      { src: "/photos/dashboard-brush.jpg", alt: "A detailer cleaning a classic car dashboard with a brush", caption: "Interior" },
      { src: "/photos/hood-finish.jpg", alt: "A detailer finishing the hood of a car by hand", caption: "Finish" },
    ] as Photo[],
  },

  gallery: {
    seoTitle: "Gallery",
    seoDescription: "Photos from the Mach Schnell garage in Houston: the storage floor, detailing and club cars.",
    kicker: "Gallery",
    title: "In the garage",
    lead: "The floor, the work and the cars.",
    /** Lightbox labels. The tile label reads "Open photo: <alt>". */
    lightbox: {
      openLabel: "Open photo",
      prev: "Prev",
      next: "Next",
      close: "Close",
    },
  },

  notFound: {
    seoTitle: "Page not found",
    kicker: "Error · 404",
    title: "Wrong turn",
    text: "This page isn't on the route. Head back to the start.",
    cta: { label: "Back to home", href: "/" },
  },

  join: {
    seoTitle: "Become a member",
    seoDescription:
      "Request a Mach Schnell membership: climate-controlled car storage in Houston, with optional monthly detailing.",
    kicker: "Membership",
    title: "Become a member",
    lead: "Tell us about you and your car. We'll call you within one business day to confirm your space.",
    /** Short form: name and phone only. */
    callback: {
      title: "Short on time",
      text: "Leave a name and a number. We call you back, or set up a tour.",
      reasonLegend: "What for",
      reasons: [
        { id: "tour", label: "Book a tour" },
        { id: "callback", label: "Call me back" },
      ],
      submitLabel: "Request a call",
      success: "Got it. We'll call you within one business day.",
      orCall: "Or call",
      emailHeading: "Callback request",
    },
    successMessage: "Request received. We'll call you within one business day.",
    submitLabel: "Send request",
    errorMessage: "Something went wrong sending your request. Try again, or call us.",
    sendingLabel: "Sending",
    stepsTitle: "How it works",
    steps: [
      "Send this form. It takes a minute.",
      "We call you within one business day.",
      "We confirm your plan, your space and a start date.",
    ],
    /** Labels, help text and error messages on the membership form. */
    form: {
      title: "Membership request",
      requiredNote: "Fields marked * are required.",
      requiredLabel: "required",
      optionalLabel: "Optional",
      name: "Name",
      email: "Email",
      phone: "Phone",
      phoneHelp: "We call this number to confirm your space.",
      carLegend: "Car",
      car: "Year, make and model",
      carHelp: "One line is enough. Year first.",
      cars: "How many cars",
      carsOptions: ["1", "2", "3+"],
      planLegend: "Plan",
      packageLegend: "Detailing package",
      packageHelp: "Applies to every detail in your plan. You can change it later.",
      perDetail: "/detail",
      packageShown: "Detailing package options shown.",
      packageHidden: "Detailing package options hidden.",
      startDate: "Desired start date",
      message: "Message",
      messageHelp: "Anything we should know about the car, or the best time to call.",
      honeypot: "Company (leave this empty)",
      errorPrefix: "Error:",
      summaryTitle: "Check the form",
      summaryIntro: "Fix these and send again:",
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address, like name@example.com.",
        phone: "Enter a phone number we can call.",
        car: "Enter the year, make and model.",
        cars: "Choose how many cars.",
        plan: "Choose a plan.",
        package: "Choose a detailing package.",
        startDate: "Choose a start date from today on.",
        tooLong: "Keep this under {max} characters.",
      },
    },
    /** The email the club receives for each request. */
    teamEmail: {
      heading: "New member request",
      submittedLabel: "Submitted",
      notGiven: "Not given",
    },
    confirmationEmail: {
      subject: "Mach Schnell · Request received",
      greeting: "Hello {name},",
      planLine: "Plan requested: {plan}.",
      packageLine: "Detailing package: {package}.",
      lines: [
        "Your membership request is in.",
        "We'll call you within one business day to confirm your space and start date.",
        "Mach Schnell Automotive Club · 9225 Rasmus Dr, Houston, TX 77063",
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* GALLERY PHOTOS                                                      */
  /* Add a photo: copy one line, set src, alt and caption. The first 6  */
  /* also appear in the strip on the home page.                         */
  /* ------------------------------------------------------------------ */

  /** Placeholder photography (free-license, see public/photos/CREDITS.md). Replace with real club photos. */
  photos: [
    { src: "/photos/coupe-side-garage.jpg", alt: "A red coupé parked side-on in a garage", caption: "Side-on" },
    { src: "/photos/lineup-showroom.jpg", alt: "A line of classic cars on a polished floor", caption: "Lineup" },
    { src: "/photos/classics-pair.jpg", alt: "Two classic sports cars parked side by side", caption: "The pair" },
    { src: "/photos/white-coupe-nose.jpg", alt: "The nose of a white classic coupé", caption: "White coupé" },
    { src: "/photos/roadster-bay.jpg", alt: "A blue roadster in a garage bay", caption: "Roadster" },
    { src: "/photos/polisher-hood.jpg", alt: "Machine polishing a hood", caption: "Polish" },
    { src: "/photos/dashboard-brush.jpg", alt: "Brushing a classic dashboard clean", caption: "Interior" },
    { src: "/photos/headlight-dark.jpg", alt: "A headlight lit in the dark", caption: "Headlight" },
    { src: "/photos/roadster-underground.jpg", alt: "A black vintage roadster parked underground", caption: "Vintage roadster" },
    { src: "/photos/storage-hall.jpg", alt: "A long hall of stored collector cars", caption: "Storage hall" },
    { src: "/photos/workshop-floor.jpg", alt: "Classic cars on a workshop floor", caption: "Workshop" },
    { src: "/photos/tail-lights.jpg", alt: "A red coupé from behind with its tail lights on", caption: "Tail lights" },
  ] as Photo[],
};

export type Site = typeof site;
export type Plan = (typeof site.plans)[number];
export type Package = (typeof site.packages)[number];
export type Upgrade = (typeof site.upgrades)[number];

/** Full street address on one line. */
export const addressLine = () => {
  const a = site.contact.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
};
