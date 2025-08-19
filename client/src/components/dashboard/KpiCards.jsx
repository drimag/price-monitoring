import "./KpiCards.css";

export default function KpiCards() {
  return (
    <div className="cards">
      <div className="card">
        <div className="stat">Goods Monitored</div>
        <div id="kpiGoods" className="value kpi">0</div>
      </div>
      <div className="card">
        <div className="stat">Avg % vs SRP</div>
        <div id="kpiAvgPct" className="value kpi">0.00%</div>
      </div>
      <div className="card">
        <div className="stat">At/Below SRP</div>
        <div id="kpiGreen" className="value kpi">0</div>
      </div>
      <div className="card">
        <div className="stat">Above SRP (Red)</div>
        <div id="kpiRed" className="value kpi">0</div>
      </div>
    </div>
  );
}
