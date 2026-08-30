import { LookbookItem } from '../types';

export const LOOKBOOKS: LookbookItem[] = [
  {
    id: "look-01",
    title: "Look 01: The Modern Atelier",
    subtitle: "Fluid drape meets architectural wool tailoring",
    mood: "Refined Day-to-Evening",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1400&q=85",
    photographerCredit: "Shot at Mercer Studio by Julian Vance",
    productIds: ["pep-001", "pep-003", "pep-002"],
    hotspots: [
      { productId: "pep-001", top: 32, left: 45, title: "Architectural Wool Trench" },
      { productId: "pep-003", top: 48, left: 52, title: "Cashmere Mockneck" },
      { productId: "pep-002", top: 78, left: 48, title: "Wide-Leg Atelier Trouser" }
    ]
  },
  {
    id: "look-02",
    title: "Look 02: Sartorial Ease",
    subtitle: "Oversized proportions with tactile Scottish merino",
    mood: "Effortless Menswear",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1400&q=85",
    photographerCredit: "Shot at Palais Royal by Clara Morel",
    productIds: ["pep-005", "pep-006", "pep-008"],
    hotspots: [
      { productId: "pep-005", top: 38, left: 50, title: "Cashmere Blend Overcoat" },
      { productId: "pep-006", top: 52, left: 46, title: "Relaxed Merino Crew" },
      { productId: "pep-008", top: 80, left: 54, title: "Selvedge Chino" }
    ]
  },
  {
    id: "look-03",
    title: "Look 03: Liquid Evening",
    subtitle: "Heavyweight 22mm Mulberry silk twill cut on the true bias",
    mood: "Sensual Minimalism",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
    photographerCredit: "Shot at Villa Noailles by Mateo Cruz",
    productIds: ["pep-007", "pep-011", "pep-012"],
    hotspots: [
      { productId: "pep-007", top: 45, left: 48, title: "Silk Twill Column Dress" },
      { productId: "pep-011", top: 30, left: 60, title: "Brushed Cashmere Scarf" },
      { productId: "pep-012", top: 70, left: 68, title: "Architectural Leather Tote" }
    ]
  }
];
