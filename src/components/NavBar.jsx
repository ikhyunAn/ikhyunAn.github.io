import { Link, NavLink } from "react-router-dom";
import { profile, projects, publications, teaching } from "../content/site";

const NavBar = () => {
  const links = [
    { label: "Home", to: "/" },
    publications.length > 0 && { label: "Publications", to: "/publications" },
    teaching.length > 0 && { label: "Teaching", to: "/teaching" },
    projects.length > 0 && { label: "Portfolio", to: "/portfolio" },
  ].filter(Boolean);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-title" to="/">
          {profile.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {links.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "site-nav__link is-current" : "site-nav__link"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {profile.cvUrl && (
              <li>
                <a className="site-nav__link" href={profile.cvUrl}>
                  CV
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
