import React from "react";
import { projects, siteMeta } from "../content/site";

const Portfolio = () => {
  React.useEffect(() => {
    document.title = `Portfolio | ${siteMeta.title}`;
  }, []);

  return (
    <article>
      <header className="page-header">
        <h1>Portfolio</h1>
        <p>A selection of projects I have built and contributed to.</p>
      </header>

      {projects.length > 0 ? (
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <div className="project__body">
                <h2>
                  {project.title}
                  {project.year && <span className="project__year"> ({project.year})</span>}
                </h2>
                <p><em>{project.summary}</em></p>
                {project.contribution && <p>{project.contribution}</p>}
                {project.links.length > 0 && (
                  <ul className="resource-links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.url}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>Project details will be added here.</p>
      )}
    </article>
  );
};

export default Portfolio;
