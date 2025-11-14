import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DataRangePicker() {
  const [mode, setMode] = useState("live"); // "live" or "manual"
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="filter-section">
      <label className="stat label-row">Data Range</label>

      <div className="toggle-row" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div className="chips-row">
        <label className={`chip ${mode === "live" ? "active" : ""}`} onClick={() => setMode("live")}>
            Live (Past 30 days)
        </label>
        <label className={`chip ${mode === "manual" ? "active" : ""}`} onClick={() => setMode("manual")}>
            Manual
        </label>
        </div>
      </div>

      {mode === "manual" && (
        <div style={{ marginTop: "0.5rem" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      )}
    </div>
  );
}

export default DataRangePicker;
