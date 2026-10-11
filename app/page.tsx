import { Suspense } from "react";

import MainNews from "./components/MainNews/MainNews";
import Marquee from "./components/Marquee/Marquee";
import MostRead from "./components/MostRead/MostRead";
import NewsCard from "./components/NewsCard/NewsCard";

async function HomeNews() {
const res = await fetch(
"https://news-api-v2.vercel.app/api/news/sections"
);

if (!res.ok) {
throw new Error("Failed to fetch news sections");
}

const data = await res.json();

const sections = data.data ?? [];
const mainSection = sections[0];
const articles = mainSection?.articles ?? [];
const otherSections = sections.slice(1);

return ( 
<div className="container mx-auto grid grid-cols-1 gap-5 py-10 px-4 lg:grid-cols-3">
{/* Main News */} 
<div className="space-y-10 lg:col-span-2">
   <MainNews articles={articles} />


    {/* Other News Sections */}
    {otherSections.map((section) => (
      <section key={section.curationId}>
        <h2 className="border-b-2 border-red-600 py-5 text-2xl font-bold">
          {section.title}
        </h2>

        <div className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-3">
          {(section.articles ?? []).map((article) => (
            <NewsCard key={article.id} sec={article} />
          ))}
        </div>
      </section>
    ))}
  </div>

  {/* Most Read News */}
  <aside className="lg:col-span-1">
    <MostRead />
  </aside>
</div>


);
}

export default function Home() {
return ( <div> <Marquee />



  <Suspense
    fallback={
      <div className="container mx-auto px-4 py-10">
        <p>খবর লোড হচ্ছে...</p>
      </div>
    }
  >
    <HomeNews />
  </Suspense>
</div>


);
}
