import { useState } from "react";
import Header from "../components/dashboard/Header";
import "./UserProfile.css";

export default function UserProfile() {
  // Hardcoded for now
  const [user, setUser] = useState({
    name: "Juan Dela Cruz",
    mobile: "0917-123-4567",
    region: "Metro Manila"
  });

  const rewards = [
    { id: 1, title: "₱50 Grocery Voucher", description: "Redeem at participating supermarkets" },
    { id: 2, title: "Jolibee Free Delivery", description: "Valid for one delivery order" },
    { id: 3, title: "Gcash Rewards", description: "Get cashback on your next transaction" },
  ];

  return (
    <>
      <Header />

      <main className="wrap">
        <section className="profile-container">
          <h2>User Profile</h2>

          <div className="profile-info">
            <label><strong>Name:</strong></label>
            <span>{user.name}</span>
          </div>

          <div className="profile-info">
            <label><strong>Mobile:</strong></label>
            <span>{user.mobile}</span>
          </div>

          <div className="profile-info">
            <label><strong>Location (Region):</strong></label>
            <span>{user.region}</span>
          </div>

          <div className="profile-actions">
            <button>Edit Information</button>
            <button>Change Password</button>
          </div>
        </section>

        {/* Rewards Section */}
        <section className="rewards-container">
          <h2>Rewards</h2>
          <div className="rewards-grid">
            {rewards.map((reward) => (
              <div className="reward-card" key={reward.id}>
                <h3>{reward.title}</h3>
                <p>{reward.description}</p>
                <button onClick={() => handleRedeem(reward)}>Redeem</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
