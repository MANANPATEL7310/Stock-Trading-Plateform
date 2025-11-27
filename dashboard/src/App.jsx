import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
