import { useEffect, useState } from "react";
import { REGIONS, CHANNELS, GROUPINGS } from "../constants"
import "./PriceTracker.css";
import { mockApi } from "../mockDb";

import Header from "../components/Header";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import KpiCards from "../components/dashboard/KpiCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import ChartPanel from "../components/dashboard/ChartPanel";
import SummaryTable from "../components/dashboard/SummaryTable";
import GroupFilters from "../components/GroupFilters";

function PriceTracker() {
  const [filters, setFilters] = useState({
    search: "",
    regions: new Set(REGIONS),
    channels: new Set(CHANNELS),
    groupBy: new Set(GROUPINGS)
  });
  const [data, setData] = useState([]);
  const [groupings, setGroupings] = useState("all");

  useEffect(() => {
    mockApi.getGoods().then((allGoods) => {
      let allRows = allGoods.flatMap((good) => aggregateGood(good, groupings));

      if (filters.search) {
        const term = filters.search.toLowerCase();
        allRows = allRows.filter((row) =>
          row.name.toLowerCase().includes(term)
        );
      }
      if (filters.regions && filters.regions.size > 0 && groupings != "channel" && groupings != "all") {
        allRows = allRows.filter((row) => filters.regions.has(row.region));
      }
      if (filters.channels && filters.channels.size > 0 && groupings != "region" && groupings != "all") {
        allRows = allRows.filter((row) => filters.channels.has(row.channel));
      }

      setData(allRows);

      const aboveSRP = allRows.filter((i) => i.pct > 0).sort((a, b) => b.pct - a.pct);
      const topAlerts = allRows.slice(0, 5).map((item, idx) => ({ rank: idx + 1, ...item }));
      setAlerts(topAlerts);
      setContext(`${aboveSRP.length} items above SRP in current view`);
    });
  }, [filters]);

  return (
    <>
      <Header />
      <main className="wrap main-layout">
        <GroupFilters filters={filters} setFilters={setFilters}/>
        <SummaryTable rows={data}/>
      </main>
    </>
  );
}

function aggregateGood(good, groupBy = "region-channel") {
  const groups = new Map();

  good.priceEntries.forEach((entry) => {
    let key;

    switch (groupBy) {
      case "all":
        key = "all"; // all entries grouped together
        break;
      case "region":
        key = entry.region;
        break;
      case "channel":
        key = entry.channel;
        break;
      case "region-channel":
      default:
        key = `${entry.region}-${entry.channel}`;
        break;
    }

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
  groups.forEach((g, key) => {
    const avgActual = g.sum / g.count;
    const diff = avgActual - good.srp;
    const pct = (diff / good.srp) * 100;

    const minDiffPCT = ((g.min - good.srp) / good.srp) * 100;
    const maxDiffPCT = ((g.max - good.srp) / good.srp) * 100;

    results.push({
      groupKey: key, // helpful for identifying what group this row represents
      name: good.name,
      brand: good.brand,
      category: good.category,
      region: groupBy === "channel" || groupBy === "all" ? "Nationwide" : g.region,
      channel: groupBy === "region" || groupBy === "all" ? "All Channels" : g.channel,
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

export default PriceTracker;