import React from "react";
import { Link } from "react-router-dom";
import { siteMeta } from "../content/site";

const NotFound = () => {
  React.useEffect(() => {
    document.title = `Page not found | ${siteMeta.title}`;
  }, []);

  return (
    <article className="not-found">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return home</Link>
    </article>
  );
};

export default NotFound;
