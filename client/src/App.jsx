import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PriceMonitor from "./pages/PriceMonitor";
import UserProfile from "./pages/UserProfile";
import UserEntry from "./pages/UserEntry";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PriceMonitor />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/entry" element={<UserEntry />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
