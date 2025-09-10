import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Html5Qrcode } from "html5-qrcode";
import { REGIONS, CHANNELS } from "../constants";
import "./UserEntry.css";
import { mockApi } from "../mockDb";
import Header from "../components/Header";

const PRODUCT_LOOKUP = {
  "49240290": "Soy Sauce",
  "49645422": "Soy Sauce",
};

export default function UserEntry() {
  const [goods, setGoods] = useState([]);
  const [scannedCode, setScannedCode] = useState("");
  const [productName, setProductName] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [price, setPrice] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    mockApi.getGoods().then((data) => {
      setGoods(data);
    });
  }, []);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameras(devices);
        if (devices.length > 0) {
          setSelectedCamera(devices[0].id);
        }
      })
      .catch((err) => console.error("Camera discovery error:", err));

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
        });
      }
    };
  }, []);

  const startScanner = async (cameraId) => {
    if (!scannerRef.current) return;

    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
      } catch (err) {}
    }

    const html5QrCode = new Html5Qrcode(scannerRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    html5QrCode
      .start(
        { deviceId: { exact: cameraId } },
        { fps: 10, qrbox: qrBoxSize },
        (decodedText) => {
          handleDecoded(decodedText);
        },
        (err) => console.warn("Scan error:", err)
      )
      .catch((err) => console.error("Start scanner error:", err));
  };

  const qrBoxSize = (viewfinderWidth, viewfinderHeight) => {
    return {
      width: Math.floor(viewfinderWidth * 0.7),
      height: Math.floor(viewfinderHeight * 0.7),
    };
  };

  const handleDecoded = (decodedText) => {
    console.log("called handledecoded");
    setScannedCode(decodedText);
    if (PRODUCT_LOOKUP[decodedText]) {
      setProductName(PRODUCT_LOOKUP[decodedText]);
    }
  };

  const handleCameraChange = (e) => {
    const camId = e.target.value;
    setSelectedCamera(camId);
    startScanner(camId);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const html5QrCode = new Html5Qrcode("reader"); 
      const result = await html5QrCode.scanFile(file, true);
      handleDecoded(result);
    } catch (err) {
      console.error("Image scan error:", err);
      alert("Could not read barcode from image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName) {
      alert("⚠️ Please enter a product name before submitting.");
      return;
    }

    if (!price) {
      alert("⚠️ Please enter the price.");
      return;
    }

    const productData = {
      barcode: scannedCode,
      name: productName,
      region,
      channel,
      actual: Number(price),
    };

    // clear fields
    setScannedCode("");
    setProductName("");
    setPrice("");

    console.log("Submitted:", productData);
     try {
      await mockApi.addPriceEntry(productName, region, channel, Number(price));
      toast.success("✅ Product entry saved successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("❌ Failed to submit: " + err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="entry-container">
        <div className="entry-layout">
          {/* Left: Scanner / Upload */}
          <div className="scanner-section">
            <div id="reader" ref={scannerRef} style={{ width: "100%", minHeight: "240px" }}></div>

            {/* Camera select */}
            {cameras.length > 1 && (
              <select value={selectedCamera || ""} onChange={handleCameraChange}>
                {cameras.map((cam) => (
                  <option key={cam.id} value={cam.id}>
                    {cam.label || `Camera ${cam.id}`}
                  </option>
                ))}
              </select>
            )}

            <p style={{ alignContent: screenLeft, fontSize: "0.8rem", paddingTop: 5}}>or upload an image: </p>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {scannedCode && (
              <p style={{ marginTop: "10px", color: "#1faa87", textAlign: "center" }}>
                ✅ Scanned Code
              </p>
            )}
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-group">
              <label>Product Name:</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              >
                <option value="">-- Select a product --</option>
                {goods.map((g) => (
                  <option key={g._id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Region:</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Channel:</label>
              <select value={channel} onChange={(e) => setChannel(e.target.value)}>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Price Bought For (₱):</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val >= 0 || val === "") setPrice(val);
                }}
                min="0"
                step="0.01"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Product
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", padding: "20px" }}>
          Scan live or upload an image, then enter product details.
        </p>
      </div>
    </div>
  );
}
