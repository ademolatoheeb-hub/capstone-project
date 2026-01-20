import { useState } from "react";
import { updateGoal } from "../api/goalsApi";

export default function EditGoalModal({ goal, setGoals, onClose }) {
  const [formData, setFormData] = useState(goal);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    await updateGoal(goal.id, formData);
    setGoals(prev =>
      prev.map(g => (g.id === goal.id ? formData : g))
    );
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Goal</h3>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="progress"
          type="number"
          value={formData.progress}
          onChange={handleChange}
        />

        <button onClick={handleSave} className="primary-btn">
          Save
        </button>
        <button onClick={onClose} className="edit-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
