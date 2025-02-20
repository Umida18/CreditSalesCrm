import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home/home";
import Zone from "./components/zone";
import Collector from "./components/collector/collector";
import Workplace from "./components/workplace/workplace";
import { ToastContainer } from "react-toastify";
import CollectorLoginPage from "./pages/collectorLogin";
import UsersPage from "./components/dashboard/userPage";
import DashboardCollector from "./components/dashboardCollector/dashboardCollector";
import UsersCollec from "./components/dashboardCollector/usersCallector";
import StatisticsContent from "./components/dashboardCollector/statistic";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/collector" element={<Collector />} /> */}
        <Route path="/collector" element={<Collector />} />
        <Route path="/collectorLogin" element={<CollectorLoginPage />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/collectorDashboard" element={<DashboardCollector />} />
        <Route path="/workplace" element={<Workplace />} />
        <Route path="/statistic" element={<StatisticsContent />} />
        <Route path="/users/:id" element={<UsersPage />} />
        <Route path="/usersCollector/:id" element={<UsersCollec />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
