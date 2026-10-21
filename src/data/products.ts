import { Product } from '@/types/product';
import { assetPath } from '@/utils/assetPath';

export const products: Product[] = [
  {
    id: 'obsidian-72',
    name: 'Obsidian 72%',
    tagline: 'The Purist',
    description:
      'Single-origin Ecuadorian cacao with notes of wild berries, tobacco leaf, and a whisper of sea salt. A meditation in darkness.',
    price: 18,
    cocoaPercentage: 72,
    tastingNotes: ['Wild Berries', 'Tobacco Leaf', 'Sea Salt', 'Dark Cherry'],
    origin: 'Esmeraldas, Ecuador',
    ingredients: ['Cacao beans', 'Organic cane sugar', 'Cacao butter', 'Sea salt'],
    color: '#1A0A05',
    type: 'dark',
    image: assetPath('/images/curated/products/obsidian-72.jpg?v=cacao-v2'),
  },
  {
    id: 'golden-praline',
    name: 'Golden Praline',
    tagline: 'The Indulgent',
    description:
      'Hazelnut praline enrobed in 64% dark chocolate with flakes of edible gold. Decadence, refined.',
    price: 16,
    cocoaPercentage: 64,
    tastingNotes: ['Roasted Hazelnut', 'Caramelized Sugar', 'Dark Chocolate', 'Butter'],
    origin: 'Piedmont, Italy (Hazelnuts)',
    ingredients: ['Cacao beans', 'Hazelnuts', 'Sugar', 'Butter', 'Edible gold', 'Sea salt'],
    color: '#8B6914',
    type: 'praline',
    image: assetPath('/images/curated/products/golden-praline.jpg?v=cacao-v2'),
  },
  {
    id: 'velvet-caramel',
    name: 'Velvet Caramel',
    tagline: 'The Classic',
    description:
      'Slow-cooked salted caramel wrapped in 58% milk chocolate. Rich, smooth, timeless.',
    price: 14,
    cocoaPercentage: 58,
    tastingNotes: ['Burnt Sugar', 'Cream', 'Sea Salt', 'Vanilla'],
    origin: 'Madagascar',
    ingredients: ['Cacao beans', 'Milk', 'Sugar', 'Butter', 'Sea salt', 'Vanilla'],
    color: '#A0522D',
    type: 'caramel',
    image: assetPath('/images/curated/products/velvet-caramel.jpg?v=cacao-v2'),
  },
  {
    id: 'ivory-silk',
    name: 'Ivory Silk',
    tagline: 'The Delicate',
    description:
      'White chocolate infused with Tahitian vanilla and a hint of bergamot. Ethereal sweetness.',
    price: 12,
    tastingNotes: ['Tahitian Vanilla', 'Bergamot', 'Cream', 'Honey'],
    origin: 'Tahiti',
    ingredients: ['Cacao butter', 'Milk', 'Sugar', 'Vanilla', 'Bergamot oil'],
    color: '#F5EDD6',
    type: 'white',
    image: assetPath('/images/curated/products/ivory-silk.jpg?v=cacao-v2'),
  },
];
