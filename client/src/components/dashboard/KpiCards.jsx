import { useEffect, useState } from "react";
import "./KpiCards.css";

import { mockApi } from "../../mockDb";
export default function KpiCards({ rows }) {

  const [kpis, setKpis] = useState({
    totalGoods: 0,
    avgPct: 0,
    atOrBelowSRP: 0,
    aboveSRP: 0,
  });

  useEffect(() => {
    console.log("rows:", rows);

    if (!rows || rows.length === 0){
      setKpis({
        totalGoods: 0,
        avgPct: 0,
        atOrBelowSRP: 0,
        aboveSRP: 0,
      });
      return;
    } 

    // ✅ Group rows by product name
    const goodsMap = new Map();

    rows.forEach((row) => {
      if (!goodsMap.has(row.name)) {
        goodsMap.set(row.name, {
          name: row.name,
          srp: row.srp,
          priceEntries: [],
        });
      }
      goodsMap.get(row.name).priceEntries.push(row.actual);
    });

    console.log("Grouped goods:", Array.from(goodsMap.values()));

    // ✅ Compute stats per unique good
    const perGoodStats = Array.from(goodsMap.values()).map((good) => {
      if (good.priceEntries.length === 0) {
        return { name: good.name, avgPct: 0 };
      }
      const avgActual =
        good.priceEntries.reduce((sum, val) => sum + val, 0) /
        good.priceEntries.length;

      const avgPct = ((avgActual - good.srp) / good.srp) * 100;
      return { name: good.name, avgPct };
    });

    const totalGoods = perGoodStats.length;

    const avgPct =
      totalGoods > 0
        ? perGoodStats.reduce((sum, g) => sum + g.avgPct, 0) / totalGoods
        : 0;

    const atOrBelowSRP = perGoodStats.filter((g) => g.avgPct <= 0).length;
    const aboveSRP = perGoodStats.filter((g) => g.avgPct > 0).length;

    setKpis({
      totalGoods,
      avgPct,
      atOrBelowSRP,
      aboveSRP,
    });
  }, [rows]);

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