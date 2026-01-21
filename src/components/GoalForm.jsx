import { useState } from "react";
import { createGoal } from "../services/goal";
import { generateSubscription } from "../utils/notification";

export default function GoalForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [steps, setSteps] = useState([
    { name: "", frequency: "Daily", subscription: null },
  ]);
  const [loading, setLoading] = useState(false);

  // Add new mini goal field dynamically
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index].name = value;
    setSteps(updated);

    if (index === steps.length - 1 && value.trim() !== "") {
      setSteps([
        ...updated,
        { name: "", frequency: "Daily", subscription: null },
      ]);
    }
  };

  // Generate subscription for all non-empty steps
  const handleSubscribeAll = async () => {
    try {
      const sub = await generateSubscription();
      const updated = steps.map((s) =>
        s.name.trim() !== "" ? { ...s, subscription: sub } : s,
      );
      setSteps(updated);
      alert("Subscription generated for all non-empty steps ✅");
    } catch (err) {
      alert("Failed to generate subscription");
    }
  };

  // Validate before submit
  const validateForm = () => {
    if (!title.trim()) {
      alert("Primary goal title is required");
      return false;
    }
    if (!description.trim()) {
      alert("Description is required");
      return false;
    }
    if (!startDate || !endDate) {
      alert("Start and due dates are required");
      return false;
    }

    const validSteps = steps.filter((s) => s.name.trim() !== "");
    if (validSteps.length === 0) {
      alert("At least one mini goal is required");
      return false;
    }

    const unsubscribed = validSteps.some((s) => !s.subscription);
    if (unsubscribed) {
      alert("Please generate subscription keys for all mini goals");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      title,
      startDate: new Date(startDate).toISOString(),
      endgoal: new Date(endDate).toISOString(),
      status: "active",
      steps: steps
        .filter((s) => s.name.trim() !== "")
        .map((s, i) => ({
          index: i,
          name: s.name,
          frequency: s.frequency,
          subscription: s.subscription,
        })),
    };

    try {
      const response = await createGoal(payload);
      alert(response.message);
      console.log(response.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Create a New Goal</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        <label>Primary Goal</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g Complete research course"
        />

        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />

        <div className="date-row">
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <label>Mini Goals</label>
        {steps.map((step, index) => (
          <div key={index} className="step-row">
            <input
              value={step.name}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Mini goal ${index + 1}`}
            />
            {step.subscription && step.name.trim() !== "" && (
              <span className="muted">Subscribed ✅</span>
            )}
          </div>
        ))}

        <button type="button" onClick={handleSubscribeAll}>
          Generate Subscription Keys for All Steps
        </button>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Creating..." : "Save Goal"}
        </button>
      </form>
    </section>
  );
}
