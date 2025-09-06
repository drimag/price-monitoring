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
          <a href="/">Dashboard</a>
          <a href="/admin">Admin</a>
          <a href="/entry">Entries</a>
          <a href="/profile">Profile</a>
        </nav>
      </div>
      
    </header>
  );
}
