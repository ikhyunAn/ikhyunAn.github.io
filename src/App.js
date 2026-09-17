import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Publications from "./pages/Publications";
import Teaching from "./pages/Teaching";

const App = () => (
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="publications" element={<Publications />} />
        <Route path="teaching" element={<Teaching />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="All-Projects" element={<Navigate replace to="/portfolio" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
