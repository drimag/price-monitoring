export default function ProfileSection({ user }) {
  return (
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

      <div className="profile-info">
        <label><strong>Role:</strong></label>
        <span>{user.role}</span>
      </div>

      <div className="profile-info">
        <label><strong>Remaining Points:</strong></label>
        <span>{user.points - user.pointsUsed}</span>
      </div>

      <div className="profile-actions">
        <button>Edit Information</button>
        <button>Change Password</button>
      </div>
    </section>
  );
}
