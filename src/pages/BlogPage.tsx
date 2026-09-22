import React from 'react';
import { Sparkles, Calendar, ArrowRight, Clock, User, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const articles = [
    {
      id: '1',
      title: 'The Patina Journey: Why Full-Grain Vegetable-Tanned Leather Improves With Time',
      excerpt: 'Unlike synthetic PU leathers that degrade, vegetable-tanned bovine hides absorb organic oils from your hands and sunlight, darkening into a rich, lustrous amber sheen unique to its owner.',
      author: 'Master Tanner Tariq',
      date: 'May 14, 2025',
      category: 'Leather Craft',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'The Tradition of Heat Debossing: From Victorian Bookbinding to Modern Jafferjees Heirlooms',
      excerpt: 'Discover the chemistry and mechanics behind 130°C movable brass type, 22K genuine gold leaf foil, and how personal monograms transform leather pieces into enduring family treasures.',
      author: 'Multan Atelier Team',
      date: 'April 28, 2025',
      category: 'Bespoke Atelier',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Caring for Fine Leather Goods in Multan’s Warm Climate: A Preservation Guide',
      excerpt: 'Practical advice on conditioning frequency, beeswax nourishment, breathable dust bag storage, and protecting full-grain briefcases against dry summer heat in South Punjab.',
      author: 'S. Jafferjee',
      date: 'March 19, 2025',
      category: 'Leather Care',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Sharif Complex Gulgasht • Multan
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#19100B]">
          The Jafferjees Leather Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C]">
          Dispatches on master leathercraft, patina evolution, hot-stamping history, and heirloom care from our Multan atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="group bg-white rounded-lg border border-[#EAE3D9] overflow-hidden hover:border-[#8C522F] transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#8C522F]">
                  <span className="font-bold uppercase tracking-wider">{art.category}</span>
                  <span className="text-stone-400">{art.date}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#19100B] group-hover:text-[#8C522F] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#7A6B5C] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-stone-400" />
                {art.author}
              </span>

              <button
                onClick={() => onNavigate('shop')}
                className="text-[#8C522F] font-bold flex items-center gap-1 group-hover:underline"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
