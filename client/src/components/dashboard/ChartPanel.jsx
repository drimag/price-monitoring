import "./ChartPanel.css";
export default function ChartPanel() {
  return (
    <div className="panel">
      <div className="body">
        <div className="flex between" style={{ marginBottom: "8px" }}>
          <h2>Price Deviations (Average % above/below SRP)</h2>
          <div className="toolbar">
            <div className="seg" role="tablist" aria-label="Chart dimension">
              <button
                id="tabRegion"
                className="active"
                role="tab"
                aria-selected="true"
              >
                By Region
              </button>
              <button id="tabChannel" role="tab" aria-selected="false">
                By Trade Channel
              </button>
            </div>
          </div>
        </div>
        {/* Placeholder until chart library is used */}
        <div
          id="barChart"
          style={{
            height: "220px",
            background: "#0c1229",
            borderRadius: "8px",
          }}
        >
          Chart placeholder
        </div>
      </div>
    </div>
  );
}
