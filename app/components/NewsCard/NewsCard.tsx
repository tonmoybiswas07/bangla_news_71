
import Image from "next/image";

interface Article {
  id: string | number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  lastPublished: string;
}

interface NewsCardProps {
  sec: Article;
}

const NewsCard = ({ sec }: NewsCardProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* News Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={sec.imageUrl}
          alt={sec.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* News Details */}
      <div className="p-5">
        <span className="mb-3 inline-block rounded-md bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
          {sec.category}
        </span>

        <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-red-600">
          {sec.title}
        </h3>

        <p className="mb-5 line-clamp-3 text-sm leading-7 text-gray-600">
          {sec.description}
        </p>

        {/* Published Date */}
        <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5 shrink-0"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7v5l3 2"
            />
          </svg>

          <time>{sec.lastPublished}</time>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
