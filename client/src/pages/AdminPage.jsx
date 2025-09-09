import { useState } from "react";
import Header from "../components/Header";
import "./AdminPage.css";

export default function AdminPage() {
  // Mock data for now
  const [goods, setGoods] = useState([
    {
      _id: "1",
      name: "Rice",
      category: "Grains",
      srp: 40,
      priceEntries: [
        { _id: "e1", region: "Metro Manila", channel: "Supermarket", actual: 45 },
        { _id: "e2", region: "South Luzon", channel: "Wet Market", actual: 42 },
      ],
    },
    {
      _id: "2",
      name: "Sugar",
      category: "Sweeteners",
      srp: 50,
      priceEntries: [
        { _id: "e3", region: "Metro Manila", channel: "Convenience Store", actual: 52 },
      ],
    },
  ]);

  // Add new good
  const addGood = () => {
    const newGood = {
      _id: Date.now().toString(),
      name: "New Good",
      category: "Uncategorized",
      srp: 0,
      priceEntries: [],
    };
    setGoods([...goods, newGood]);
  };

  // Delete good
  const deleteGood = (id) => {
    setGoods(goods.filter((g) => g._id !== id));
  };

  // Update good name/category/srp
  const updateGood = (id, field, value) => {
    setGoods(
      goods.map((g) =>
        g._id === id ? { ...g, [field]: value } : g
      )
    );
  };

  // Add entry to a good
  const addEntry = (goodId) => {
    setGoods(
      goods.map((g) =>
        g._id === goodId
          ? {
              ...g,
              priceEntries: [
                ...g.priceEntries,
                { _id: Date.now().toString(), region: "Region X", channel: "Channel Y", actual: 0 },
              ],
            }
          : g
      )
    );
  };

  // Delete entry
  const deleteEntry = (goodId, entryId) => {
    setGoods(
      goods.map((g) =>
        g._id === goodId
          ? { ...g, priceEntries: g.priceEntries.filter((e) => e._id !== entryId) }
          : g
      )
    );
  };

  // Update entry
  const updateEntry = (goodId, entryId, field, value) => {
    setGoods(
      goods.map((g) =>
        g._id === goodId
          ? {
              ...g,
              priceEntries: g.priceEntries.map((e) =>
                e._id === entryId ? { ...e, [field]: value } : e
              ),
            }
          : g
      )
    );
  };

  return (
    <div>
      <Header />
      <main className="wrap">
        <h2>Admin Page</h2>
        <button onClick={addGood} className="add-btn">+ Add Good</button>

        {goods.map((good) => (
          <div key={good._id} className="good-card">
            <div className="good-header">
              <input
                value={good.name}
                onChange={(e) => updateGood(good._id, "name", e.target.value)}
              />
              <input
                value={good.category}
                onChange={(e) => updateGood(good._id, "category", e.target.value)}
              />
              <input
                type="number"
                value={good.srp}
                onChange={(e) => updateGood(good._id, "srp", e.target.value)}
              />
              <button onClick={() => deleteGood(good._id)}>Delete Good</button>
            </div>

            <div className="entries">
              <h4>Price Entries</h4>
              <button onClick={() => addEntry(good._id)}>+ Add Entry</button>
              {good.priceEntries.map((entry) => (
                <div key={entry._id} className="entry-row">
                  <input
                    value={entry.region}
                    onChange={(e) => updateEntry(good._id, entry._id, "region", e.target.value)}
                  />
                  <input
                    value={entry.channel}
                    onChange={(e) => updateEntry(good._id, entry._id, "channel", e.target.value)}
                  />
                  <input
                    type="number"
                    value={entry.actual}
                    onChange={(e) => updateEntry(good._id, entry._id, "actual", e.target.value)}
                  />
                  <button onClick={() => deleteEntry(good._id, entry._id)}>Delete Entry</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
