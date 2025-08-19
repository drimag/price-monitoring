import { useEffect, useState } from "react";
import "./SummaryTable.css";

export default function SummaryTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/summary") // adjust to your backend route
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const renderStatus = (pct) => {
    if (pct <= 0) return <span className="badge b-green">≤ SRP</span>;
    if (pct > 0 && pct <= 10) return <span className="badge b-yellow">Above SRP</span>;
    return <span className="badge b-red">Significantly Above SRP</span>;
  };

  return (
    <div className="panel">
      <div className="body">
        <div className="flex between" style={{ marginBottom: "8px" }}>
          <h2>Main Summary View</h2>
          <div className="stat">Click column headers to sort</div>
        </div>
        <div className="table-wrap">
          <table id="summary">
            <thead>
              <tr>
                <th className="sortable" data-key="good">Good <span className="caret">▾</span></th>
                <th className="sortable" data-key="category">Category <span className="caret">▾</span></th>
                <th className="sortable" data-key="region">Region <span className="caret">▾</span></th>
                <th className="sortable" data-key="channel">Trade Channel <span className="caret">▾</span></th>
                <th className="sortable" data-key="srp" data-type="num">SRP <span className="caret">▾</span></th>
                <th className="sortable" data-key="actual" data-type="num">Actual Price <span className="caret">▾</span></th>
                <th className="sortable" data-key="diff" data-type="num">Difference <span className="caret">▾</span></th>
                <th className="sortable" data-key="pct" data-type="num">% Difference <span className="caret">▾</span></th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                    Loading...
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.good}</td>
                    <td>{row.category}</td>
                    <td>{row.region}</td>
                    <td>{row.channel}</td>
                    <td>{row.srp}</td>
                    <td>{row.actual}</td>
                    <td>{row.diff}</td>
                    <td>{row.pct}%</td>
                    <td>{renderStatus(row.pct)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
