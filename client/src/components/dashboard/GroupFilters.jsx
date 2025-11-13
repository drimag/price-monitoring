import { useEffect, useState } from "react";
import { REGIONS, CHANNELS, GROUPINGS } from "../../constants";
import "./GroupFilters.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function GroupFilters({ filters, setFilters }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    
    <aside aria-label="Filter panel">

      {/* Search */}
      <div className="search-section">
        <h2>Search Good</h2>
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
      


      <div className="filters-horizontal">
        {/* Group By */}
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
            <label className="stat"> Filter Regions</label>
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
            <label className="stat">Filter Trade Channels</label>
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

        <div>
          <label className="stat label-row">Data Range</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      </div>
    </aside>
  );
}
