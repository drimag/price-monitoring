export let goods = [
  {
    _id: "1",
    name: "Rice",
    category: "Grains",
    barcode: "123456789012",
    srp: 40,
    priceEntries: [
      { _id: "11", region: "Metro Manila", channel: "Supermarket", actual: 45, date: "2025-08-01" },
      { _id: "12", region: "Metro Manila", channel: "Supermarket", actual: 55, date: "2025-08-02" },
      { _id: "13", region: "South Luzon", channel: "Wet Market", actual: 42, date: "2025-08-02" },
      { _id: "14", region: "North Luzon", channel: "Convenience Store", actual: 44, date: "2025-08-03" },
    ],
  },
  {
    _id: "2",
    name: "Sugar",
    category: "Sweeteners",
    barcode: "987654321098",
    srp: 50,
    priceEntries: [
      { _id: "21", region: "Metro Manila", channel: "Supermarket", actual: 55, date: "2025-08-01" },
      { _id: "22", region: "South Luzon", channel: "Wet Market", actual: 53, date: "2025-08-02" },
    ],
  },
  {
    _id: "3",
    name: "Sardines",
    category: "Canned Goods",
    barcode: "111222333444",
    srp: 20,
    priceEntries: [
      { _id: "31", region: "Metro Manila", channel: "Convenience Store", actual: 18, date: "2025-08-01" },
      { _id: "32", region: "Western Visayas", channel: "Supermarket", actual: 22, date: "2025-08-02" },
    ],
  },
];

// Example utility to simulate fetching
export const mockApi = {
  getGoods: () => Promise.resolve(goods),

  getGoodById: (id) =>
    Promise.resolve(goods.find((g) => g._id === id) || null),

  addPriceEntry: (name, region, channel, actual) => {
    let good = goods.find((g) => g.name === name);
    if (!good){
      const newGood = {
        _id: Object.keys(goods).length + 1,
        name: name,
        category: "Uncategorized",
        srp: 0,
        priceEntries: [],
      };
      goods = [...goods, newGood];
      good = goods.find((g) => g.name === name);
    }

    const newEntry = { 
      _id: `${good._id}-${good.priceEntries.length + 1}`, 
      region, channel, actual, date: new Date() 
    };
    good.priceEntries.push(newEntry);

    return Promise.resolve(newEntry);
  },

  addGood: () => {
    const newGood = {
      _id: Object.keys(goods).length,
      name: "New Good",
      category: "Uncategorized",
      srp: 0,
      priceEntries: [],
    };
    goods = [...goods, newGood];
    return Promise.resolve(newGood);
  },

  deleteGood: (id) => {
    goods = goods.filter((g) => g._id !== id);
    return Promise.resolve(true);
  },

  updateGood: (id, field, value) => {
    goods = goods.map((g) =>
      g._id === id ? { ...g, [field]: value } : g
    );
    return Promise.resolve(true);
  },

  // --- ENTRIES ---
  addEntry: (goodId) => {
    const newEntry = {
      _id: Date.now().toString(),
      region: "Region X",
      channel: "Channel Y",
      actual: 0,
      date: new Date(),
    };
    goods = goods.map((g) =>
      g._id === goodId
        ? { ...g, priceEntries: [...g.priceEntries, newEntry] }
        : g
    );
    return Promise.resolve(newEntry);
  },

  deleteEntry: (goodId, entryId) => {
    goods = goods.map((g) =>
      g._id === goodId
        ? { ...g, priceEntries: g.priceEntries.filter((e) => e._id !== entryId) }
        : g
    );
    return Promise.resolve(true);
  },

  updateEntry: (goodId, entryId, field, value) => {
    goods = goods.map((g) =>
      g._id === goodId
        ? {
            ...g,
            priceEntries: g.priceEntries.map((e) =>
              e._id === entryId ? { ...e, [field]: value } : e
            ),
          }
        : g
    );
    return Promise.resolve(true);
  },
};
