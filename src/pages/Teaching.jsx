import React from "react";
import { siteMeta, teaching } from "../content/site";

const Teaching = () => {
  React.useEffect(() => {
    document.title = `Teaching | ${siteMeta.title}`;
  }, []);

  return (
    <article>
      <header className="page-header">
        <h1>Teaching</h1>
      </header>
      {teaching.length > 0 ? (
        <div className="entry-list">
          {teaching.map((item) => (
            <section key={item.id}>
              <h2>{item.institution}</h2>
              <p><em>Position: {item.role}</em></p>
              {/* {item.period && <p>Period: {item.period}</p>} */}
              <ul>
                {item.courses.map((course) => (
                  <li key={course}>{course}
                  {item.period && <p>{item.period}</p>}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p>No teaching entries are listed yet.</p>
      )}
    </article>
  );
};

export default Teaching;
