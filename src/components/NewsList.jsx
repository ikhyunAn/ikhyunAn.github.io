const NewsItems = ({ items }) => (
  <ol className="news-list">
    {items.map((item) => (
      <li key={item.id}>
        <time dateTime={item.date}>{item.date}</time>
        <span>{item.url ? <a href={item.url}>{item.text}</a> : item.text}</span>
      </li>
    ))}
  </ol>
);

const NewsList = ({ items }) => {
  if (!items.length) return null;

  const recent = items.slice(0, 4);
  const older = items.slice(4);

  return (
    <section className="content-section" aria-labelledby="news-heading">
      <h2 id="news-heading" className="section-title">
        News
      </h2>
      <NewsItems items={recent} />
      {older.length > 0 && (
        <details className="older-news">
          <summary>Older news</summary>
          <NewsItems items={older} />
        </details>
      )}
    </section>
  );
};

export default NewsList;
