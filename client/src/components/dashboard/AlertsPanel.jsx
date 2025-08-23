import "./AlertsPanel.css";
export default function AlertsPanel({ alerts, context }) {
  return (
    <div className="panel">
      <div className="body">
        <div className="flex between">
          <h2>Top Alerts (Above SRP, by %)</h2>
          <div className="stat" id="alertContext"></div>
        </div>
        <div id="topAlerts" className="top-alerts">
          {alerts.map((d, i) => (
            <div className="alert-row" key={d.good + d.region + d.channel}>
              <div className="flex" style={{ gap: "12px" }}>
                <div className="badge b-red">#{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{d.good}</div>
                  <div className="stat">
                    {d.region} • {d.channel}
                  </div>
                </div>
              </div>
              <div className="kpi">
                {d.pct.toFixed(2)}% ({d.diff >= 0 ? `+₱${d.diff}` : d.diff})
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
