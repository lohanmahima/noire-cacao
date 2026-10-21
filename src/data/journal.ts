import { JournalPost } from '@/types/product';

export const journalPosts: JournalPost[] = [
  {
    id: 'art-of-tempering',
    title: 'The Art of Tempering',
    category: 'Technique',
    date: '2026-09-15',
    formattedDate: 'September 15, 2026',
    excerpt:
      'Tempering is the silent choreography of heat and time. Each degree matters. Each moment shapes the final snap, shine, and stability of the bar.',
    imageGradient: 'linear-gradient(135deg, #FAF7F2 0%, #EFE8DD 100%)',
    image: '/images/journal/tempering.jpg',
  },
  {
    id: 'journey-to-esmeraldas',
    title: 'Journey to Esmeraldas',
    category: 'Origin',
    date: '2026-08-22',
    formattedDate: 'August 22, 2026',
    excerpt:
      'In the coastal jungles of Ecuador, we walked among cacao trees heavy with purple pods. The farmers here have cultivated these trees for generations.',
    imageGradient: 'linear-gradient(135deg, #FAF7F2 0%, #EFE8DD 100%)',
    image: '/images/journal/esmeraldas.jpg',
  },
  {
    id: 'flavor-wheel',
    title: 'Building Your Flavor Vocabulary',
    category: 'Tasting',
    date: '2026-07-10',
    formattedDate: 'July 10, 2026',
    excerpt:
      'Tasting chocolate is an exploration. Notes of cherry, leather, tobacco — these are not additives but expressions of terroir, fermentation, and craft.',
    imageGradient: 'linear-gradient(135deg, #FAF7F2 0%, #EFE8DD 100%)',
    image: '/images/journal/flavor-wheel.jpg',
  },
  {
    id: 'philosophy',
    title: 'Our Philosophy',
    category: 'Craft',
    date: '2026-06-05',
    formattedDate: 'June 5, 2026',
    excerpt:
      'We obsess over details invisible to most. The angle of a temper curve. The humidity of a roast. This obsession is not madness — it is devotion.',
    imageGradient: 'linear-gradient(135deg, #FAF7F2 0%, #EFE8DD 100%)',
    image: '/images/journal/philosophy.jpg',
  },
];
