import { useState } from "react";
import { REGIONS, CHANNELS } from "../../constants"
import "./FiltersPanel.css";

const searchTerm = "";

export default function FiltersPanel({ filters, setFilters }) {
  const toggleRegion = (region) => {
    const newRegions = new Set(filters.regions);
    if (newRegions.has(region)) {
      newRegions.delete(region);
    } else {
      newRegions.add(region);
    }
    setFilters({ ...filters, regions: newRegions });
  };

  const toggleChannel = (channel) => {
    const newChannels = new Set(filters.channels);
    if (newChannels.has(channel)) {
      newChannels.delete(channel);
    } else {
      newChannels.add(channel);
    }
    setFilters({ ...filters, channels: newChannels });
  };

  return (
    <aside className="panel filters" aria-label="Filter panel">
      <div className="body">
        <h2>Filters</h2>

        {/* Search */}
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

        {/* Regions */}
        <div className="group">
          <div className="flex between">
            <label className="stat">Regions</label>
            <button
              className="btn toggle"
              onClick={() => setFilters({ ...filters, regions: new Set(REGIONS) })}
            >
              All
            </button>
          </div>
          <div className="chips" aria-label="Regions">
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
        <div className="group">
          <div className="flex between">
            <label className="stat">Trade Channels</label>
            <button
              className="btn toggle"
              onClick={() => setFilters({ ...filters, channels: new Set(CHANNELS) })}
            >
              All
            </button>
          </div>
          <div className="chips" aria-label="Trade channels">
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

        {/* Legend */}
        <div className="legend" style={{ marginTop: "12px" }}>
          <span className="lg"><span className="dot g"></span> ≤ SRP</span>
          <span className="lg"><span className="dot y"></span> Yellow: above SRP</span>
          <span className="lg"><span className="dot r"></span> Red: significantly above SRP</span>
        </div>
      </div>
    </aside>
  );
}
