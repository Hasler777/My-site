import { useEffect, useState } from "react";
import "./App.css";

function SourceCard({ title, url, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer" className="card-button">
          Перейти
        </a>
      </div>
    </div>
  );
}

function App() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/sources.json")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки данных");
        return res.json();
      })
      .then(setSources)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="main-title">Источники картинок</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        🚀 Развернуто на GitHub Pages
      </p>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error.message}</p>}
      <div className="cards-grid">
        {sources.map((src) => (
          <SourceCard key={src.url} {...src} />
        ))}
      </div>
    </div>
  );
}

export default App;
