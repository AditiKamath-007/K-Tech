/* =============================================================
   HELION SOLAR — SHARED DATA
   -------------------------------------------------------------
   Loaded on every page (index.html + product.html) BEFORE the
   page-specific script. Edit prices, specs, descriptions and
   image URLs here — everything else reads from these arrays.

   Prices are in Indian Rupees (INR), stored as plain numbers.

   PRODUCT CATEGORIES (top-level, used for filtering + nav dropdown)
     wind-solar    -> Wind Solar        (Wind Mill, Hybrid)
     solar-pv      -> Solar PV          (DC, Off-grid, Rooftop, Hybrid, Ground-mounted)
     solar-heating -> Solar Heating     (Water Heater)
     heat-pump     -> Air Source Heat Pump (Residential, Commercial)
   ============================================================= */

const CATEGORY_LABELS = {
  "wind-solar": "Wind Solar",
  "solar-pv": "Solar PV",
  "solar-heating": "Solar Heating",
  "heat-pump": "Air Source Heat Pump"
};

/* Small icon + CSS animation used per category — on product cards
   and the hero showcase widget. See css/style.css section
   "CATEGORY ICON ANIMATIONS" to restyle these. */
const CATEGORY_ICONS = {
  "wind-solar": "fa-solid fa-fan",
  "solar-pv": "fa-solid fa-solar-panel",
  "solar-heating": "fa-solid fa-temperature-arrow-up",
  "heat-pump": "fa-solid fa-wind"
};

