import { REGIONS, CHANNELS, GROUPINGS } from "../../constants";
import "./GroupFilters.css";



export default function GroupFilters({ filters, setFilters }) {
  const GROUPINGS = ["Channel", "Region",];
  const toggleRegion = (region) => {
    const newRegions = new Set(filters.regions);
    newRegions.has(region) ? newRegions.delete(region) : newRegions.add(region);
    setFilters({ ...filters, regions: newRegions });
  };

  const toggleChannel = (channel) => {
    const newChannels = new Set(filters.channels);
    newChannels.has(channel) ? newChannels.delete(channel) : newChannels.add(channel);
    setFilters({ ...filters, channels: newChannels });
  };

  const handleGroupByChange = (e) => {
    setFilters({ ...filters, groupBy: e.target.value });
  };

  return (
    <aside className="filters-vertical" aria-label="Filter panel">

      {/* Search */}
      <div className="top">
        <div className="group">
          <label className="stat">Search Good</label>
          <div className="search" style={{ marginTop: "6px" }}>
            <input
              type="text"
              placeholder="e.g., Rice, Sardines, Sugar…"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <button
              className="btn"
              onClick={() => setFilters({ ...filters, search: "" })}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      

      {/* Group By */}
      <div className="filters-horizontal">
        <div className="filter-section">
          <div className="label-row">
            <label className="stat">Group By</label>
            <button
              className="btn toggle"
              onClick={() => setFilters({ ...filters, groupBy: new Set(REGIONS) })}
            >
              All
            </button>
          </div>
          <div className="chips-row">
            {GROUPINGS.map((r) => (
              <label
                key={r}
                className={`chip ${filters.groupBy.has(r) ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={filters.regions.has(r)}
                  onChange={() => toggleRegion(r)}
                />
                {r}
              </label>
            ))}
          </div>
      </div>

        {/* Regions */}
        <div className="filter-section">
          <div className="label-row">
            <label className="stat">Regions</label>
            <button
              className="btn toggle"
              onClick={() => setFilters({ ...filters, regions: new Set(REGIONS) })}
            >
              All
            </button>
          </div>
          <div className="chips-row">
            {REGIONS.map((r) => (
              <label
                key={r}
                className={`chip ${filters.regions.has(r) ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={filters.regions.has(r)}
                  onChange={() => toggleRegion(r)}
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="filter-section">
          <div className="label-row">
            <label className="stat">Trade Channels</label>
            <button
              className="btn toggle"
              onClick={() => setFilters({ ...filters, channels: new Set(CHANNELS) })}
            >
              All
            </button>
          </div>
          <div className="chips-row">
            {CHANNELS.map((c) => (
              <label
                key={c}
                className={`chip ${filters.channels.has(c) ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={filters.channels.has(c)}
                  onChange={() => toggleChannel(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      </div>
      

      {/* Legend */}
      <div className="filter-section legend">
        <span className="lg"><span className="dot g"></span> ≤ SRP</span>
        <span className="lg"><span className="dot y"></span> Slightly above SRP</span>
        <span className="lg"><span className="dot r"></span> Significantly above SRP</span>
      </div>
    </aside>
  );
}
