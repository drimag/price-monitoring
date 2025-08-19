import "./SummaryTable.css";

export default function SummaryTable() {
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
                <th class="sortable" data-key="good">Good <span class="caret">▾</span></th>
                <th class="sortable" data-key="category">Category <span class="caret">▾</span></th>
                <th class="sortable" data-key="region">Region <span class="caret">▾</span></th>
                <th class="sortable" data-key="channel">Trade Channel <span class="caret">▾</span></th>
                <th class="sortable" data-key="srp" data-type="num">SRP <span class="caret">▾</span></th>
                <th class="sortable" data-key="actual" data-type="num">Actual Price <span class="caret">▾</span></th>
                <th class="sortable" data-key="diff" data-type="num">Difference <span class="caret">▾</span></th>
                <th class="sortable" data-key="pct" data-type="num">% Difference <span class="caret">▾</span></th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows go here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
