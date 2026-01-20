const GOALS_KEY = "focuset_goals";

export const getGoals = () => {
  const data = localStorage.getItem(GOALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};
