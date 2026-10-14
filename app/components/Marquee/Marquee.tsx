import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
export const instant = false;

interface Headline {
  id: string;
  title: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  const headLines: Headline[] = data.data;
  return (
    <div className="flex bg-red-800">
      <div className="  text-white flex items-center container mx-auto">
        <div className="bg-red-900 text-white py-3 px-5">সর্বশেষ</div>
        <MarqueeText direction="right" duration={10}>
          {headLines.map((headline) => (
            <Link href={`/newsdetails/${headline.id}`} key={headline.id}>
              {headline.title}
              <span className="px-5">●</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
