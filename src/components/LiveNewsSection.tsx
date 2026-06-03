import { fetchAllMarketNews, fetchFilteredMarketNews, SOURCE_COLORS, RSSArticle, FEEDS } from '@/lib/fetchRSS';
import { SAMPLE_NEWS } from '@/data/news';

function ArticleRow({ article }: { article: RSSArticle }) {
  const colorClass = SOURCE_COLORS[article.source] || 'bg-gray-100 text-gray-600';
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-3 px-3 transition">
        {article.image && (
          <img src={article.image} alt={article.title} className="w-20 h-14 object-cover rounded flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-[13px] font-semibold text-gray-800 group-hover:text-[#c0392b] leading-snug transition line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorClass}`}>
              {article.sourceLogo} {article.source}
            </span>
            {article.timeAgo && (
              <>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-[10px] text-gray-400">{article.timeAgo}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

function SourceBar({ articles }: { articles: RSSArticle[] }) {
  const active = new Set(articles.map((a) => a.source));
  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-100">
      {FEEDS.map((f) => (
        <span
          key={f.source}
          title={active.has(f.source) ? 'Live' : 'Not available'}
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 ${
            active.has(f.source) ? f.color : 'bg-gray-100 text-gray-300 line-through'
          }`}
        >
          {active.has(f.source) ? '●' : '○'} {f.source}
        </span>
      ))}
    </div>
  );
}

export default async function LiveNewsSection({
  limit = 8,
  showSourceBar = false,
  filtered = false,
}: {
  limit?: number;
  showSourceBar?: boolean;
  filtered?: boolean;
}) {
  const articles = filtered
    ? await fetchFilteredMarketNews(limit)
    : await fetchAllMarketNews(limit);

  return (
    <div>
      {showSourceBar && <SourceBar articles={articles} />}
      {articles.length > 0 ? (
        articles.map((a) => <ArticleRow key={a.id} article={a} />)
      ) : (
        SAMPLE_NEWS.slice(0, limit).map((item) => (
          <div key={item.id} className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0">
            {item.image && (
              <img src={item.image} alt={item.title} className="w-20 h-14 object-cover rounded flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#c0392b]">{item.category}</span>
                <span className="text-[10px] text-gray-400">• {item.time}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
