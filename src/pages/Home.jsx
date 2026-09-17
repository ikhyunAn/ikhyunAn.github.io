import React from "react";
import { Link } from "react-router-dom";
import AchievementTimeline from "../components/AchievementTimeline";
import NewsList from "../components/NewsList";
import { achievements, news, profile, projects, siteMeta } from "../content/site";

const Home = () => {
  React.useEffect(() => {
    document.title = siteMeta.title;
  }, []);

  return (
    <article>
      <header className="page-header">
        <h1>Hi, I’m Ikhyun.</h1>
      </header>
      <div className="intro-copy">
        {profile.bioParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {profile.researchInterests.length > 0 && (
          <p>
            My current interests include {profile.researchInterests.join(", ")}.
          </p>
        )}
      </div>

      <NewsList items={news} />
      <AchievementTimeline items={achievements} />

      {projects.length > 0 && (
        <section className="content-section" aria-labelledby="selected-work-heading">
          <div className="section-heading-row">
            <h2 id="selected-work-heading" className="section-title">
              Selected work
            </h2>
            <Link to="/portfolio">View portfolio</Link>
          </div>
          <ul className="selected-work-list">
            {projects.slice(0, 2).map((project) => (
              <li key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default Home;
