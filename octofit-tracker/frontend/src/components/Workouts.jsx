import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts');
        if (active) {
          setWorkouts(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {workouts.map((workout) => (
        <div key={workout._id || workout.id || workout.name} className="col">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-2">
                <h3 className="h5">{workout.name}</h3>
                <span className="badge text-bg-secondary">{workout.difficulty}</span>
              </div>
              <p className="text-muted mb-2">{workout.category}</p>
              <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
              <p className="mb-1"><strong>Equipment:</strong> {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment}</p>
              <p className="mb-0"><strong>Focus:</strong> {Array.isArray(workout.focusAreas) ? workout.focusAreas.join(', ') : workout.focusAreas}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Workouts;
