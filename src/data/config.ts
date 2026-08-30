export interface StoreConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  campaignHeadline: string;
  currency: {
    symbol: string;
    code: string;
  };
  freeShippingThreshold: number;
  promotions: {
    id: string;
    text: string;
    code?: string;
    highlight?: string;
  }[];
  contact: {
    email: string;
    phone: string;
    studioAddress: string;
    hours: string;
  };
  promoCodes: Record<string, { discountPercent: number; description: string; minSubtotal?: number }>;
  socials: { name: string; url: string }[];
}

export const STORE_CONFIG: StoreConfig = {
  brandName: "PEPLAB",
  tagline: "Wear Your Everyday Extraordinary",
  subTagline: "Mindfully constructed garments marrying architectural lines with effortless fluidity.",
  campaignHeadline: "Made to Move With You.",
  currency: {
    symbol: "$",
    code: "USD"
  },
  freeShippingThreshold: 150,
  promotions: [
    {
      id: "promo-1",
      text: "Complimentary global shipping on orders over $150",
      highlight: "Free Shipping"
    },
    {
      id: "promo-2",
      text: "New Season Collection | Receive 10% off with code",
      code: "EXTRAORDINARY10",
      highlight: "10% OFF"
    },
    {
      id: "promo-3",
      text: "Crafted in limited batch runs using certified organic fibers",
      highlight: "Sustainable Craft"
    }
  ],
  contact: {
    email: "concierge@peplab.studio",
    phone: "+1 (800) 737-5221",
    studioAddress: "482 Mercer Street, Soho, New York, NY 10013",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM EST"
  },
  promoCodes: {
    "EXTRAORDINARY10": {
      discountPercent: 10,
      description: "10% off entire order"
    },
    "WELCOME15": {
      discountPercent: 15,
      description: "15% off first wardrobe order",
      minSubtotal: 100
    },
    "PEPVIP": {
      discountPercent: 20,
      description: "VIP Private Access — 20% off"
    }
  },
  socials: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Pinterest", url: "https://pinterest.com" },
    { name: "Editorial Journal", url: "#story" }
  ]
};
