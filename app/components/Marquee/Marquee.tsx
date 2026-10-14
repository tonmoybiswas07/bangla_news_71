"use cache"
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export const dynamic = "force-dynamic";

interface Headline {
  id: string | number;
  title: string;
}

const getHeadlines = async (): Promise<Headline[]> => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch headlines");
  }

  const data = await res.json();

  return data.data;
};

const Marquee = async () => {
  const headLines = await getHeadlines();

  return (
    <div className="bg-red-800">
      <div className="container mx-auto flex items-center text-white">
        <div className="shrink-0 bg-red-900 px-5 py-3 font-bold">
          সর্বশেষ
        </div>

        <div className="min-w-0 flex-1 overflow-hidden py-3">
          <MarqueeText direction="right" duration={10}>
            {headLines.map((headline) => (
              <Link
                href={`/newsdetails/${headline.id}`}
                key={headline.id}
                className="inline-block hover:text-yellow-300"
              >
                {headline.title}
                <span className="px-5">●</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;