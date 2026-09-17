import { profile } from "../content/site";

const Footer = () => (
  <footer className="site-footer">
    <p>
      © {new Date().getFullYear()} {profile.name}
    </p>
  </footer>
);

export default Footer;
