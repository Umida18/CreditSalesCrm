import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home/home";
import Zone from "./components/zone";
import Collector from "./components/collector/collector";
import CollectorMoney from "./components/collector/collectorsTable";
import Workplace from "./components/workplace/workplace";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route path="/collector" element={<Collector />} />
        <Route path="/collectorMoney" element={<CollectorMoney />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/workplace" element={<Workplace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
