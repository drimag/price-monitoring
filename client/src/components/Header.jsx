import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="wrap header-inner">
        <div className="title">
          <h1>Price Monitoring</h1>
        </div>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/entry">Entries</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/tracker">Tracker</Link>
        </nav>
      </div>
      
    </header>
  );
}
