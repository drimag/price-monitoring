import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
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
    // Simulate each reward costs 20 points
    fetch("/api/user/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cost: 20 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Redemption failed");
        return res.json();
      })
      .then((data) => {
        console.log("Redeemed:", reward, data);
        setUser(data.user);
        toast.success(`✅ Redeemed: ${reward.title}`);
      })
      .catch((err) => {
        console.log("failed to redeem: ", err);
        console.error("Error redeeming:", err);
        toast.error("❌ Failed to redeem reward");
      });
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
