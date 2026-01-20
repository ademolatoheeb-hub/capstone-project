// import { Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Dashboard from "./pages/Dashboard";
// import Goals from "./pages/Goals";
// import Progress from "./pages/Progress";
// import DashboardLayout from "./layouts/DashboardLayout";
// import ProtectedRoute from "./routes/ProtectedRoute";

// function App() {
//   return (
//     <Routes>

//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* PROTECTED ROUTES */}
//          <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute>
//           <DashboardLayout>
//             <Dashboard />
//           </DashboardLayout>
//         </ProtectedRoute>
//       }
//     />

//     <Route
//       path="/goals"
//       element={
//         <ProtectedRoute>
//           <DashboardLayout>
//             <Goals />
//           </DashboardLayout>
//         </ProtectedRoute>
//       }
//     />

//     <Route
//       path="/progress"
//       element={
//         <ProtectedRoute>
//           <DashboardLayout>
//             <Progress />
//           </DashboardLayout>
//         </ProtectedRoute>
//       }
//     />

//   </Routes>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes wrapped in DashboardLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Goals />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Progress />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
