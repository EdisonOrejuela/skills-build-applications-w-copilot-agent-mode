import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const data = await fetchCollection('activities');
        if (active) {
          setActivities(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {activities.map((activity) => (
        <div key={activity._id || activity.id || activity.date} className="col">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <h3 className="h5 mb-1">{activity.type}</h3>
                <span className="badge text-bg-primary">{activity.durationMinutes} min</span>
              </div>
              <p className="text-muted mb-2">{activity.userName}</p>
              <p className="mb-1"><strong>Date:</strong> {activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</p>
              <p className="mb-1"><strong>Distance:</strong> {activity.distanceKm ?? 0} km</p>
              <p className="mb-0"><strong>Calories:</strong> {activity.caloriesBurned ?? 0}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;
