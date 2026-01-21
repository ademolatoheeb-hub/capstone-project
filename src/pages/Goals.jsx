import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";
import "../styles/goals.css";
import { getGoals } from "../services/goal";

export default function Goals() {
  const [activeGoals, setActiveGoals] = useState([]);
  const [archivedGoals, setArchivedGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals(); // backend returns { message, goals: [...] }
        const allGoals = data.goals || [];

        // Split into active vs archived/completed
        const active = allGoals.filter((g) => g.status === "active");
        const archived = allGoals.filter((g) => g.status === "completed");

        setActiveGoals(active);
        setArchivedGoals(archived);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div className="app-layout">
      <div className="main-content">
        <div className="goals-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <GoalForm />

            {/* ACTIVE GOALS */}
            <section className="card">
              <h3>Active Goals</h3>
              <p className="muted">Here's what you're currently working on.</p>

              {loading ? (
                <p>Loading goals...</p>
              ) : (
                <table className="goals-table">
                  <thead>
                    <tr>
                      <th>Goal Name</th>
                      <th>Start Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeGoals.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="muted center">
                          No active goals
                        </td>
                      </tr>
                    ) : (
                      activeGoals.map((goal) => (
                        <tr key={goal._id}>
                          <td>{goal.title}</td>
                          <td>{goal.startDate?.slice(0, 10)}</td>
                          <td>{goal.endDate?.slice(0, 10)}</td>
                          <td className={`status ${goal.status}`}>
                            {goal.status}
                          </td>
                          <td>
                            <button className="edit-btn">Edit</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </section>

            {/* GOAL ARCHIVE */}
            <section className="card">
              <h3>Goal Archive</h3>
              <p className="muted">View completed or old goals</p>

              {loading ? (
                <p>Loading archive...</p>
              ) : (
                <table className="goals-table">
                  <thead>
                    <tr>
                      <th>Goal Name</th>
                      <th>Completed On</th>
                      <th>Notes</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {archivedGoals.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="muted center">
                          No archived goals
                        </td>
                      </tr>
                    ) : (
                      archivedGoals.map((goal) => (
                        <tr key={goal._id}>
                          <td>{goal.title}</td>
                          <td>{goal.endDate?.slice(0, 10)}</td>
                          <td>{goal.notes || "-"}</td>
                          <td>
                            <button className="edit-btn">Edit</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <section className="card summary-card">
              <h3>Goal Summary</h3>
              <div className="summary-item">
                <span className="dot blue"></span> Active Goals{" "}
                <b>{activeGoals.length}</b>
              </div>
              <div className="summary-item">
                <span className="dot green"></span> Completed Goals{" "}
                <b>{archivedGoals.length}</b>
              </div>
              <div className="summary-item">
                <span className="dot red"></span> Overdue Goals{" "}
                <b>
                  {
                    activeGoals.filter(
                      (g) =>
                        new Date(g.endDate) < new Date() &&
                        g.status !== "completed",
                    ).length
                  }
                </b>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
