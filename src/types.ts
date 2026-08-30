export type Category = 'All' | 'Women' | 'Men' | 'Essentials' | 'Outerwear' | 'Knitwear' | 'Tailoring';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size';

export interface ProductColor {
  name: string;
  hex: string;
  label?: string;
  imageIndex?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  subcategory: string;
  price: number;
  originalPrice?: number;
  tag?: string; // e.g. "New Arrival", "Bestseller", "Organic Cotton", "Limited Run"
  isNewArrival?: boolean;
  isFeatured?: boolean;
  featuredInLookbook?: boolean;
  rating?: number;
  reviewCount?: number;
  description: string;
  editorialQuote?: string;
  details: string[];
  fabricAndCare: string[];
  fitInfo: string;
  modelInfo?: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  inStock: boolean;
  stockCount?: number;
}

export interface CartItem {
  id: string; // unique item id based on product id + size + color
  productId: string;
  name: string;
  price: number;
  size: ProductSize;
  color: ProductColor;
  image: string;
  quantity: number;
  maxStock?: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  mood: string;
  image: string;
  photographerCredit: string;
  productIds: string[];
  hotspots?: {
    productId: string;
    top: number; // percentage (0-100)
    left: number; // percentage (0-100)
    title: string;
  }[];
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'name-asc';

export interface FilterState {
  category: Category;
  sizes: ProductSize[];
  colors: string[];
  priceRange: [number, number];
  sortBy: SortOption;
  onlyInStock: boolean;
  searchQuery: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'bag';
  title: string;
  message?: string;
  image?: string;
}

export type ActivePage = 'home' | 'shop' | 'product-detail' | 'lookbook' | 'story' | 'wishlist';
