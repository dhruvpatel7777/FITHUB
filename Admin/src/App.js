import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./components/admin/Dashboard/AdminDashboard";
import Login from "./components/admin/Auth/Login";
import ProtectedRoute from "./components/admin/Common/ProtectedRoute";
import OverviewSection from "./components/admin/Dashboard/OverviewSection";
import MemberManagement from "./components/admin/Dashboard/MemberManagement";
import MembershipPlans from "./components/admin/Dashboard/MembershipPlans";
import ClassManagement from "./components/admin/Dashboard/ClassManagement";
import ManageGymProfile from "./components/admin/Dashboard/ManageGymProfile";
import Notifications from "./components/admin/Dashboard/Notifications";
import Products from "./components/admin/Dashboard/Products";
import FeedbackManagement from "./components/admin/Dashboard/FeedbackManagement";
import AdminBookings from "./components/admin/Dashboard/AdminBookings";
import Transactions from "./components/admin/Dashboard/Transactions";
import { AuthProvider } from "./components/admin/GlobalContext";
const RedirectToLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if ((localStorage.getItem('auth-token')) == null) {
      navigate('/login');
    }
  }, []);

  return null; // This component doesn't render anything
};

const App = () => {
  return (
    <Router>
      <RedirectToLogin /> 
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<OverviewSection />} />
          <Route path="admin/members" element={<MemberManagement />} />
          <Route path="admin/membership-plans" element={<MembershipPlans />} />
          <Route path="admin/classes" element={<ClassManagement />} />
          <Route path="admin/manage-gym-profile" element={<ManageGymProfile />} />
          <Route path="admin/bookings" element={<AdminBookings />} />
          <Route path="admin/notifications" element={<Notifications />} />
          <Route path="admin/transactions" element={<Transactions />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/feedback" element={<FeedbackManagement />} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
