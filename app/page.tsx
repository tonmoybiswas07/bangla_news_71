
import MainNews from "./components/MainNews/MainNews";
import Marquee from "./components/Marquee/Marquee";



export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data[0];
  const articles = sections.articles;
  console.log(articles);
  return (
    <div>
      <Marquee />
      <div className="grid grid-cols-3 container mx-auto gap-5 py-10">
        {/* main news */}
        <div className="col-span-2">
          <MainNews articles={articles} />
        </div>
        {/* most read news */}
        <div className="col-span-1 bg-green-500 py-10"></div>
      </div>
    </div>
  );
}
