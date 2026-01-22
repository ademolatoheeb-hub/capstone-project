// src/components/GoalMiniModal.jsx
import { useEffect, useState } from "react";
import "./GoalMiniModal.css";

export default function GoalMiniModal({
  apiBase = "",
  goal,
  onClose,
  onGoalUpdated,
}) {
  // debug logs (moved out of JSX)
  console.log("GoalMiniModal mounted, goal:", goal);
  console.log("GoalMiniModal initial steps:", goal?.steps ?? goal?.miniGoals);

  // initialize from goal.steps (fallback to miniGoals)
  const [miniGoals, setMiniGoals] = useState(
    goal?.steps ?? goal?.miniGoals ?? [],
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [error, setError] = useState(null);

  // reset local state when the selected goal changes
  useEffect(() => {
    setMiniGoals(goal?.steps ?? goal?.miniGoals ?? []);
    setEditingIndex(null);
    setEditText("");
    setError(null);
  }, [goal]);

  // helper: PATCH step at index with partial body
  async function patchMiniGoal(index, body) {
    setLoadingIndex(index);
    setError(null);
    try {
      // Adjust "steps" vs "minigoals" to match your backend route
      const res = await fetch(
        `${apiBase}/api/goals/${goal._id}/steps/${index}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update step");
      }
      const updatedGoal = await res.json(); // expect updated goal or updated steps
      const updatedSteps = updatedGoal?.steps ?? updatedGoal?.miniGoals ?? null;
      if (updatedSteps) {
        setMiniGoals(updatedSteps);
        onGoalUpdated && onGoalUpdated(updatedGoal);
      } else {
        // fallback: merge partial change locally
        setMiniGoals((prev) =>
          prev.map((m, i) => (i === index ? { ...m, ...body } : m)),
        );
      }
    } catch (err) {
      console.error("patchMiniGoal error:", err);
      setError(err.message || "Network error");
    } finally {
      setLoadingIndex(null);
    }
  }

  // helper: call a specific backend route for a mini-goal action
  async function patchMiniGoalByRoute(routePath, index, body) {
    // routePath should be a string like: `/api/goals/${goal._id}/minigoals/${index}/done`
    setLoadingIndex(index);
    setError(null);
    try {
      const res = await fetch(`${apiBase}${routePath}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update mini-goal");
      }
      const updatedGoal = await res.json(); // expect updated goal or updated steps
      const updatedSteps = updatedGoal?.steps ?? updatedGoal?.miniGoals ?? null;
      if (updatedSteps) {
        setMiniGoals(updatedSteps);
        onGoalUpdated && onGoalUpdated(updatedGoal);
      } else {
        // fallback: merge partial change locally
        setMiniGoals((prev) =>
          prev.map((m, i) => (i === index ? { ...m, ...body } : m)),
        );
      }
      return { ok: true, updatedGoal };
    } catch (err) {
      console.error("patchMiniGoalByRoute error:", err);
      setError(err.message || "Network error");
      return { ok: false, error: err };
    } finally {
      setLoadingIndex(null);
    }
  }

  // mark done
  const handleMarkDone = async (index) => {
    setMiniGoals((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, completed: true, done: true } : m,
      ),
    );
    await patchMiniGoalByRoute(index, { completed: true, done: true });
  };

  // undo done
  const handleUndo = async (index) => {
    setMiniGoals((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, completed: false, done: false } : m,
      ),
    );
    await patchMiniGoal(index, { completed: false, done: false });
  };

  // start editing
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(miniGoals[index]?.name ?? miniGoals[index]?.title ?? "");
  };

  // save edit
  const saveEdit = async (index) => {
    if (!editText.trim()) {
      setError("Mini-goal text cannot be empty");
      return;
    }
    setMiniGoals((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, name: editText, title: editText } : m,
      ),
    );
    setEditingIndex(null);
    await patchMiniGoal(index, { name: editText, title: editText });
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Mini goals for ${goal.title}`}
    >
      <div className="modal">
        <header className="modal-header">
          <h4>{goal.title} — Mini Goals</h4>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="modal-body">
          {miniGoals.length === 0 ? (
            <p className="muted">No mini-goals for this goal.</p>
          ) : (
            <table className="mini-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mini Goal</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {miniGoals.map((m, i) => {
                  const done = m.completed === true || m.done === true;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        {editingIndex === i ? (
                          <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(i);
                            }}
                          />
                        ) : (
                          <span className={done ? "done" : ""}>
                            {m.name ?? m.title}
                          </span>
                        )}
                      </td>
                      <td>{done ? "Done" : "Pending"}</td>
                      <td>
                        {editingIndex === i ? (
                          <>
                            <button
                              onClick={() => saveEdit(i)}
                              disabled={loadingIndex === i}
                            >
                              Save
                            </button>
                            <button onClick={() => setEditingIndex(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            {!done ? (
                              <button
                                onClick={() => handleMarkDone(i)}
                                disabled={loadingIndex === i}
                              >
                                Mark as done
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUndo(i)}
                                disabled={loadingIndex === i}
                              >
                                Undo
                              </button>
                            )}
                            <button
                              onClick={() => startEdit(i)}
                              disabled={loadingIndex === i}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {error && <div className="error">{error}</div>}
        </div>

        <footer className="modal-footer">
          <button onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}
