// src/components/FiltersPanel.jsx
export default function FiltersPanel() {
  return (
    <aside className="panel filters" aria-label="Filter panel">
      <div className="body">
        <h2>Filters</h2>

        <div className="group">
          <label className="stat">Search Good</label>
          <div className="search" style={{ marginTop: "6px" }}>
            <input
              id="search"
              type="text"
              placeholder="e.g., Rice, Sardines, Sugar…"
            />
            <button className="btn" id="clearSearch" title="Clear search">
              Clear
            </button>
          </div>
        </div>

        <div className="group">
          <div className="flex between">
            <label className="stat">Regions</label>
            <button className="btn toggle" id="regionsAll">
              All
            </button>
          </div>
          <div id="regionChips" className="chips" aria-label="Regions">
            {/* Region chips go here */}
          </div>
        </div>

        <div className="group">
          <div className="flex between">
            <label className="stat">Trade Channels</label>
            <button className="btn toggle" id="channelsAll">
              All
            </button>
          </div>
          <div id="channelChips" className="chips" aria-label="Trade channels">
            {/* Channel chips go here */}
          </div>
        </div>

        <div className="legend" style={{ marginTop: "12px" }}>
          <span className="lg">
            <span className="dot g"></span> ≤ SRP
          </span>
          <span className="lg">
            <span className="dot y"></span> Yellow: above SRP
          </span>
          <span className="lg">
            <span className="dot r"></span> Red: significantly above SRP
          </span>
        </div>
      </div>
    </aside>
  );
}
