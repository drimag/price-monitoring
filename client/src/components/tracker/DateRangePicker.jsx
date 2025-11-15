import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./GroupFilters.css";

function DataRangePicker() {
  const [mode, setMode] = useState("live"); // "live" or "custom"
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <div className="label-row" style={{paddingBottom: "0.4rem"}}>
        <label className="stat">Data Range</label>
      </div>

      <div className="toggle-row" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div className="chips-row">
        <label className={`chip ${mode === "live" ? "active" : ""}`} onClick={() => setMode("live")}>
            Live (Past 30 days)
        </label>
        <label className={`chip ${mode === "custom" ? "active" : ""}`} onClick={() => setMode("custom")}>
            Custom
        </label>
        </div>
      </div>

      {mode === "custom" && (
        <div style={{ marginTop: "0.5rem" }}>
          <DatePicker
            className="datepicker-input"
            calendarClassName="datepicker-calendar"
            popperClassName="datepicker-popper"
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
