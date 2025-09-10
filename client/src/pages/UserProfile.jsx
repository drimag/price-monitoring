import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import ProfileSection from "../components/user/ProfileSection";
import RewardCard from "../components/user/RewardCard";
import "./UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Juan Dela Cruz",
    mobile: "0917-123-4567",
    region: "Metro Manila",
    role: "Admin",
    points: 100,
    pointsUsed: 20
  });

  const rewards = [
    { id: 1, title: "₱50 Grocery Voucher", description: "Redeem at participating supermarkets" },
    { id: 2, title: "Jollibee Free Delivery", description: "Valid for one delivery order" },
    { id: 3, title: "Gcash Rewards", description: "Get cashback on your next transaction" },
  ];

  useEffect(() => {
    setUser(user);
  }, []);

  const handleRedeem = (reward) => {
    if ((user.points - user.pointsUsed) < 20){
      toast.error("❌ Failed to redeem reward")
    } else {
      toast.success(`✅ Redeemed: ${reward.title}`);
      let updatedUser = {
        name: user.name,
        mobile: user.mobile,
        region: user.region,
        role: user.role,
        points: user.points,
        pointsUsed: user.pointsUsed + 20
      }
      setUser(updatedUser);
    }
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
