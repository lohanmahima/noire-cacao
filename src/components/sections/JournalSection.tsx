'use client';

import { useState } from 'react';
import { journalPosts } from '@/data/journal';
import { X, BookOpen, Clock } from 'lucide-react';
import { assetPath } from '@/utils/assetPath';

export default function JournalSection() {
  const [activeArticle, setActiveArticle] = useState<typeof journalPosts[0] | null>(null);

  const fullArticles: Record<string, string[]> = {
    'art-of-tempering': [
      'Tempering is the silent choreography of heat, kinetic motion, and time. In raw cacao butter, triglyceride fatty acids can crystallize into six distinct polymorphic structures — designated Form I through Form VI.',
      'Only Form V (the beta crystal) yields that clean acoustic snap, deep mirror gloss, and silky melting point at precisely 34°C (human body temperature). Missing the temperature curve by a fraction of a single degree yields dull bloom and a sandy mouthfeel.',
      'In our Paris atelier, every batch is rested upon chilled Italian marble, gently agitated with offset spatulas, and brought to temperature with infrared monitoring. It is a slow, meditative discipline where science dissolves into pure craft.',
    ],
    'journey-to-esmeraldas': [
      'In the coastal rainforests of Esmeraldas, Ecuador, morning mists drift through dense canopies of cedar, wild banana, and ancient Nacional cacao trees.',
      'Unlike modern industrial hybrid varieties bred solely for disease yield, pure Nacional trees produce smaller, deeply ribbed pods in shades of amethyst and saffron. The pulp surrounding the seeds smells of lychee, honeysuckle, and tropical rain.',
      'We work directly with a cooperative of fourteen families who have tended these same tree groves for five generations. Regenerative agroforestry ensures that the soil remains alive with microbial diversity, which in turn feeds the complex berry and tobacco terpenes of the cacao.',
    ],
    'flavor-wheel': [
      'When you bite into a mass-market chocolate bar, the immediate assault is sugar and vanilla essence — additives designed to mask defective, over-roasted cacao beans.',
      'A true grand cru chocolate needs no flavoring agents. When you allow a square of Obsidian 72% to rest upon your tongue without chewing, the sequence of aromas unfolds like a musical suite.',
      'First comes high-acid red fruit — wild blackberry and tart dried cherry. As the butter melts, earthier notes emerge: warm leather, cured tobacco leaf, roasted hazelnut, and finally a delicate, clean saline finish.',
    ],
    'philosophy': [
      'We obsess over details invisible to most. The angle of a temper curve. The ambient humidity of our stone conching chamber. The thickness of our gold leaf by fractions of a micron.',
      'In an era dominated by hyper-speed efficiency and artificial shortcuts, Noiré Cacao is an act of deliberate resistance. We believe that true luxury is patience made tangible.',
      'Every bar that leaves our atelier carries the fingerprints of artisans who care deeply about the legacy of cacao. This obsession is not madness — it is devotion.',
    ],
  };

  return (
    <section id="journal" className="py-32 px-6 bg-[#FAF7F2]/88 backdrop-blur-[1px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            Editorial & Reflections
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            The Journal
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Stories from the canopy. Field notes from our stone conching laboratory.
            The philosophy of unhurried perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journalPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group relative overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500 bg-white p-6 md:p-8 cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              {/* Real Photography Header */}
              <div className="w-full h-56 mb-6 overflow-hidden relative border border-[var(--color-border-subtle)] bg-[#EDE5D8]">
                <img
                  src={post.image || assetPath('/images/journal/tempering.jpg')}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-[var(--color-cocoa)] font-mono text-[10px] uppercase tracking-wider font-semibold shadow-sm">
                  {post.category}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[var(--color-text-light)] mb-3">
                  <span className="text-[#5C4C42] font-semibold">{post.formattedDate || post.date}</span>
                  <span className="flex items-center gap-1 text-[#8C6228] font-bold">
                    <Clock size={12} /> 4 min read
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif text-[#1A0F0A] mb-3 group-hover:text-[#8C6228] transition-colors duration-300 font-semibold">
                  {post.title}
                </h3>

                <p className="text-sm text-[#2D2018] leading-relaxed mb-6 font-normal line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C9A84C]/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[#5C4C42]">
                  Atelier Dispatch
                </span>
                <span className="uppercase tracking-wider text-[#8C6228] group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1.5 font-bold">
                  Read Essay →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-[#1A0F0A]/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="max-w-2xl w-full bg-white border border-[var(--color-gold)]/60 p-8 md:p-12 max-h-[90vh] overflow-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-8 h-8 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-cocoa)] hover:bg-[#FAF7F2]"
              aria-label="Close article"
            >
              <X size={18} />
            </button>

            <div className="w-full h-64 mb-6 overflow-hidden border border-[var(--color-border)] bg-[#EDE5D8]">
              <img
                src={activeArticle.image || assetPath('/images/journal/tempering.jpg')}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-gold)] mb-3 font-semibold">
              <BookOpen size={14} />
              <span>{activeArticle.category} • The Noiré Journal</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-cocoa)] mb-3 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="text-xs font-mono text-[var(--color-text-light)] mb-8 pb-4 border-b border-[var(--color-border-subtle)]">
              Published {activeArticle.formattedDate || activeArticle.date} • Atelier Noiré Dispatch
            </div>

            <div className="space-y-5 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed font-light">
              {(
                fullArticles[activeArticle.id] || [activeArticle.excerpt]
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex justify-between items-center">
              <span className="text-xs font-mono text-[var(--color-text-light)]">
                ✦ Noiré Cacao Editorial Archives
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-[var(--color-cocoa)] text-white hover:bg-[var(--color-gold)] transition-all text-xs uppercase tracking-wider font-mono font-medium shadow-sm"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
