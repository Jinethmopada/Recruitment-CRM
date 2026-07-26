import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "../pages/RegistrationPage";
import LoginPage from "../pages/loginPage";
import Dashboard from "../pages/Dashboard/dashboard";
import DashboardLayout from "../layouts/dashboardLayout";
import Jobs from "../pages/Jobs/jobs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes