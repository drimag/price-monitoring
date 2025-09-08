export default function RewardCard({ reward, onRedeem }) {
  return (
    <div className="reward-card" key={reward.id} >
      <h3>{reward.title}</h3>
      <p>{reward.description}</p>
      <button onClick={(e) => onRedeem(reward, e)}>Redeem</button>
    </div>
  );
}
