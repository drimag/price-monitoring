export default function RewardCard({ reward, onRedeem }) {
  return (
    <div className="reward-card">
      <h3>{reward.title}</h3>
      <p>{reward.description}</p>
      <button onClick={() => onRedeem(reward)}>Redeem</button>
    </div>
  );
}
