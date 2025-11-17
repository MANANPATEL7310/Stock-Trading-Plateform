import { Routes, Route } from "react-router-dom";
import SupportAccordion from "../components/SupportAccordion";
import SupportHome from "./SupportHome";
import SupportSection from "./SupportSection";
import SupportArticle from "./SupportArticle";
import OpenAccount from "../../../components/OpenAccount";

export default function SupportLayout() {
  return (
    <div className=" max-w-7xl mx-auto py-10 ">

     <SupportHome />

<div className="flex gap-8 mt-10">
      {/* LEFT: Accordion Sidebar */}
      <SupportAccordion />

      {/* RIGHT: Dynamic Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<OpenAccount/>}/>
          <Route path="/section/:sectionSlug" element={<SupportSection />} />
          <Route
            path="/section/:sectionSlug/article/:articleSlug"
            element={<SupportArticle />}
          />
        </Routes>
      </div>
</div>
    </div>
  );
}
