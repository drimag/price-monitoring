import "./AlertsPanel.css";
export default function AlertsPanel() {
  return (
    <div className="panel">
      <div className="body">
        <div className="flex between">
          <h2>Top Alerts (Above SRP, by %)</h2>
          <div className="stat" id="alertContext"></div>
        </div>
        <div id="topAlerts" className="top-alerts">
          {/* Alerts go here */}
        </div>
      </div>
    </div>
  );
}
