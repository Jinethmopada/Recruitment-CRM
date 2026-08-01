import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "../pages/RegistrationPage";
import LoginPage from "../pages/loginPage";
import Dashboard from "../pages/Dashboard/dashboard";
import DashboardLayout from "../layouts/dashboardLayout";
import Jobs from "../pages/Jobs/jobs";
import ProtectedRoute from "./ProtectRoute";
import Candidates from "../pages/Candidates/candidates";

const AppRoutes = () => {
  return (
    <Routes>
    <Route
     path="/"
     element={
     localStorage.getItem("token")
      ? <Navigate to="/dashboard" replace />
      : <LoginPage />
    }/>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path='/candidates' element= {<ProtectedRoute><Candidates/></ProtectedRoute>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes