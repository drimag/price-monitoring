import { useEffect, useState } from "react";
import "./KpiCards.css";

import { mockApi } from "../../mockDb";
export default function KpiCards() {

  const [kpis, setKpis] = useState({
    totalGoods: 0,
    avgPct: 0,
    atOrBelowSRP: 0,
    aboveSRP: 0,
  });

  useEffect(() => {
    mockApi.getGoods().then((allGoods) => {

    const perGoodStats = allGoods.map((good) => {
      if (!good.priceEntries || good.priceEntries.length === 0) {
        return { name: good.name, avgPct: 0 };
      }

      // average actual across all entries for this good
      const avgActual =
        good.priceEntries.reduce((sum, e) => sum + e.actual, 0) /
        good.priceEntries.length;

      // % diff from SRP
      const avgPct = ((avgActual - good.srp) / good.srp) * 100;

      return { name: good.name, avgPct };
    });

    const totalGoods = perGoodStats.length;

    // overall average: average of per-good % diffs
    const avgPct =
      totalGoods > 0
        ? perGoodStats.reduce((sum, g) => sum + g.avgPct, 0) / totalGoods
        : 0;

    // goods at or below SRP
    const atOrBelowSRP = perGoodStats.filter((g) => g.avgPct <= 0).length;

    // goods above SRP
    const aboveSRP = perGoodStats.filter((g) => g.avgPct > 0).length;

      setKpis({
        totalGoods,
        avgPct,
        atOrBelowSRP,
        aboveSRP
      })
    });
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

function aggregateGood(good) {
  const groups = new Map();
  console.log("aggregating: " + good);
  good.priceEntries.forEach((entry) => {
    const key = `${entry.region}-${entry.channel}`;
    if (!groups.has(key)) {
      groups.set(key, {
        region: entry.region,
        channel: entry.channel,
        sum: 0,
        count: 0,
        min: entry.actual,
        max: entry.actual,
      });
    }
    const g = groups.get(key);
    g.sum += entry.actual;
    g.count++;
    g.min = Math.min(g.min, entry.actual);
    g.max = Math.max(g.max, entry.actual);
  });

  const results = [];
  groups.forEach((g) => {
    const avgActual = g.sum / g.count;
    const diff = avgActual - good.srp;
    const pct = (diff / good.srp) * 100;

    const minDiffPCT = ((g.min - avgActual) / avgActual) * 100;
    const maxDiffPCT = ((g.max - avgActual) / avgActual) * 100;

    results.push({
      name: good.name,
      category: good.category,
      region: g.region,
      channel: g.channel,
      srp: good.srp,
      actual: avgActual,
      diff,
      pct,
      minPrice: g.min,
      maxPrice: g.max,
      minDiffPCT,
      maxDiffPCT,
    });
  });

  return results;
}