
interface MostReadArticle {
  id: string | number;
  title: string;
}

const MostRead = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch most-read news");
  }

  const data = await res.json();
  const news: MostReadArticle[] = data.data ?? [];

  return (
    <aside className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Heading */}
      <div className="mb-5 border-b-2 border-red-600 pb-3">
        <h2 className="text-2xl font-bold text-gray-900">
          সর্বাধিক পঠিত
        </h2>
      </div>

      {/* News List */}
      <div className="divide-y divide-gray-100">
        {news.map((n, i) => (
          <article
            key={n.id}
            className="group flex items-start gap-4 py-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold text-gray-500 transition group-hover:bg-red-600 group-hover:text-white">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="pt-1 text-base font-semibold leading-7 text-gray-800 transition group-hover:text-red-600">
              {n.title}
            </h3>
          </article>
        ))}

        {news.length === 0 && (
          <p className="py-5 text-center text-gray-500">
            কোনো সংবাদ পাওয়া যায়নি।
          </p>
        )}
      </div>
    </aside>
  );
};

export default MostRead;
