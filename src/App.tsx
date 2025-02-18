import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home/home";
import Zone from "./components/zone";
import Collector from "./components/collector/collector";
import CollectorMoney from "./components/collector/collectorsTable";
import Workplace from "./components/workplace/workplace";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collector" element={<Collector />} />
        <Route path="/collectorMoney" element={<CollectorMoney />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/workplace" element={<Workplace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
