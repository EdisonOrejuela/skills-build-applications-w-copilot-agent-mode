import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadEntries() {
      try {
        const data = await fetchCollection('leaderboard');
        if (active) {
          setEntries(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="list-group">
      {entries.map((entry) => (
        <div key={entry._id || entry.id || entry.userName} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h3 className="h6 mb-1">#{entry.rank ?? '—'} {entry.userName}</h3>
            <p className="mb-0 text-muted">Streak: {entry.streak ?? 0} days</p>
          </div>
          <span className="badge text-bg-success">{entry.score ?? 0} pts</span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
