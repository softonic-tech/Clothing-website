import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "pep-001",
    name: "Architectural Wool Trench Coat",
    slug: "architectural-wool-trench-coat",
    category: "Outerwear",
    subcategory: "Coats & Jackets",
    price: 380,
    originalPrice: 420,
    tag: "New Arrival",
    isNewArrival: true,
    isFeatured: true,
    featuredInLookbook: true,
    description: "Constructed from double-faced Italian virgin wool with a softly sculpted drop shoulder. Features a clean waist tie, storm flap detailing, and horn buttons for seamless transition across seasons.",
    editorialQuote: "“A sculptural silhouette engineered for effortless, fluid drape in motion.”",
    details: [
      "Double-faced virgin wool blend (85% Virgin Wool, 15% Cashmere)",
      "Unlined interior with bound silk seams for lightweight drape",
      "Detachable self-tie belt with tonal topstitching",
      "Concealed button placket with genuine horn buttons",
      "Deep welt pockets and storm-shield back yoke"
    ],
    fabricAndCare: [
      "Dry clean only by luxury garment specialist",
      "Store on a broad wooden hanger in a breathable garment bag",
      "Steam gently to release natural transit wrinkles"
    ],
    fitInfo: "Relaxed, tailored fit. Designed for easy layering over knitwear. Model is 5'10\" / 178 cm wearing size S.",
    modelInfo: "Height 5'10\" / 178cm | Bust 32\" | Waist 24\" | Hips 35\"",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Oatmeal Melange", hex: "#D6CFC4" },
      { name: "Muted Burgundy", hex: "#6E2D3E" },
      { name: "Charcoal Black", hex: "#22201E" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 14
  },
  {
    id: "pep-002",
    name: "Pleated Wide-Leg Atelier Trouser",
    slug: "pleated-wide-leg-atelier-trouser",
    category: "Tailoring",
    subcategory: "Pants & Trousers",
    price: 210,
    tag: "Bestseller",
    isNewArrival: true,
    isFeatured: true,
    featuredInLookbook: true,
    description: "A masterclass in modern proportion. Cut with high-rise twin front pleats that break elegantly over footwear. Made from fluid tropical wool with a hint of stretch.",
    editorialQuote: "“Sharply creased through the front yet feather-light on the waist.”",
    details: [
      "100% Breathable tropical wool twill",
      "Extended tab waistband with concealed hook-and-bar closure",
      "Twin inverted front pleats for fluid volume",
      "Slanted side pockets and rear welt pocket",
      "Interior curtain waistband for secure tailored fit"
    ],
    fabricAndCare: [
      "Professional dry clean recommended",
      "Cool iron on reverse with press cloth"
    ],
    fitInfo: "High-rise waist, floor-length wide leg. Fits true to size. Model is 5'9\" wearing size S.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Warm Taupe", hex: "#B8ADA0" },
      { name: "Deep Charcoal", hex: "#2B2826" },
      { name: "Ivory Cream", hex: "#EFECE6" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 22
  },
  {
    id: "pep-003",
    name: "Fine Ribbed Cashmere Mockneck",
    slug: "fine-ribbed-cashmere-mockneck",
    category: "Knitwear",
    subcategory: "Sweaters & Cardigans",
    price: 245,
    tag: "Pure Cashmere",
    isNewArrival: true,
    isFeatured: true,
    featuredInLookbook: true,
    description: "Spun from 100% Grade-A Mongolian cashmere with featherweight 16-gauge ribbing. Features seamless tubular cuffs and a softly structured collar that holds its form without restriction.",
    editorialQuote: "“Second-skin softness with zero bulk.”",
    details: [
      "100% Grade-A sustainable Mongolian cashmere",
      "16-gauge fine gauge rib knit",
      "Non-constrictive mock turtleneck",
      "Fully fashioned seam construction"
    ],
    fabricAndCare: [
      "Hand wash cold with delicate wool wash, or eco dry clean",
      "Dry flat on clean towel away from direct heat",
      "Do not wring or hang"
    ],
    fitInfo: "Slim tailored fit through body and arms. Order your standard size or size up for a relaxed drape.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Muted Burgundy", hex: "#6E2D3E" },
      { name: "Sand Heather", hex: "#D9D0C3" },
      { name: "Midnight Navy", hex: "#1A2230" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 18
  },
  {
    id: "pep-004",
    name: "Sculpted Heavyweight Poplin Shirt",
    slug: "sculpted-heavyweight-poplin-shirt",
    category: "Essentials",
    subcategory: "Shirts & Tops",
    price: 165,
    tag: "Essential",
    isNewArrival: true,
    isFeatured: true,
    description: "Crisp 120-thread-count organic cotton poplin cut with an oversized menswear-inspired silhouette. Dropped shoulders, lengthened barrel cuffs, and a curved hem designed for tucking or untucked fluidity.",
    editorialQuote: "“Crisp architectural cotton tailored for modern ease.”",
    details: [
      "100% GOTS-Certified organic long-staple cotton",
      "Mother-of-pearl buttons",
      "Structured spread collar with subtle stay pocket",
      "Back box pleat with refined locker loop"
    ],
    fabricAndCare: [
      "Machine wash warm on gentle cycle",
      "Line dry in shade, warm iron with steam"
    ],
    fitInfo: "Intentionally oversized. For a closer fit, select one size down. Model wears size S.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Optic Ivory", hex: "#F7F5EE" },
      { name: "Sky Chambray", hex: "#B9CBD9" },
      { name: "Washed Olive", hex: "#5C6153" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 30
  },
  {
    id: "pep-005",
    name: "Double-Breasted Cashmere Blend Overcoat",
    slug: "double-breasted-cashmere-overcoat",
    category: "Men",
    subcategory: "Coats & Jackets",
    price: 490,
    tag: "New Arrival",
    isNewArrival: true,
    isFeatured: true,
    description: "A tailored masterpiece tailored for the modern gentleman. Features a classic 6-button double-breasted stance, peak lapels, and high rear vent cut from a dense wool-cashmere blend.",
    editorialQuote: "“Impeccable structure with luxurious natural heat retention.”",
    details: [
      "75% Melton Wool, 25% Mongolian Cashmere",
      "Cupro twill jacquard full lining",
      "Sharp peak lapel with buttonhole loop",
      "Flap hip pockets and interior ticket pocket"
    ],
    fabricAndCare: [
      "Dry clean only",
      "Brush gently with a horsehair clothes brush after wear"
    ],
    fitInfo: "Structured tailored fit with generous chest volume for winter suiting. Model is 6'1\" wearing size L.",
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Camel Melton", hex: "#C49A6C" },
      { name: "Charcoal Slate", hex: "#323336" },
      { name: "Burgundy Wine", hex: "#5C2030" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 9
  },
  {
    id: "pep-006",
    name: "Heavyweight Relaxed Merino Crewneck",
    slug: "heavyweight-relaxed-merino-crewneck",
    category: "Men",
    subcategory: "Knitwear",
    price: 195,
    tag: "Extra Fine",
    isNewArrival: true,
    isFeatured: true,
    description: "Knitted from 7-gauge extra-fine Australian merino wool. Substantial weight with a dry hand-feel, chunky rib trims, and raglan shoulder construction for zero seam chafing.",
    editorialQuote: "“Substantial, cozy, and engineered to age gracefully.”",
    details: [
      "100% Extra-fine 19.5-micron Merino Wool",
      "Heavy 7-gauge half-cardigan stitch",
      "Chunky 2x2 ribbed collar, hem, and cuffs",
      "Natural thermo-regulating and odor-resistant properties"
    ],
    fabricAndCare: [
      "Hand wash cold or gentle wool cycle in laundry bag",
      "Lay flat to dry, store folded"
    ],
    fitInfo: "Relaxed boxy cut with standard length. Fits true to size.",
    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Oatmeal Speckle", hex: "#DCD4C6" },
      { name: "Muted Forest", hex: "#3E493F" },
      { name: "Soot Black", hex: "#22201E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 20
  },
  {
    id: "pep-007",
    name: "Silk Twill Bias-Cut Column Dress",
    slug: "silk-twill-bias-cut-column-dress",
    category: "Women",
    subcategory: "Dresses",
    price: 320,
    tag: "Pure Silk",
    isNewArrival: true,
    isFeatured: true,
    featuredInLookbook: true,
    description: "Crafted on the bias from heavyweight 22mm Mulberry silk twill. Ripples with liquid drape around the body, finished with micro-rouleau straps and a discreet low cowl back.",
    editorialQuote: "“Liquid Mulberry silk tailored on the true 45-degree bias.”",
    details: [
      "100% Mulberry Silk Twill (22 momme)",
      "True 45-degree bias cut for natural body contouring",
      "Self-faced neckline with adjustable delicate back straps",
      "Subtle side slit for effortless movement"
    ],
    fabricAndCare: [
      "Dry clean or hand wash with silk detergent in lukewarm water",
      "Steam on low setting on reverse"
    ],
    fitInfo: "Skims the body gracefully without clinging. Fits true to size. Model wears size XS.",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Burgundy Noir", hex: "#562130" },
      { name: "Champagne Pearl", hex: "#E8DFC8" },
      { name: "Onyx", hex: "#191919" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 11
  },
  {
    id: "pep-008",
    name: "Pleated Japanese Selvedge Chino",
    slug: "pleated-japanese-selvedge-chino",
    category: "Men",
    subcategory: "Pants & Trousers",
    price: 185,
    tag: "Selvedge Cotton",
    isNewArrival: true,
    isFeatured: false,
    description: "Woven in Okayama on vintage shuttle looms from compact long-staple cotton yarn. Features a single forward pleat, taped selvedge outseams, and a tapered hem.",
    editorialQuote: "“Heritage loom craftsmanship with a clean, contemporary taper.”",
    details: [
      "100% Japanese Selvedge Cotton (11.5 oz)",
      "Single forward pleat with coin pocket detail",
      "Custom brass hardware and corozo nut buttons",
      "Preshrunk via gentle wash treatment"
    ],
    fabricAndCare: [
      "Machine wash cold inside out with similar tones",
      "Hang dry in shade to preserve crisp dye richness"
    ],
    fitInfo: "Mid-rise, relaxed through thigh with a modern gentle taper. Model is 6'2\" wearing size M.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Ecru Cotton", hex: "#EDE8DD" },
      { name: "Deep Khaki", hex: "#8A7E68" },
      { name: "Washed Black", hex: "#2B2826" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 16
  },
  {
    id: "pep-009",
    name: "Organic Heavy Jersey Minimalist Tee",
    slug: "organic-heavy-jersey-minimalist-tee",
    category: "Essentials",
    subcategory: "T-Shirts",
    price: 75,
    tag: "Essential",
    isNewArrival: false,
    isFeatured: false,
    description: "The definitive luxury tee. Cut from heavyweight 260 GSM organic Aegean cotton that drapes cleanly without clinging. Seamless blind-stitched hem and a ribbed collar that maintains elasticity.",
    editorialQuote: "“Dense, structured organic cotton built to never lose its silhouette.”",
    details: [
      "100% Aegean Organic Combed Cotton (260 GSM)",
      "High-density rib collar with twin needle binding",
      "Blind-stitched sleeve cuffs and hem",
      "Enzyme-washed for ultra-smooth texture"
    ],
    fabricAndCare: [
      "Machine wash gentle at 30°C",
      "Tumble dry low or line dry"
    ],
    fitInfo: "Boxy, relaxed standard fit. True to size.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Chalk White", hex: "#F6F5F0" },
      { name: "Charcoal Ash", hex: "#2E2D2B" },
      { name: "Burgundy Earth", hex: "#6E2D3E" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 45
  },
  {
    id: "pep-010",
    name: "Sculpted Tailored Wool Blazer",
    slug: "sculpted-tailored-wool-blazer",
    category: "Women",
    subcategory: "Coats & Jackets",
    price: 340,
    originalPrice: 390,
    tag: "Tailoring",
    isNewArrival: false,
    isFeatured: true,
    description: "A softly sculpted single-breasted blazer featuring padded architectural shoulders, subtle hourglass waist shaping, and jet flap pockets. Fully lined in silky cupro.",
    editorialQuote: "“Sartorial rigor softened by feminine contouring.”",
    details: [
      "100% Fine Italian Wool Barathea",
      "100% Breathable Cupro lining",
      "Custom horn single-button front closure",
      "Interior breast pocket and dual back vents"
    ],
    fabricAndCare: [
      "Specialist dry clean only",
      "Hang on shaped coat hanger"
    ],
    fitInfo: "Tailored silhouette with accentuated waist. If between sizes, size up. Model wears size S.",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Midnight Charcoal", hex: "#1F1E1D" },
      { name: "Warm Bisque", hex: "#D5C8B8" },
      { name: "Muted Plum", hex: "#522538" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 8
  },
  {
    id: "pep-011",
    name: "Raw-Edge Brushed Cashmere Scarf",
    slug: "raw-edge-brushed-cashmere-scarf",
    category: "Essentials",
    subcategory: "Accessories",
    price: 135,
    tag: "Essential",
    isNewArrival: false,
    isFeatured: false,
    description: "Generously sized at 200cm x 70cm, this cloud-soft wrap is crafted from pure brushed cashmere with delicate hand-fringed hems. Drapes effortlessly over tailored outerwear or evening wear.",
    editorialQuote: "“Weightless warmth you will reach for daily.”",
    details: [
      "100% Pure Himalayan Cashmere",
      "Delicate hand-twisted eyelash fringe (1cm)",
      "Dimensions: 200 cm x 70 cm / 78.7\" x 27.5\"",
      "Brushed surface for enhanced thermal insulation"
    ],
    fabricAndCare: [
      "Dry clean or delicate hand wash cold",
      "Dry flat, gentle iron on low"
    ],
    fitInfo: "Universal drape size. Suitable for all genders.",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Oatmeal Camel", hex: "#CABAA6" },
      { name: "Muted Burgundy", hex: "#6E2D3E" },
      { name: "Slate Heather", hex: "#4A4D52" }
    ],
    sizes: ["One Size"],
    inStock: true,
    stockCount: 25
  },
  {
    id: "pep-012",
    name: "Architectural Leather Tote",
    slug: "architectural-leather-tote",
    category: "Essentials",
    subcategory: "Bags & Leather",
    price: 360,
    tag: "Full Grain",
    isNewArrival: true,
    isFeatured: true,
    description: "Sculpted from vegetable-tanned full-grain Italian calfskin with seamless unlined interior. Holds a 15-inch laptop and daily essentials, equipped with a detachable zip organizer pouch.",
    editorialQuote: "“Pristine geometric lines engineered for daily functional luxury.”",
    details: [
      "100% Full-grain vegetable-tanned Italian calf leather",
      "Hand-painted beveled edges and brass hardware",
      "Magnetic top bridge closure",
      "Interior lanyard with zip leather folio pouch",
      "Reinforced structured base with protective brass studs"
    ],
    fabricAndCare: [
      "Treat occasionally with natural leather balm",
      "Wipe clean with a soft dry microfiber cloth",
      "Avoid prolonged exposure to moisture and direct sunlight"
    ],
    fitInfo: "Measures 38cm (W) x 32cm (H) x 14cm (D). Handle drop 24cm.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Cognac Tan", hex: "#9E643C" },
      { name: "Burgundy Wine", hex: "#5C2030" },
      { name: "Deep Espresso", hex: "#221C19" }
    ],
    sizes: ["One Size"],
    inStock: true,
    stockCount: 15
  },
  {
    id: "pep-013",
    name: "Fluid Silk Organza Resort Shirt",
    slug: "fluid-silk-organza-resort-shirt",
    category: "Women",
    subcategory: "Shirts & Tops",
    price: 220,
    tag: "Limited Run",
    isNewArrival: false,
    isFeatured: false,
    description: "Semi-sheer silk organza cut with an easy Cuban camp collar and vented side seams. Wear layered over fine knit tops or bare skin for subtle textural depth.",
    editorialQuote: "“Ethereal transparency grounded in crisp tailoring.”",
    details: [
      "100% Mulberry Silk Organza",
      "Camp collar with loop button closure",
      "French seams throughout",
      "Genuine river shell buttons"
    ],
    fabricAndCare: [
      "Eco dry clean or delicate cold hand wash",
      "Do not tumble dry, warm iron under cloth"
    ],
    fitInfo: "Relaxed fluid drape. Model is 5'10\" wearing size S.",
    images: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Alabaster White", hex: "#F5F3EC" },
      { name: "Smoky Quartz", hex: "#5A544F" }
    ],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockCount: 12
  },
  {
    id: "pep-014",
    name: "Japanese Technical Wool Track Trouser",
    slug: "japanese-technical-wool-track-trouser",
    category: "Men",
    subcategory: "Pants & Trousers",
    price: 190,
    tag: "Performance",
    isNewArrival: false,
    isFeatured: false,
    description: "Merging bespoke sartorial wool with subtle sportswear mechanics. Cut with an elasticated drawcord waist, zip ankles, and water-repellent micro-houndstooth weave.",
    editorialQuote: "“The comfort of activewear in pure high-twist wool.”",
    details: [
      "90% High-Twist Wool, 8% Polyamide, 2% Elastane",
      "Concealed internal cotton drawcord",
      "RiRi zippered ankle gussets",
      "Wrinkle-resistant travel fabric"
    ],
    fabricAndCare: [
      "Dry clean or cold machine wash on wool cycle",
      "Dry flat"
    ],
    fitInfo: "Mid-rise, tapered ankle profile. Model is 6'1\" wearing size M.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85"
    ],
    colors: [
      { name: "Graphite Melange", hex: "#3A3938" },
      { name: "Deep Olive", hex: "#3D4236" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 17
  }
];
