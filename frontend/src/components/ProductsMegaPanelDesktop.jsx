import React, { useEffect } from "react";
import ProductsContent from "./ProductsContent";

function ProductsMegaPanelDesktop({ isOpen, onClose }) {
  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl bg-white rounded-xl shadow-2xl border p-8 transition-all duration-200 z-[60]
      ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
      top-[95px]`} // 75px navbar height + top-5 (20px) = 95px
      role="dialog"
      aria-modal="false"
      aria-label="Products menu"
    >
      {/* header row (optional close) */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">Products</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-xl leading-none"
          aria-label="Close products panel"
        >
          ×
        </button>
      </div>

      <ProductsContent />
    </div>
  );
}

export default ProductsMegaPanelDesktop;
