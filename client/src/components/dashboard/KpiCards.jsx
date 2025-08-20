import { useEffect, useState } from "react";
import "./KpiCards.css";

export default function KpiCards() {

  const [kpis, setKpis] = useState({
    totalGoods: 0,
    avgPct: 0,
    atOrBelowSRP: 0,
    aboveSRP: 0,
  });

  useEffect(() => {
    fetch("/api/summary/kpi")
      .then((res) => res.json())
      .then((data) => setKpis(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  return (
    <div className="cards">
      <div className="card">
        <div className="stat">Goods Monitored</div>
        <div id="kpiGoods" className="value kpi">{kpis.totalGoods}</div>
      </div>
      <div className="card">
        <div className="stat">Avg % vs SRP</div>
        <div id="kpiAvgPct" className="value kpi">{kpis.avgPct.toFixed(2)}%</div>
      </div>
      <div className="card">
        <div className="stat">At/Below SRP</div>
        <div id="kpiGreen" className="value kpi">{kpis.atOrBelowSRP}</div>
      </div>
      <div className="card">
        <div className="stat">Above SRP (Red)</div>
        <div id="kpiRed" className="value kpi">{kpis.aboveSRP}</div>
      </div>
    </div>
  );
}
