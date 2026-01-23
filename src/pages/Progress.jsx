// import { useState } from "react";
// import "../styles/Progress.css";

// const streakData = [
//   15, 30, 60, 0, 45, 30, 60,
//   15, 0, 30, 45, 60, 0, 30,
//   15, 30, 60, 0, 45, 30, 60,
//   15, 30, 45, 60, 30, 15
// ];

// const studyHistory = [
//   { task: "Practice MCQs", time: "45 minutes", date: "Oct 5" },
//   { task: "Flashcard Revision", time: "15 minutes", date: "Nov 7" },
//   { task: "Read Anatomy Notes", time: "30 minutes", date: "Nov 12" }
// ];

// export default function Progress() {
//   const [view, setView] = useState("Monthly");

//   const getColor = (minutes) => {
//     if (minutes === 0) return "empty";
//     if (minutes <= 15) return "low";
//     if (minutes <= 30) return "medium";
//     return "high";
//   };

//   return (
//     <div className="progress-page">
//       <h2>Progress</h2>
//       <p className="subtitle">Track your consistency and growth over time</p>

//       {/* STUDY STREAK */}
//       <div className="card streak-card">
//         <div className="streak-header">
//           <h3>Study Streak</h3>
//           <div className="tabs">
//             {["Weekly", "Monthly", "All Time"].map(tab => (
//               <button
//                 key={tab}
//                 className={view === tab ? "active" : ""}
//                 onClick={() => setView(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="streak-grid">
//           {streakData.map((minutes, index) => (
//             <div
//               key={index}
//               className={`streak-box ${getColor(minutes)}`}
//             />
//           ))}
//         </div>

//         <p className="streak-summary">
//           You studied for <strong>27 days</strong> this month.
//         </p>

//         <div className="legend">
//           <span><i className="empty" /> 0hr</span>
//           <span><i className="low" /> 15min</span>
//           <span><i className="medium" /> 30min</span>
//           <span><i className="high" /> 1hr+</span>
//         </div>
//       </div>

//       {/* STUDY HISTORY */}
//       <div className="card">
//         <h3>Study History</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Study Sessions</th>
//               <th>Time</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studyHistory.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.task}</td>
//                 <td>{item.time}</td>
//                 <td>{item.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* BADGES */}
//       <div className="card badges">
//         <h3>Badges</h3>
//         <div className="badge-grid">
//           <div className="badge">🔥<p>5 Days Streak</p></div>
//           <div className="badge">🔒<p>5 Days Locked In</p></div>
//           <div className="badge">⏱️<p>48hrs Studied</p></div>
//           <div className="badge">🌙<p>Night Owl</p></div>
//           <div className="badge">🏆<p>10 Goals Completed</p></div>
//           <div className="badge">🎥<p>10 Study Sessions</p></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getGoals } from "../utils/goalsStorage";
import "../styles/progress.css";

export default function Progress() {
  const [goals, setGoals] = useState([]);
  const [view, setView] = useState("Monthly");

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  // 🔢 CALCULATIONS
  const completedGoals = goals.filter(g => g.status === "Completed");
  const activeGoals = goals.filter(g => g.status !== "Completed");

  const daysStudied = completedGoals.length + activeGoals.length;

  // 🟩 STREAK HEATMAP (last 28 days)
  const streakData = Array.from({ length: 28 }, (_, i) => {
    const goal = goals[i];
    if (!goal) return 0;
    return goal.progress >= 80 ? 60 : goal.progress >= 40 ? 30 : 15;
  });

  const getColor = (minutes) => {
    if (minutes === 0) return "empty";
    if (minutes <= 15) return "low";
    if (minutes <= 30) return "medium";
    return "high";
  };

  return (
    <div className="progress-page">
      <h2>Progress</h2>
      <p className="subtitle">
        Track your consistency and growth over time
      </p>

      {/* STUDY STREAK */}
      <div className="card streak-card">
        <div className="streak-header">
          <h3>Study Streak</h3>
          <div className="tabs">
            {["Weekly", "Monthly", "All Time"].map(tab => (
              <button
                key={tab}
                className={view === tab ? "active" : ""}
                onClick={() => setView(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="streak-grid">
          {streakData.map((minutes, index) => (
            <div
              key={index}
              className={`streak-box ${getColor(minutes)}`}
            />
          ))}
        </div>

        <p className="streak-summary">
          You studied for <strong>{daysStudied} days</strong> this month.
        </p>
      </div>

      {/* STUDY HISTORY */}
      <div className="card">
        <h3>Study History</h3>
        <table>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {goals.map(goal => (
              <tr key={goal.id}>
                <td>{goal.title}</td>
                <td>{goal.progress}%</td>
                <td>{goal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BADGES */}
      <div className="card badges">
        <h3>Badges</h3>
        <div className="badge-grid">
          {daysStudied >= 5 && <Badge icon="🔥" label="5 Days Streak" />}
          {completedGoals.length >= 5 && <Badge icon="🏆" label="5 Goals Completed" />}
          {completedGoals.length >= 10 && <Badge icon="🎯" label="10 Goals Completed" />}
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label }) {
  return (
    <div className="badge">
      {icon}
      <p>{label}</p>
    </div>
  );
}
