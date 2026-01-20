import { studyGoals } from "../data/dashboardData";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StudyBarChart from "../components/StudyBarChart";
import ProgressDonut from "../components/ProgressDonut";
import "../styles/dashboard.css";


import {
  weeklyStudyData,
  progressData,
  todayGoal as goalData,
} from "../data/dashboardData";

const Dashboard = () => {
  const [goal, setGoal] = useState(goalData);

  const markAsDone = () => {
    setGoal({ ...goal, completed: true });
  };

  return (
    <div className="dashboard-layout">
      {/* <Sidebar /> */}

      <main className="dashboard">
        {/* <Topbar /> */}

        {/* HERO */}
        <section className="dashboard-top">
          <div className="hero-card">
            <h3>You are building a consistent learning habit.</h3>
            <p>Small steps everyday.</p>
            <button>Check in for today</button>
          </div>

          <div className="calendar-card">
            <h4>Mon, Nov 5</h4>
            <p>November 2025</p>
          </div>
        </section>

        {/* STREAK */}
        <section className="streak">
          <h2>🔥 5 days</h2>
          <p>You’ve studied consistently for 5 days.</p>
        </section>

        {/* TODAY GOAL */}
        <section className="today-goal">
          <div>
            <small>Today's Goal</small>
            <h3>{goal.title}</h3>
            <p>{goal.time}</p>

            {!goal.completed ? (
              <button onClick={markAsDone}>Mark as done</button>
            ) : (
              <span className="completed">Completed ✔</span>
            )}
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="chart-card">
            <h4>My statistics</h4>
            <p>Time spent studying</p>
            <StudyBarChart data={weeklyStudyData} />
          </div>

          <div className="donut-card">
            <ProgressDonut data={progressData} />
          </div>
        </section>

        {/* STUDY GOALS TABLE */}
        <section className="goals-table">
          <div className="table-header">
            <h4>Study Goals</h4>
            <span className="filter">Last week ⌄</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Goals</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {studyGoals.map((item) => (
                <tr key={item.id}>
                  <td>{item.goal}</td>
                  <td>{item.time}</td>
                  <td className={`status ${item.status}`}>
                    {item.status.replace("-", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
