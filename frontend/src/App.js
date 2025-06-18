import { useState, useEffect } from 'react';

const brands = [
  {
    name: 'WTTT',
    id: 'wttt',
    emoji: '🌿',
    api: '/notion-payload?brand=wttt',
    color: 'linear-gradient(to right, #10b981, #14b8a6)'
  },
  {
    name: "Jabroni's",
    id: 'jabroni',
    emoji: '🔥',
    api: '/notion-payload?brand=jabroni',
    color: 'linear-gradient(to right, #dc2626, #f59e0b)'
  },
  {
    name: 'Denly Gardens',
    id: 'denly',
    emoji: '🍕',
    api: '/notion-payload?brand=denly',
    color: 'linear-gradient(to right, #f59e0b, #f97316)'
  }
];

function App() {
  const [payloads, setPayloads] = useState({});
  const [loading, setLoading] = useState(null);

  const fetchPayload = async (brandId) => {
    setLoading(brandId);
    try {
      const res = await fetch(`/notion-payload?brand=${brandId}`);
      const data = await res.json();
      setPayloads((prev) => ({ ...prev, [brandId]: data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    brands.forEach((b) => fetchPayload(b.id));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
        TRIBECORE Content Dashboard
      </h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              background: '#1f1f1f',
              borderRadius: '16px',
              boxShadow: '0 0 20px rgba(0,0,0,0.4)',
              padding: '1.5rem',
              width: '300px'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              {brand.emoji} {brand.name}
            </h2>
            {payloads[brand.id] ? (
              <>
                <img
                  src={payloads[brand.id].image}
                  alt="asset"
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }}
                />
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                  "{payloads[brand.id].quote}"
                </p>
              </>
            ) : (
              <p style={{ color: '#aaa' }}>Loading...</p>
            )}
            <button
              onClick={() => fetchPayload(brand.id)}
              disabled={loading === brand.id}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: brand.color,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {loading === brand.id ? 'Refreshing...' : 'Refresh Content'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

