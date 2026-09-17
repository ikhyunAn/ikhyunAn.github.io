import React from "react";
import { publications, siteMeta } from "../content/site";

const Publications = () => {
  React.useEffect(() => {
    document.title = `Publications | ${siteMeta.title}`;
  }, []);

  return (
    <article>
      <header className="page-header">
        <h1>Publications</h1>
        <p>Research publications and selected papers.</p>
      </header>
      <ol className="entry-list publication-list">
        {publications.map((publication) => (
          <li key={publication.id}>
            <h2>{publication.title}</h2>
            <p className="publication__conference">
              {publication.conference}
            </p>
            <p>{publication.description}</p>
            {publication.link ? (
              <a href={publication.link}>View publication</a>
            ) : (
              <span className="publication__link-placeholder">
                [Publication link]
              </span>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
};

export default Publications;
