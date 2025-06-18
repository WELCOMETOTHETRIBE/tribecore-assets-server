import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BrandWidgets({ brand }) {
  const [quote, setQuote] = useState('');
  const [fact, setFact] = useState('');
  const [history, setHistory] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 📦 Combined payload
      const res = await fetch(`/notion-payload?brand=${brand}`);
      const data = await res.json();

      setQuote(data.quote || 'No quote available.');
      setCaption(`Today's mood: ${data.mood || '✨ Inspired'}`);

      // 🧠 Hardcoded for now — replace with live endpoints later
      setFact("Did you know? Bananas are berries, but strawberries aren't.");
      setHistory("On this day in 1933, Denly Gardens opened its doors.");
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to load content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [brand]);

  return (
    <div className="bg-zinc-800 rounded-xl p-4 mt-4 text-left text-sm shadow-inner space-y-2">
      {error && <p className="text-red-400">{error}</p>}
      <p><strong>🧠 Quote of the Day:</strong> {loading ? 'Loading...' : quote}</p>
      <p><strong>📚 Random Fact:</strong> {loading ? 'Loading...' : fact}</p>
      <p><strong>📅 This Day in History:</strong> {loading ? 'Loading...' : history}</p>
      <p><strong>📝 Suggested Caption:</strong> {loading ? 'Loading...' : caption}</p>
      <div className="mt-2">
        <Button variant="outline" onClick={fetchData} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Widgets'}
        </Button>
      </div>
    </div>
  );
}

