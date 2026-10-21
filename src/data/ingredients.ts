import { Ingredient } from '@/types/product';

export const ingredients: Ingredient[] = [
  {
    id: 'cacao-beans',
    name: 'Single-Origin Cacao Beans',
    description:
      'Sourced from small agroforestry farms in Ecuador, Madagascar, and Peru. Each origin tells its own story through flavor.',
    origin: 'Ecuador, Madagascar, Peru',
    characteristics: ['Fruity', 'Complex', 'Earthy', 'Floral'],
    meshType: 'sphere',
    image: '/images/curated/ingredients/cacao-beans.jpg?v=cacao-v2',
  },
  {
    id: 'cacao-butter',
    name: 'Pure Cacao Butter',
    description:
      'Extracted through cold-press to preserve delicate aromatics. The pure foundation of silky texture.',
    origin: 'Esmeraldas, Ecuador',
    characteristics: ['Smooth', 'Rich', 'Aromatic'],
    meshType: 'cylinder',
    image: '/images/curated/ingredients/cacao-butter.jpg?v=cacao-v2',
  },
  {
    id: 'vanilla',
    name: 'Tahitian Vanilla',
    description:
      'Hand-pollinated vanilla orchids from Tahiti. Fruity, floral, and impossibly fragrant.',
    origin: 'Tahiti, French Polynesia',
    characteristics: ['Floral', 'Fruity', 'Sweet', 'Complex'],
    meshType: 'cylinder',
    image: '/images/curated/ingredients/vanilla.jpg?v=cacao-v2',
  },
  {
    id: 'sea-salt',
    name: 'Fleur de Sel',
    description:
      'Hand-harvested sea salt from Guérande. Mineral-rich crystals that amplify every dark note.',
    origin: 'Guérande, France',
    characteristics: ['Mineral', 'Bright', 'Crystalline'],
    meshType: 'box',
    image: '/images/curated/ingredients/sea-salt.jpg?v=cacao-v2',
  },
  {
    id: 'hazelnuts',
    name: 'Piedmont Hazelnuts',
    description:
      'Tonda Gentile variety from Italy. Sweet, buttery, and intensely aromatic when slowly roasted.',
    origin: 'Piedmont, Italy',
    characteristics: ['Buttery', 'Nutty', 'Sweet', 'Toasted'],
    meshType: 'sphere',
    image: '/images/curated/ingredients/hazelnuts.jpg?v=cacao-v2',
  },
  {
    id: 'gold',
    name: 'Edible Gold Leaf',
    description:
      '23-karat hand-beaten edible gold leaf. Pure luxury in its most elemental and lustrous form.',
    origin: 'Certified European Atelier',
    characteristics: ['Lustrous', 'Pure', 'Elegant'],
    meshType: 'box',
    image: '/images/curated/ingredients/gold.jpg?v=cacao-v2',
  },
];
