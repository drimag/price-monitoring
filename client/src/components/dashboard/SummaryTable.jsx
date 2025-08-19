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
                <th>Good</th>
                <th>Category</th>
                <th>Region</th>
                <th>Trade Channel</th>
                <th>SRP</th>
                <th>Actual Price</th>
                <th>Difference</th>
                <th>% Difference</th>
                <th>Status</th>
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
