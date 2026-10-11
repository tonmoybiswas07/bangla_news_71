import Image from "next/image";

interface Article {
  id: string | number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  lastPublished: string;
}

interface MainNewsProps {
  articles: Article[];
}

const MainNews = ({ articles }: MainNewsProps) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500">কোনো নিউজ পাওয়া যায়নি।</p>
      </div>
    );
  }

  const [firstArticle, ...otherArticles] = articles;

  return (
    <section className="container mx-auto px-4 py-8 md:px-6">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="border-l-4 border-red-600 pl-3 text-2xl font-bold text-gray-900 md:text-3xl">
          প্রধান খবর
        </h2>

        
      </div>

      {/* News Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* Featured News */}
        <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={firstArticle.imageUrl}
              alt={firstArticle.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="p-5 md:p-6">
            <span className="mb-3 inline-block rounded bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
              {firstArticle.category}
            </span>

            <h3 className="mb-4 text-2xl font-bold leading-snug text-gray-900 transition hover:text-red-600 md:text-3xl">
              {firstArticle.title}
            </h3>

            <p className="mb-5 text-base leading-7 text-gray-600">
              {firstArticle.description}
            </p>

            <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7v5l3 2"
                />
              </svg>

              <time>{firstArticle.lastPublished}</time>
            </div>
          </div>
        </article>

        {/* Other News */}
        <div className="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-100 bg-white px-5 shadow-sm">
          {otherArticles.slice(0, 4).map((article) => (
            <article
              key={article.id}
              className="group flex flex-col gap-4 py-5 sm:flex-row"
            >
              {/* News Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="mb-2 text-sm font-semibold text-red-600">
                  {article.category}
                </span>

                <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-red-600 md:text-xl">
                  {article.title}
                </h3>

                <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4 shrink-0"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7v5l3 2"
                    />
                  </svg>

                  <time>{article.lastPublished}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;
