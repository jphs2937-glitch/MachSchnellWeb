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
 * Leave `src` empty ("") to show a labeled placeholder box instead.
 */

export type Photo = {
  /** Path under /public, e.g. "/photos/storage-floor.jpg". Empty string shows a placeholder. */
  src: string;
  /** Describes the photo for screen readers and search engines. Required. */
  alt: string;
  /** Short label. Shown on the placeholder box, and under the photo in the gallery lightbox. */
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
  },

  /* ------------------------------------------------------------------ */
  /* STORAGE                                                             */
  /* ------------------------------------------------------------------ */

  amenities: [
    { title: "Climate controlled", text: "Temperature and humidity held steady all year." },
    { title: "Secure, gated, camera-monitored", text: "Gated entry and cameras on the floor." },
    { title: "Battery tender and car cover included", text: "Every car on a tender, under a cover, ready to start." },
  ],

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
      price: "+$100",
      description: "Full interior and exterior, leather conditioning, protective wax.",
    },
    {
      id: "concours" as UpgradeId,
      name: "Concours",
      price: "+$175",
      description: "Our full collector-car detail with clay bar and premium wax.",
    },
  ],

  storageFaq: [
    {
      q: "Can I get to my car?",
      a: "Yes. Let us know in advance and your car will be out, charged and ready to drive.",
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
    heroPhoto: { src: "", alt: "Members' cars parked on the climate-controlled storage floor", caption: "Storage floor wide" },

    whatWeDo: {
      kicker: "What we do",
      title: "Store · Detail · Drive",
      blocks: [
        {
          title: "Storage",
          text: "Climate-controlled, gated and camera-monitored space for luxury and collector cars. Battery tender and car cover on every car.",
          link: { label: "See storage", href: "/storage" },
          photo: { src: "", alt: "A covered car on a battery tender in its storage bay", caption: "Storage bay" },
        },
        {
          title: "Detailing",
          text: "Four packages, done in our facility by a professional detailer. From a maintenance wash to a full collector-car detail.",
          link: { label: "See detailing", href: "/detailing" },
          photo: { src: "", alt: "A detailer applying wax to a car's hood", caption: "Detailing" },
        },
        {
          title: "Club",
          text: "Drives, meets and evenings at the garage for members. Events are coming soon.",
          link: { label: "Become a member", href: "/join" },
          photo: { src: "", alt: "Members' cars lined up before a morning drive", caption: "Club drive" },
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
        { src: "", alt: "Wide view of the storage floor with cars under covers", caption: "Storage floor" },
        { src: "", alt: "Gated entrance to the facility", caption: "Gated entrance" },
      ] as Photo[],
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
    },
  },

  storage: {
    seoTitle: "Storage",
    seoDescription:
      "Climate-controlled, secure car storage in Houston from $300/month. Battery tender and car cover included. Plans with monthly detailing.",
    kicker: "Storage · Houston",
    title: "Car storage",
    /** The title broken by hand for the wide display face. */
    titleLines: ["Car", "storage"],
    amenitiesTitle: "What's included",
    lead: "A climate-controlled, gated, camera-monitored garage for luxury and collector cars. Every car goes on a battery tender, under a cover, and stays ready to drive.",
    introPhoto: { src: "", alt: "Cars under covers on the storage floor", caption: "Storage floor" },
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
      { src: "", alt: "Close-up of a battery tender connected to a stored car", caption: "Battery tender" },
      { src: "", alt: "Security camera over the storage floor", caption: "Security" },
    ] as Photo[],
  },

  detailingPage: {
    seoTitle: "Detailing",
    seoDescription:
      "Four detailing packages for luxury and collector cars in Houston, from $125. Done at our climate-controlled facility by a professional detailer.",
    kicker: "Detailing · Houston",
    title: "Detailing",
    lead: "Performed at our climate-controlled facility by a professional detailer.",
    packagesKicker: "Packages",
    packagesTitle: "Four packages",
    membersLink: { label: "Storage plans", href: "/storage" },
    photos: [
      { src: "", alt: "Hand washing a car's exterior", caption: "Hand wash" },
      { src: "", alt: "Leather seat being conditioned", caption: "Interior" },
      { src: "", alt: "Clay bar on a painted panel", caption: "Clay bar" },
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
    successMessage: "Request received. We'll call you within one business day.",
    submitLabel: "Send request",
    errorMessage: "Something went wrong sending your request. Try again, or call us.",
    sendingLabel: "Sending",
    stepsTitle: "How it works",
    steps: [
      "Send this form. It takes two minutes.",
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
      year: "Year",
      make: "Make",
      model: "Model",
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
        year: "Enter the year as four digits, like 1973.",
        make: "Enter the make.",
        model: "Enter the model.",
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

  photos: [
    { src: "", alt: "Storage floor with cars under covers", caption: "Storage floor" },
    { src: "", alt: "A coupe after a Concours detail", caption: "Concours detail" },
    { src: "", alt: "Detailer cleaning a wheel", caption: "Wheels" },
    { src: "", alt: "Members' cars lined up outside the garage", caption: "Morning lineup" },
    { src: "", alt: "Leather interior after conditioning", caption: "Interior" },
    { src: "", alt: "Gated entrance at dusk", caption: "Entrance" },
    { src: "", alt: "Clay bar decontamination on a hood", caption: "Clay bar" },
    { src: "", alt: "A car on a battery tender", caption: "Battery tender" },
    { src: "", alt: "Side profile of a collector car", caption: "Side profile" },
    { src: "", alt: "Wax being buffed off a fender", caption: "Wax" },
    { src: "", alt: "Car covers on the storage floor", caption: "Covers on" },
    { src: "", alt: "A member collecting their car", caption: "Ready to drive" },
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
