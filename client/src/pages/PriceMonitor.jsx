import { useEffect, useState } from "react";
import { REGIONS, CHANNELS } from "../constants"
import "./PriceMonitor.css";

import Header from "../components/Header";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import KpiCards from "../components/dashboard/KpiCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import ChartPanel from "../components/dashboard/ChartPanel";
import SummaryTable from "../components/dashboard/SummaryTable";

function PriceMonitor() {
  const [filters, setFilters] = useState({
    search: "",
    regions: new Set(REGIONS),
    channels: new Set(CHANNELS),
  });
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [context, setContext] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    filters.regions.forEach((r) => params.append("regions", r));
    filters.channels.forEach((c) => params.append("channels", c));

    fetch(`/api/goods?${params.toString()}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching summary:", err));
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    filters.regions.forEach((r) => params.append("regions", r));
    filters.channels.forEach((c) => params.append("channels", c));

    fetch(`/api/goods/top-alerts?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.topAlerts || []);
        setContext(`${data.totalAbove} items above SRP in current view`);
      })
      .catch((err) => console.error("Error fetching top alerts:", err));
  }, [filters]);

  return (
    <>
      <Header />

      <main className="wrap main-layout">
        {/* TOP HALF */}
        <div className="top-half">
          <FiltersPanel filters={filters} setFilters={setFilters}/>

          <section className="right-content">
            <KpiCards />
            <AlertsPanel alerts={alerts} context={context}/>
            <ChartPanel rows={data}/>
          </section>
        </div>

        {/* BOTTOM HALF */}
        <div className="bottom-half">
          <SummaryTable rows={data}/>
        </div>
      </main>
    </>
  );
}

export default PriceMonitor;
