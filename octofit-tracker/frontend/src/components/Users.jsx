import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const data = await fetchCollection('users');
        if (active) {
          setUsers(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {users.map((user) => (
        <div key={user._id || user.id || user.email} className="col">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h3 className="h5">{user.name}</h3>
              <p className="text-muted mb-2">{user.email}</p>
              <p className="mb-1"><strong>Role:</strong> {user.role}</p>
              <p className="mb-1"><strong>Goal:</strong> {user.goal}</p>
              <p className="mb-0"><strong>Location:</strong> {user.city}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;
