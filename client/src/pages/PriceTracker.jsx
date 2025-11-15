import { useEffect, useState } from "react";
import { REGIONS, CHANNELS, AGGREGATIONLEVELS } from "../constants"
import "./PriceTracker.css";
import { mockApi } from "../mockDb";

import Header from "../components/Header";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import KpiCards from "../components/dashboard/KpiCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import ChartPanel from "../components/dashboard/ChartPanel";
import SummaryTable from "../components/dashboard/SummaryTable";
import GroupFilters from "../components/tracker/GroupFilters";

function PriceTracker() {
  const [filters, setFilters] = useState({
    search: "",
    regions: new Set(REGIONS),
    channels: new Set(CHANNELS),
    aggregationLevels: new Set(AGGREGATIONLEVELS)
  });
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    mockApi.getGoods().then((allGoods) => {
      let allRows = allGoods.flatMap((good) => aggregateGood(good, filters.aggregationLevels));
      console.log(allRows);
      if (filters.search) {
        const term = filters.search.toLowerCase();
        allRows = allRows.filter((row) =>
          row.name.toLowerCase().includes(term)
        );
      }
      if (filters.regions && filters.regions.size > 0 && filters.aggregationLevels.has("Region")) { // ADD AGGREGATION LEVEL FILTERS
        allRows = allRows.filter((row) => filters.regions.has(row.region));
      }
      if (filters.channels && filters.channels.size > 0 && filters.aggregationLevels.has("Channel")) {
        allRows = allRows.filter((row) => filters.channels.has(row.channel));
      }

      setData(allRows);
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

function aggregateGood(good, aggregationLevels) {
  const groups = new Map();

  good.priceEntries.forEach((entry) => {
    let key;

    const hasRegion = aggregationLevels.has("Region");
    const hasChannel = aggregationLevels.has("Channel");

    if (hasRegion && hasChannel) {
      key = `${entry.region}-${entry.channel}`;
    } else if (hasRegion && !hasChannel) {
      key = entry.region;
    } else if (hasChannel && !hasRegion) {
      key = entry.channel;
    } else {
      key = "all";
    }

    console.log("current key: " + key);

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
      region: !aggregationLevels.has("Region") ? "Nationwide" : g.region, // need to rework based on definition
      channel: !aggregationLevels.has("Channel") ? "All Channels" : g.channel,
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