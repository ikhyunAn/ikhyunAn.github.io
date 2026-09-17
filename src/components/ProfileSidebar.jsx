import { profile } from "../content/site";

const ProfileSidebar = () => (
  <aside className="profile" aria-label="Profile">
    <img
      className="profile__portrait"
      src={profile.avatar}
      alt={profile.avatarAlt}
      width="168"
      height="168"
      fetchPriority="high"
    />
    <p className="profile__name">{profile.name}</p>
    <p className="profile__role">{profile.role}</p>
    <ul className="profile__details">
      {profile.institution && <li>{profile.institution}</li>}
      {profile.location && <li>{profile.location}</li>}
      {profile.email && (
        <li>
          <a href={`mailto:${profile.email}`}>Email</a>
        </li>
      )}
    </ul>
    <ul className="profile__links" aria-label="Professional profiles">
      {profile.links.map((link) => (
        <li key={link.label}>
          <a href={link.url}>{link.label}</a>
        </li>
      ))}
    </ul>
  </aside>
);

export default ProfileSidebar;
