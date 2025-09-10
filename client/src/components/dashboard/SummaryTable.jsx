import "./SummaryTable.css";
import {THRESH_RED, THRESH_YELLOW} from "../../constants.js"

export default function SummaryTable({ rows }) {
  function statusBadge(pct) {
    if (pct <= 0) {
      return <span className="badge b-green">At/Below SRP</span>;
    }
    if (pct < THRESH_RED && pct >= THRESH_YELLOW) {
      return <span className="badge b-yellow">Slightly Above</span>;
    }
    if (pct >= THRESH_RED) {
      return <span className="badge b-red">Significantly Above</span>;
    }
    return <span className="badge b-green">At/Below SRP</span>;
  }

  return (
    <div className="panel">
      <div className="body">
        <div className="flex between" style={{ marginBottom: "8px" }}>
          <h2>Main Summary View</h2>
        </div>
        <div className="table-wrap">
          <table id="summary">
            <thead>
              <tr>
                <th className="sortable" data-key="good">
                  Good 
                </th>
                <th className="sortable" data-key="category">
                  Category 
                </th>
                <th className="sortable" data-key="region">
                  Region 
                </th>
                <th className="sortable" data-key="channel">
                  Trade Channel 
                </th>
                <th className="sortable" data-key="srp" data-type="num">
                  SRP 
                </th>
                <th className="sortable" data-key="actual" data-type="num">
                  Average Price
                </th>
                <th className="sortable" data-key="diff" data-type="num">
                  Minimum Price 
                </th>
                <th className="sortable" data-key="pct" data-type="num">
                  Maximum Price
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.region}</td>
                    <td>{row.channel}</td>
                    <td>₱{row.srp}</td>
                    <td>
                      ₱{row.actual.toFixed(2)} (
                      {row.pct > 0 ? `+${row.pct.toFixed(2)}` : row.pct.toFixed(2)}%
                      )
                    </td>
                    <td>
                      ₱{row.minPrice} (
                      {row.minDiffPCT > 0 ? `+${row.minDiffPCT.toFixed(2)}` : row.minDiffPCT.toFixed(2)}%
                      )
                    </td>
                    <td>
                      ₱{row.maxPrice} (
                      {row.maxDiffPCT > 0 ? `+${row.maxDiffPCT.toFixed(2)}` : row.maxDiffPCT.toFixed(2)}%
                      )
                    </td>
                    <td>{statusBadge(row.pct)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
