export const goods = [
  {
    _id: "1",
    name: "Rice",
    category: "Grains",
    barcode: "123456789012",
    srp: 40,
    priceEntries: [
      { region: "Metro Manila", channel: "Supermarket", actual: 45, date: "2025-08-01" },
      { region: "Metro Manila", channel: "Supermarket", actual: 55, date: "2025-08-02" },
      { region: "South Luzon", channel: "Wet Market", actual: 42, date: "2025-08-02" },
      { region: "North Luzon", channel: "Convenience Store", actual: 44, date: "2025-08-03" },
    ],
  },
  {
    _id: "2",
    name: "Sugar",
    category: "Sweeteners",
    barcode: "987654321098",
    srp: 50,
    priceEntries: [
      { region: "Metro Manila", channel: "Supermarket", actual: 55, date: "2025-08-01" },
      { region: "South Luzon", channel: "Wet Market", actual: 53, date: "2025-08-02" },
    ],
  },
  {
    _id: "3",
    name: "Sardines",
    category: "Canned Goods",
    barcode: "111222333444",
    srp: 20,
    priceEntries: [
      { region: "Metro Manila", channel: "Convenience Store", actual: 18, date: "2025-08-01" },
      { region: "Western Visayas", channel: "Supermarket", actual: 22, date: "2025-08-02" },
    ],
  },
];

// Example utility to simulate fetching
export const mockApi = {
  getGoods: () => Promise.resolve(goods),

  getGoodById: (id) =>
    Promise.resolve(goods.find((g) => g._id === id) || null),

  addPriceEntry: (goodId, entry) => {
    const good = goods.find((g) => g._id === goodId);
    if (good) {
      good.priceEntries.push({ ...entry, date: new Date().toISOString() });
      return Promise.resolve(entry);
    }
    return Promise.reject("Good not found");
  },
};
