import { useState, useEffect } from "react";
import Header from "../components/dashboard/Header";
import ProfileSection from "../components/user/ProfileSection";
import RewardCard from "../components/user/RewardCard";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    region: "",
    role: "",
    points: 0,
    pointsUsed: 0
  });

  const rewards = [
    { id: 1, title: "₱50 Grocery Voucher", description: "Redeem at participating supermarkets" },
    { id: 2, title: "Jollibee Free Delivery", description: "Valid for one delivery order" },
    { id: 3, title: "Gcash Rewards", description: "Get cashback on your next transaction" },
  ];

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then(setUser)
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleRedeem = (reward) => {
    console.log("Redeemed:", reward);
  };

  return (
    <>
      <Header />
      <main className="wrap">
        <ProfileSection user={user} />

        <section className="rewards-container">
          <h2>Rewards</h2>
          <div className="rewards-grid">
            {rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} onRedeem={handleRedeem} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
