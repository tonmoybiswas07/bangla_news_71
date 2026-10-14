"use cache"
import Image from "next/image";
import Link from "next/link";

interface ArticleBlock {
  type: "text" | "image" | "subheading";
  text?: string;
  url?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface NewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  text?: string;
  source?: string;
  sourceUrl?: string;
  link?: string;
  firstPublished?: string;
  lastPublished?: string;
  tags?: string[];
  body?: ArticleBlock[];
}

async function getNews(id: string): Promise<NewsArticle | null> {
  try {
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`);

    if (!res.ok) return null;

    const result = await res.json();
    return result.data ?? null;
  } catch {
    return null;
  }
}

function formatDate(date?: string) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ detailsId: string }>;
}) => {
  const { detailsId } = await params;
  const news = await getNews(detailsId);

  if (!news) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">News Not Found</h1>
          <p className="mt-3 text-gray-500">
            The article could not be loaded. Please try again.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = news.firstPublished || news.lastPublished;

  return (
    <main className="min-h-screen bg-[#f6f7f9] pb-16">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-red-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">News Details</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          {/* Main Article */}
          <article className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-8 md:p-10">
              {/* Tags */}
              <div className="mb-5 flex flex-wrap gap-2">
                {(news.tags ?? []).slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
                {news.title}
              </h1>

              {/* Article Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-gray-100 pb-6 text-sm text-gray-500">
                <span className="font-bold text-red-600">
                  {news.source || "News"}
                </span>

                <span className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {formatDate(publishedDate)}
                </span>
              </div>
            </div>

            {/* Hero Image */}
            {news.imageUrl && (
              <figure className="px-5 sm:px-8 md:px-10">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 900px"
                    className="object-cover"
                  />
                </div>
              </figure>
            )}

            {/* Article Content */}
            <div className="px-5 py-8 sm:px-8 md:px-10 md:py-10">
              <div className="mb-8 border-l-4 border-red-500 pl-4">
                <p className="text-lg font-medium leading-8 text-gray-700">
                  {news.text?.split("\n").filter(Boolean)[0] ?? news.title}
                </p>
              </div>

              <div className="space-y-7">
                {news.body?.length
                  ? news.body.map((block, index) => {
                      if (block.type === "image" && block.url) {
                        return (
                          <figure key={index} className="space-y-3">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                              <Image
                                src={block.url}
                                alt={block.caption || news.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 900px"
                                className="object-cover"
                              />
                            </div>

                            {block.caption && (
                              <figcaption className="text-sm leading-6 text-gray-500">
                                {block.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }

                      if (block.type === "subheading" && block.text) {
                        return (
                          <h2
                            key={index}
                            className="border-b border-gray-200 pb-3 pt-3 text-2xl font-bold leading-snug text-gray-900"
                          >
                            {block.text}
                          </h2>
                        );
                      }

                      if (block.type === "text" && block.text) {
                        return (
                          <p
                            key={index}
                            className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9"
                          >
                            {block.text}
                          </p>
                        );
                      }

                      return null;
                    })
                  : (news.text ?? "")
                      .split("\n")
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base leading-8 text-gray-700 sm:text-lg sm:leading-9"
                        >
                          {paragraph}
                        </p>
                      ))}
              </div>

              {/* Footer */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  Source: {news.source || "News"}
                </p>

                {(news.sourceUrl || news.link) && (
                  <a
                    href={news.sourceUrl || news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-red-600 transition hover:text-red-700"
                  >
                    Read original article
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                About This Story
              </span>

              <h2 className="mt-3 text-xl font-bold text-gray-900">
                Article Information
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Publisher
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {news.source || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Published
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {formatDate(publishedDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Categories
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {(news.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-gray-900 p-6 text-white">
              <span className="text-sm font-semibold text-red-400">
                Stay Informed
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-snug">
                Read the full story. Understand the context.
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Explore the original report for more details and updates from
                the publisher.
              </p>

              {(news.sourceUrl || news.link) && (
                <a
                  href={news.sourceUrl || news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold transition hover:bg-red-700"
                >
                  Visit Publisher ↗
                </a>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
