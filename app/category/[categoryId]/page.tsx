import NewsCard from "@/app/components/NewsCard/NewsCard";

interface News{
    id: string | number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  lastPublished: string;
}

const CategoryPage = async ({ params }:{params:{categoryId:string}}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );
  const data = await res.json();
  const categoryNews:News[] = data.data;

  return (
    <div className="container mx-auto">
      <div className="font-bold text-2xl border-b-2 border-red-600">
        <h1>{data.title}</h1>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-5">
        {categoryNews.map((article) => (
          <NewsCard key={article.id} sec={article} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
