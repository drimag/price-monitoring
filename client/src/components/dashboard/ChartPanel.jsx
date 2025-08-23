import { useEffect, useRef, useState } from "react";
import {THRESH_RED, THRESH_YELLOW, REGIONS, CHANNELS} from "../../constants.js"
import "./ChartPanel.css";


export default function ChartPanel({ rows }) {

  const canvasRef = useRef(null);
  const [chartDim, setChartDim] = useState("region");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx) return;

    // clear canvas if no data
    if (!rows || rows.length === 0) {
      clearCanvas();
      ctx.fillStyle = "#9fb0de"; // muted text color
      ctx.font = "14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("No data available", canvas.width / 2, canvas.height / 2);
      return;
    }

    function computeChartData() {
      const groups = new Map();
      const keys = chartDim === "region" ? REGIONS : CHANNELS;
      keys.forEach((k) => groups.set(k, { sum: 0, n: 0 }));

      rows.forEach((d) => {
        const k = chartDim === "region" ? d.region : d.channel;
        const g = groups.get(k) || { sum: 0, n: 0 };
        g.sum += d.pct;
        g.n += 1;
        groups.set(k, g);
      });

      return keys.map((k) => ({
        key: k,
        avg: groups.get(k).n ? groups.get(k).sum / groups.get(k).n : 0,
      }));
    }

    function clearCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = 220 * dpr; // fixed height
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, canvas.height);
      return rect;
    }

    function drawChart() {
      const rect = clearCanvas();
      const data = computeChartData();

      const W = rect.width,
        H = canvas.height;
      const pad = 28;
      const baseY = H - pad;
      const topY = pad;
      const maxAbs = Math.max(5, ...data.map((d) => Math.abs(d.avg)));
      const barW = Math.max(20, (W - pad * 2) / (data.length * 1.5));
      const gap = barW * 0.5;

      ctx.strokeStyle = "#3a457a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, baseY);
      ctx.lineTo(W - pad, baseY);
      ctx.stroke();

      const yZero =
        baseY - ((0 - -maxAbs) / (maxAbs - -maxAbs)) * (baseY - topY);
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, yZero);
      ctx.lineTo(W - pad, yZero);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      data.forEach((d, i) => {
        const x = pad + i * (barW + gap) + gap;
        const yScale = (val) =>
          baseY - ((val - -maxAbs) / (2 * maxAbs)) * (baseY - topY);
        const y = yScale(Math.max(0, d.avg));
        const yNeg = yScale(Math.min(0, d.avg));
        const h = Math.abs(yNeg - y);

        let fill =
          d.avg <= 0
            ? "rgba(31,170,135,0.9)" // green
            : d.avg < THRESH_RED
            ? "rgba(230,184,0,0.9)" // yellow
            : "rgba(239,83,80,0.9)"; // red

        ctx.fillStyle = fill;
        ctx.fillRect(x, Math.min(y, yNeg), barW, h || 2);

        ctx.fillStyle = "#9fb0de";
        ctx.font = "10px system-ui, sans-serif";
        const label = d.key;
        ctx.fillText(label, x + barW / 2, baseY + 6);

        ctx.fillStyle = "#d7def2";
        ctx.font = "11px system-ui, sans-serif";
        ctx.fillText(
          (d.avg >= 0 ? "+" : "") + d.avg.toFixed(2) + "%",
          x + barW / 2,
          Math.min(y, yNeg) - 14
        );
      });
    }

    drawChart();
  }, [rows, chartDim]);

  return (
    <div className="panel">
      <div className="body">
        <div className="flex between" style={{ marginBottom: "8px" }}>
          <h2>Price Deviations (Average % above/below SRP)</h2>
          <div className="toolbar">
            <div className="seg" role="tablist" aria-label="Chart dimension">
              <button
                className={chartDim === "region" ? "active" : ""}
                onClick={() => setChartDim("region")}
                role="tab"
                aria-selected={chartDim === "region"}
              >
                By Region
              </button>
              <button
                className={chartDim === "channel" ? "active" : ""}
                onClick={() => setChartDim("channel")}
                role="tab"
                aria-selected={chartDim === "channel"}
              >
                By Trade Channel
              </button>
            </div>
          </div>
        </div>
        <canvas ref={canvasRef} height="220" style={{ width: "100%" }} />
      </div>
    </div>
  );
}
