'use client';

import Link from 'next/link';
import { SAMPLE_NEWS } from '@/data/news';
import type { NewsItem } from '@/data/news';

export type { NewsItem };
export { SAMPLE_NEWS };

const TAG_COLORS: Record<string, string> = {
  BREAKING: 'bg-red-100 text-red-700',
  POLICY: 'bg-blue-100 text-blue-700',
  RESULTS: 'bg-green-100 text-green-700',
  COMMODITIES: 'bg-yellow-100 text-yellow-700',
};

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.id}`} className="block group">
      <article className="news-row">
        <div className="flex gap-3">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-14 object-cover rounded flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            {item.tag && (
              <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mr-1 mb-1 ${TAG_COLORS[item.tag] || 'bg-gray-100 text-gray-600'}`}>
                {item.tag}
              </span>
            )}
            <h3 className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c0392b] leading-snug transition line-clamp-2">
              {item.title}
            </h3>
            <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{item.summary}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-[#c0392b] font-medium">{item.category}</span>
              <span className="text-[10px] text-gray-400">•</span>
              <span className="text-[10px] text-gray-400">{item.time}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function NewsSection({ limit = 6 }: { limit?: number }) {
  const news = SAMPLE_NEWS.slice(0, limit);
  return (
    <div>
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
