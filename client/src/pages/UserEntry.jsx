import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const REGIONS = [
  "North Luzon",
  "South Luzon",
  "Metro Manila",
  "Eastern Visayas",
  "Western Visayas",
  "Northern Mindanao",
  "Southern Mindanao",
];

const CHANNELS = ["Supermarket", "Convenience Store", "Wet Market"];

// Mock product lookup table (barcode → product)
const PRODUCT_LOOKUP = {
  "123456789012": "Rice",
  "987654321098": "Sugar",
  "111222333444": "Sardines",
};

export default function UserEntry() {
  const [scannedCode, setScannedCode] = useState("");
  const [productName, setProductName] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        setScannedCode(decodedText);
        if (PRODUCT_LOOKUP[decodedText]) {
          setProductName(PRODUCT_LOOKUP[decodedText]);
        }
      },
      (errorMessage) => {
        console.warn("Scan error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear error:", err));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      barcode: scannedCode,
      name: productName,
      region,
      channel,
      price,
    };
    console.log("Submitted:", productData);
    alert("Product submitted:\n" + JSON.stringify(productData, null, 2));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Product Data Entry</h2>
      <p>Scan a barcode or manually enter product details below.</p>

      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>

      {scannedCode && (
        <p style={{ marginTop: "10px", color: "#1faa87" }}>
          ✅ Scanned Code: {scannedCode}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Channel:</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            {CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price Bought For (₱):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            background: "#1faa87",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
