"use cache";
import Link from "next/link";
export const instant = false;
interface NavProps {
  slug: string;
  title: string;
  topicId: null | string;
  url: string;
  scrapable: boolean;
}

const NavLink = async () => {
  const resdata = await fetch("https://news-api-v2.vercel.app/api/categories");

  if (!resdata.ok) {
    throw new Error("Failed to fetch news categories");
  }

  const data = await resdata.json();
  const navs: NavProps[] = data.data ?? [];

  const filteredNavs = navs.filter((nav) => nav.scrapable);

  return (
    <nav className="flex justify-center items-center gap-4 py-5">
      <Link href="/">হোম</Link>

      {filteredNavs.map((nav) => (
        <Link key={nav.slug} href={`/category/${nav.slug}`}>
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLink;
