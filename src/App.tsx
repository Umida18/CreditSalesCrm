import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home/home";
import Zone from "./components/zone";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/zone" element={<Zone />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
