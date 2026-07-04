import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const data = await fetchCollection('teams');
        if (active) {
          setTeams(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {teams.map((team) => (
        <div key={team._id || team.id || team.name} className="col">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h3 className="h5">{team.name}</h3>
              <p className="text-muted mb-2">{team.sport}</p>
              <p className="mb-1"><strong>Captain:</strong> {team.captain}</p>
              <p className="mb-1"><strong>Goal:</strong> {team.goal}</p>
              <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.join(', ') : team.members}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