const PRODUCTS = [
  /* ---------------- 1. WIND SOLAR ---------------- */
  {
    id: "wind-mill",
    category: "wind-solar",
    tag: "Wind Solar · Wind Mill",
    name: "Standalone Wind Turbine System",
    desc: "A compact rooftop or pole-mounted wind turbine for sites with strong, steady wind — often paired with a small solar top-up.",
    longDesc: "Our standalone wind turbine is built for sites with consistent wind resource — coastal plots, open farmland or elevated rooftops. A low-noise composite blade design starts generating at low wind speeds, and the included charge controller manages output safely into your battery bank. Best suited as a primary source where wind is strong and reliable, or as a complement to solar for round-the-clock generation.",
    specs: ["3 kW", "Pole/Roof Mount", "Low-Noise Blades", "10-yr Warranty"],
    highlights: ["Generates day and night whenever wind is available", "Low-noise composite blade design", "Includes charge controller and mounting kit", "Works well combined with a small solar array"],
    price: 289000,
    unit: "unit",
    images: [
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "wind-solar-hybrid",
    category: "wind-solar",
    tag: "Wind Solar · Hybrid",
    name: "Wind + Solar Hybrid System",
    desc: "Combines a wind turbine with a rooftop solar array so generation continues on cloudy, windy days and calm, sunny ones alike.",
    longDesc: "The Hybrid system pairs our standalone wind turbine with a rooftop solar array on a single smart controller, so the two sources cover each other's gaps — solar carries sunny, still days, wind carries cloudy, breezy ones. It's the most weather-resilient option we offer, and a strong fit for sites with variable seasonal weather.",
    specs: ["3 kW Wind + 4 kW Solar", "Combined Controller", "Battery-Ready", "10-yr Warranty"],
    highlights: ["Two independent generation sources on one controller", "Noticeably steadier output across seasons", "Battery-ready for full backup", "Single monitoring dashboard for both sources"],
    price: 549000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
    ]
  },

  /* ---------------- 2. SOLAR PV ---------------- */
  {
    id: "pv-dc-system",
    category: "solar-pv",
    tag: "Solar PV · DC System",
    name: "DC Solar System",
    desc: "A simple direct-current setup for pumps, fans, lighting and other DC loads — no inverter required.",
    longDesc: "For loads that run natively on DC power — irrigation pumps, DC fans, LED lighting circuits — this system skips the inverter entirely, reducing conversion losses and cost. It's a popular choice for farms, outbuildings and small workshops that mainly need to run specific DC equipment rather than a full household AC supply.",
    specs: ["2 kW", "No Inverter Needed", "DC Loads Only", "20-yr Panel Warranty"],
    highlights: ["Lower cost than a full AC system", "No inverter conversion losses", "Ideal for pumps, fans and DC lighting", "Simple two-day installation"],
    price: 129000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "pv-off-grid",
    category: "solar-pv",
    tag: "Solar PV · Off-Grid",
    name: "Off-Grid Solar System",
    desc: "Complete independence from the utility grid — panels, battery bank and inverter sized for full daily household use.",
    longDesc: "Designed for homes and sites with no grid connection at all, or for those who want to be fully independent of it. The off-grid kit includes a larger battery bank than our grid-tied systems, sized to cover your household through the night and through a few cloudy days in a row, with a pure sine-wave inverter for clean AC power.",
    specs: ["5 kW", "15 kWh Battery Bank", "Pure Sine Inverter", "25-yr Panel Warranty"],
    highlights: ["Zero dependency on grid connection", "Battery bank sized for multi-day autonomy", "Pure sine-wave inverter — safe for sensitive electronics", "Remote/rural installation experience"],
    price: 649000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "pv-rooftop",
    category: "solar-pv",
    tag: "Solar PV · Rooftop",
    name: "Rooftop Solar System",
    desc: "Our most-installed setup — grid-tied rooftop panels for 3–4 BHK homes, sized to cover the bulk of daytime usage.",
    longDesc: "The Rooftop system is our most-installed setup, sized for a typical 3–4 BHK home with average daytime usage. It ships as a complete kit — panels, mounting rails, grid-tied inverter and cabling — and is installed by a certified K-Tech crew, usually within two to three weeks of signing.",
    specs: ["6 kW", "16 Panels", "Grid-Tied Inverter", "25-yr Warranty"],
    highlights: ["Covers ~90% of an average urban household's load", "Full return on investment in 4–5 years", "Includes 1 year of free maintenance visits", "App-based real-time generation monitoring"],
    price: 359000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592833167665-ebf9d00cb320?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "pv-hybrid",
    category: "solar-pv",
    tag: "Solar PV · Hybrid",
    name: "Hybrid Solar System",
    desc: "Grid-tied with battery backup — keeps essentials running through an outage while still exporting surplus to the grid.",
    longDesc: "The Hybrid Solar system stays connected to the grid for reliability while adding a battery bank for backup — so the moment the grid drops, your essential circuits switch to battery automatically, and any daytime surplus can still be exported for credit where local rules allow.",
    specs: ["6 kW + 10 kWh Battery", "Hybrid Inverter", "Automatic Backup", "25-yr Panel / 10-yr Battery Warranty"],
    highlights: ["Automatic switch to battery during an outage", "Still exports surplus to the grid on sunny days", "One hybrid inverter handles both functions", "Expandable battery capacity later"],
    price: 649000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "pv-ground-mounted",
    category: "solar-pv",
    tag: "Solar PV · Ground-Mounted",
    name: "Ground-Mounted Solar Power Plant",
    desc: "Utility-scale ground arrays for farms, factories and campuses with open land — the largest capacity we offer.",
    longDesc: "For sites with open land rather than roof space — farms, factories, campuses — a ground-mounted plant lets us optimize panel tilt and orientation for maximum yield, and scales far beyond what a rooftop can support. Includes structural foundation work, perimeter fencing options and a 3-phase inverter setup.",
    specs: ["75 kW+", "3-Phase", "Optimized Tilt", "10-yr SLA"],
    highlights: ["Highest generation capacity in our range", "Panel tilt optimized for your exact latitude", "Modular — expand in phases as needed", "Dedicated commercial project manager"],
    price: 3800000,
    unit: "system",
    images: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80"
    ]
  },

  /* ---------------- 3. SOLAR HEATING ---------------- */
  {
    id: "heating-water-heater",
    category: "solar-heating",
    tag: "Solar Heating · Water Heater",
    name: "Solar Water Heater",
    desc: "Rooftop evacuated-tube collector that heats your household water supply directly from the sun — cuts geyser electricity to near zero.",
    longDesc: "Our solar water heater uses evacuated-tube collectors to heat water directly, storing it in an insulated tank that keeps it hot well into the evening. It's a straightforward, low-maintenance way to cut a large share of a household's electricity use, since water heating is often one of the biggest line items on a home power bill.",
    specs: ["200 L Tank", "Evacuated Tube", "Insulated Storage", "5-yr Tank Warranty"],
    highlights: ["Cuts geyser electricity use to near zero", "Insulated tank keeps water hot into the evening", "Low maintenance — no moving parts", "Sized options from 100L to 500L available"],
    price: 45000,
    unit: "unit",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80"
    ]
  },

  /* ---------------- 4. AIR SOURCE HEAT PUMP ---------------- */
  {
    id: "heatpump-residential",
    category: "heat-pump",
    tag: "Air Source Heat Pump · Residential",
    name: "Residential Air Source Heat Pump",
    desc: "Pulls ambient heat from outside air to heat water or living spaces at a fraction of the electricity a conventional heater uses.",
    longDesc: "An air source heat pump moves heat from the outside air rather than generating it directly, which typically uses three to four times less electricity than a conventional electric water heater for the same output. The residential unit is sized for home hot water and can be paired with your rooftop solar system to run largely on your own generation.",
    specs: ["3–5 kW Output", "COP ~3.8", "Quiet Outdoor Unit", "5-yr Warranty"],
    highlights: ["Up to 4x more efficient than electric resistance heating", "Pairs well with a rooftop solar system", "Compact outdoor unit, quiet operation", "Works in a wide range of ambient temperatures"],
    price: 165000,
    unit: "unit",
    images: [
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "heatpump-commercial",
    category: "heat-pump",
    tag: "Air Source Heat Pump · Commercial",
    name: "Commercial Air Source Heat Pump",
    desc: "Higher-capacity units for hotels, hostels and commercial kitchens with heavy, continuous hot water demand.",
    longDesc: "Built for facilities with sustained hot-water demand — hotels, hostels, commercial kitchens and laundries — the commercial unit scales up output and storage while keeping the same efficiency advantage over conventional heating. Multiple units can be cascaded together for larger sites.",
    specs: ["15–30 kW Output", "COP ~3.5", "Cascade-Ready", "5-yr Warranty"],
    highlights: ["Sized for continuous commercial hot-water demand", "Multiple units cascade for larger facilities", "Meaningfully lowers water-heating energy costs", "Remote monitoring for facilities teams"],
    price: 620000,
    unit: "unit",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

/* -------------------------------------------------------------
   HERO SHOWCASE — the "Explore Our Systems" widget in the hero
   (replaces the old bill simulator). One entry per top-level
   category; the widget lets visitors flip through these.
   ------------------------------------------------------------- */
const SHOWCASE = [
  {
    category: "solar-pv",
    label: "Solar PV",
    heading: "Rooftop Solar",
    blurb: "Grid-tied panels sized to your roof.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "wind-solar",
    label: "Wind Solar",
    heading: "Wind + Solar Hybrid",
    blurb: "Two sources, one steady supply.",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "solar-heating",
    label: "Solar Heating",
    heading: "Solar Water Heater",
    blurb: "Near-zero electricity for hot water.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    category: "heat-pump",
    label: "Heat Pump",
    heading: "Air Source Heat Pump",
    blurb: "Ambient heat, a fraction of the power.",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80"
  }
];

const GALLERY = [
  { image: "1.png", caption: "800kW RoofTop System - Shivshakti Sugars, Raibag", big: true },
  { image: "2.png", caption: "800kW RoofTop System - Shivshakti Sugars, Raibag" },
  { image: "3.png", caption: "135kW RoofTop Solar - Attar Steel Structures Pvt.ltd" },
  { image: "4.png", caption: "135kW RoofTop Solar - Attar Steel Structures Pvt.ltd" },
  { image: "5.png", caption: "20kW RoofTop Solar - Sairaj Lawns " },
  { image: "6.png", caption: "10kW RoofTop Solar - Mayakkadevi Petroleum" }
];

/* Testimonials are shown anonymized by role/area only, per site policy. */
const TESTIMONIALS = [
  { role: "Homeowner", meta: "Whitefield, Bengaluru · Rooftop Solar", quote: "My June bill was ₹0. The app shows exactly where every unit of power goes — it genuinely feels like I understand my own house for the first time.", initials: "HO" },
  { role: "Homeowner", meta: "Indiranagar, Bengaluru · Hybrid Solar", quote: "Install took nine days start to finish. The crew was punctual and support has been fast every time I've called.", initials: "HO" },
  { role: "Farm Owner", meta: "Nandi Hills · Wind + Solar Hybrid", quote: "We get steady power even on overcast days now that wind covers the gaps. Best decision for a site that isn't always sunny.", initials: "FO" },
  { role: "Facility Manager", meta: "Peenya Industrial Area · Ground-Mounted Plant", quote: "We sized the array for our factory's daytime load and cut our grid draw by more than half in the first quarter.", initials: "FM" },
  { role: "Homeowner", meta: "HSR Layout, Bengaluru · Solar Water Heater + Rooftop", quote: "The water heater alone dropped our electricity bill noticeably before we even added the rooftop panels.", initials: "HO" }
];

/* -------------------------------------------------------------
   Small shared helper — formats a number as Indian Rupees
   e.g. formatINR(359000) -> "₹3,59,000"
   ------------------------------------------------------------- */
function formatINR(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}
