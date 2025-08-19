import { useEffect, useState } from "react";
import "./PriceMonitor.css";

import Header from "../components/dashboard/Header";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import KpiCards from "../components/dashboard/KpiCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import ChartPanel from "../components/dashboard/ChartPanel";
import SummaryTable from "../components/dashboard/SummaryTable";

function PriceMonitor() {
  return (
    <>
      <Header />

      <main className="wrap main-layout">
        {/* TOP HALF */}
        <div className="top-half">
          <FiltersPanel />

          <section className="right-content">
            <KpiCards />
            <AlertsPanel />
            <ChartPanel />
          </section>
        </div>

        {/* BOTTOM HALF */}
        <div className="bottom-half">
          <SummaryTable />
        </div>
      </main>
    </>
  );
}

export default PriceMonitor;
