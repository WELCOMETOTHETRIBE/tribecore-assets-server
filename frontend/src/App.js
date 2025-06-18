import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrandWidgets from './BrandWidgets';

const brands = [
  {
    name: 'WTTT',
    id: 'wttt',
    emoji: '🌿',
    api: '/notion-payload?brand=wttt',
    color: 'from-green-500 to-teal-400'
  },
  {
    name: "Jabroni's",
    id: 'jabroni',
    emoji: '🔥',
    api: '/notion-payload?brand=jabroni',
    color: 'from-red-600 to-yellow-500'
  },
  {
    name: 'Denly Gardens',
    id: 'denly',
    emoji: '🍕',
    api: '/notion-payload?brand=denly',
    color: 'from-yellow-500 to-orange-400'
  }
];

export default function Dashboard() {
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
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">TRIBECORE Content Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{brand.emoji} {brand.name}</h2>
              {payloads[brand.id] ? (
                <>
                  <img
                    src={payloads[brand.id].image}
                    alt="asset"
                    className="rounded-lg mb-3"
                  />
                  <p className="italic mb-3">"{payloads[brand.id].quote}"</p>
                  <BrandWidgets brand={brand.id} />
                </>
              ) : (
                <p className="text-zinc-400">Loading...</p>
              )}
              <Button
                onClick={() => fetchPayload(brand.id)}
                disabled={loading === brand.id}
                className={`w-full bg-gradient-to-r ${brand.color} hover:brightness-110 mt-4`}
              >
                {loading === brand.id ? 'Refreshing...' : 'Refresh Content'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

