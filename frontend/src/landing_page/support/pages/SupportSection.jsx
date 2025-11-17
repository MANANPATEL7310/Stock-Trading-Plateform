import { useParams, Link } from "react-router-dom";
import supportData from "../data/supportData";

export default function SupportSection() {
  const { sectionSlug } = useParams();
  const section = supportData.find(s => s.slug === sectionSlug);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{section.title}</h1>

      {section.items.map(item => (
        <div key={item.slug} className="mb-6">
          <h2 className="font-semibold mb-2">{item.title}</h2>

          {item.articles.map(article => (
            <Link
              key={article.slug}
              to={`/support/section/${section.slug}/article/${article.slug}`}
              className="block text-blue-600 mb-1"
            >
              {article.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
