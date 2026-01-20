import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import GoalForm from "../components/GoalForm";
import "../styles/goals.css";
import { getGoals, saveGoals } from "../utils/goalsStorage";


export default function Goals() {
  return (
    <div className="app-layout">
      {/* <Sidebar /> */}

      <div className="main-content">
        {/* <Topbar /> */}

        <div className="goals-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <GoalForm />

            {/* ACTIVE GOALS */}
            <section className="card">
              <h3>Active Goals</h3>
              <p className="muted">
                Here's what you're currently working on.
              </p>

              <table className="goals-table">
                <thead>
                  <tr>
                    <th>Goal Name</th>
                    <th>Progress</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Study head anatomy</td>
                    <td>45%</td>
                    <td>2026-03-10</td>
                    <td className="status in-progress">In Progress</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Review past questions</td>
                    <td>20%</td>
                    <td>2026-01-15</td>
                    <td className="status in-progress">In Progress</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Complete online course</td>
                    <td>80%</td>
                    <td>2026-01-25</td>
                    <td className="status in-progress">In Progress</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* GOAL ARCHIVE */}
            <section className="card">
              <h3>Goal Archive</h3>
              <p className="muted">View completed or old goals</p>

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
                  <tr>
                    <td>Study neck anatomy</td>
                    <td>2025-12-15</td>
                    <td>75% understanding. Will come back to it</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Complete notes</td>
                    <td>2025-12-03</td>
                    <td>Achieved ahead of schedule</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                  <tr>
                    <td>Assist in the Laboratory</td>
                    <td>2025-11-20</td>
                    <td>Very informative</td>
                    <td><button className="edit-btn">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* GOAL SUMMARY */}
            <section className="card summary-card">
              <h3>Goal Summary</h3>

              <div className="summary-item">
                <span className="dot blue"></span> Active Goals <b>8</b>
              </div>
              <div className="summary-item">
                <span className="dot green"></span> Completed Goals <b>10</b>
              </div>
              <div className="summary-item">
                <span className="dot red"></span> Overdue Goals <b>3</b>
              </div>
            </section>

            {/* OVERALL PROGRESS */}
            <section className="card progress-card">
              <h3>Overall Progress</h3>

              <div className="progress-ring">
                <span>75%</span>
              </div>

              <p className="muted center">
                You're 75% through your active goals
                <br />
                Based on 3 active goals
              </p>
            </section>

            {/* UPCOMING */}
            <section className="card">
              <h3>Upcoming</h3>
              <p className="muted">No upcoming deadlines</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
