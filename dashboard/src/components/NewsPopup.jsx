import React, { useEffect, useState } from "react";

export default function NewsPopup() {
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 20000);
    const popupInterval = setInterval(() => setOpen(true), 60000);

    return () => {
      clearInterval(interval);
      clearInterval(popupInterval);
    };
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/news`);
      setNews(await res.json());
    } catch (e) {}
  };

  if (!open) return null;

  return (
    <div className="
      fixed bottom-4 right-4 w-80 max-h-[350px]
      bg-[#111] text-white border border-[#222]
      rounded-xl shadow-xl animate-fadeIn z-50
    ">
      <div className="flex justify-between items-center p-3 border-b border-[#1f1f1f]">
        <h3 className="text-md font-semibold">Market News</h3>
        <button className="text-gray-400 hover:text-gray-200" onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="p-3 overflow-y-auto max-h-[300px] space-y-3">
        {news.slice(0, 10).map((item, i) => (
          <div
            key={i}
            className={`
              p-3 rounded-md text-sm border border-transparent hover:border-[#333]
              ${
                item.type === "market"
                ? "bg-yellow-900/10 text-yellow-400"
                : item.type === "sector"
                ? "bg-blue-900/10 text-blue-400"
                : "bg-green-900/10 text-green-400"
              }
            `}
          >
            <div className="text-xs text-gray-500 mb-1">
              {new Date(item.time).toLocaleTimeString()}
            </div>

            {item.type === "market" && <div>{item.headline}</div>}
            {item.type === "sector" && <div><strong>{item.sector}</strong>: {item.headline}</div>}
            {item.type === "stock" && <div><strong>{item.symbol}</strong>: {item.headline}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
