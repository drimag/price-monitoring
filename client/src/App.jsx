import { HashRouter, Routes, Route } from "react-router-dom";
import PriceMonitor from "./pages/PriceMonitor";
import UserProfile from "./pages/UserProfile";
import UserEntry from "./pages/UserEntry";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PriceMonitor />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/entry" element={<UserEntry />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
