import { useParams } from "react-router-dom";
import supportData from "../data/supportData";

export default function SupportArticle() {
  const { sectionSlug, articleSlug } = useParams();

  const section = supportData.find(s => s.slug === sectionSlug);
  const topic = section.items.find(i => i.articles.some(a => a.slug === articleSlug));
  const article = topic.articles.find(a => a.slug === articleSlug);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {article.videoUrl && (
        <iframe
          width="100%"
          height="350"
          src={article.videoUrl}
          className="rounded-lg mb-6"
          allowFullScreen
        ></iframe>
      )}

      <p className="whitespace-pre-line text-gray-700">
        {article.content}
      </p>
    </div>
  );
}
