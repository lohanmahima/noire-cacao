export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  cocoaPercentage?: number;
  tastingNotes: string[];
  origin: string;
  ingredients: string[];
  color: string;
  type: 'dark' | 'praline' | 'caramel' | 'white';
  image?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  origin: string;
  characteristics: string[];
  meshType: 'sphere' | 'box' | 'cylinder' | 'torus';
  image?: string;
}

export interface JournalPost {
  id: string;
  title: string;
  category: string;
  date: string;
  formattedDate?: string;
  excerpt: string;
  imageGradient: string;
  image?: string;
}

export interface GiftSlot {
  index: number;
  product: Product | null;
}
