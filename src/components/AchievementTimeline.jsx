const AchievementTimeline = ({ items }) => {
  if (!items.length) return null;

  return (
    <section className="content-section" aria-labelledby="achievements-heading">
      <h2 id="achievements-heading" className="section-title">
        Achievements
      </h2>
      <ol className="achievement-timeline">
        {items.map((item) => (
          <li key={item.id}>
            <time>{item.date}</time>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
            {item.link && <a href={item.link}>Learn more</a>}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default AchievementTimeline;
