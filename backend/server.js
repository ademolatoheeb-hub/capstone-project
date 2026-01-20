// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// let goals = [
//   {s
//     id: 1,
//     title: "Study head anatomy",
//     progress: 45,
//     dueDate: "2026-03-10",
//     status: "In Progress",
//     notes: "",
//   },
// ];

// app.get("/api/goals", (req, res) => {
//   res.json(goals);
// });

// app.post("/api/goals", (req, res) => {
//   const newGoal = {
//     id: Date.now(),
//     ...req.body,
//   };
//   goals.push(newGoal);
//   res.json(newGoal);
// });

// app.put("/api/goals/:id", (req, res) => {
//   const id = Number(req.params.id);
//   goals = goals.map(goal =>
//     goal.id === id ? { ...goal, ...req.body } : goal
//   );
//   res.json({ success: true });
// });

// app.listen(5000, () =>
//   console.log("Backend running on http://localhost:5000")
// );
