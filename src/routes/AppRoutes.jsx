import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import Goal from "../pages/Goal";
import Progress from "../pages/Progress";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/goals" element={<Goal />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  );
};

export default AppRoutes;
