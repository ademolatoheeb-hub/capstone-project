export default function GoalForm() {
  return (
    <section className="card">
      <h2>Create a New Goal</h2>
      <p className="muted">Start a goal and track its milestone</p>

      <form className="goal-form">
        <label>Primary Goal</label>
        <input placeholder="e.g Complete research course" />

        <label>Mini Goals</label>
        <input placeholder="Two or more mini goals" />

        <label>Description</label>
        <input placeholder="Short description of your goal" />

        <div className="date-row">
          <div>
            <label>Start Date</label>
            <input type="date" />
          </div>
          <div>
            <label>Due Date</label>
            <input type="date" />
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Save Goal
        </button>
      </form>
    </section>
  );
}
