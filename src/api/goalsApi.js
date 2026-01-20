const API_URL = "http://localhost:5000/api/goals";

export async function fetchGoals() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createGoal(goal) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  return res.json();
}

export async function updateGoal(id, updatedGoal) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGoal),
  });
  return res.json();
}