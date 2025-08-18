import { useEffect, useState } from "react";
import "./PriceMonitor.css";
import Header from "../components/Header";

function PriceMonitor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/prices")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h1>Price Monitoring Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Price</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.updatedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PriceMonitor;
