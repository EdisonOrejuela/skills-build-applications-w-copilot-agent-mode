import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            Log workouts, manage teams, and stay motivated with a modern multi-tier fitness dashboard.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/">
              Explore dashboard
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="/">
              View API health
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Ready for launch</h2>
              <ul className="mb-0">
                <li>React 19 + Vite frontend</li>
                <li>Express + TypeScript backend</li>
                <li>Mongoose-ready MongoDB connection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
