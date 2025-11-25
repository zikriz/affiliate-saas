import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@getmocha/users-service/react";
import LoginPage from "@/react-app/pages/Login";
import SignupPage from "@/react-app/pages/Signup";
import ForgotPasswordPage from "@/react-app/pages/ForgotPassword";
import ResetPasswordPage from "@/react-app/pages/ResetPassword";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import OnboardingPage from "@/react-app/pages/Onboarding";
import DashboardPage from "@/react-app/pages/Dashboard";
import ContentLibraryPage from "@/react-app/pages/ContentLibrary";
import CampaignsPage from "@/react-app/pages/Campaigns";
import AIGeneratorPage from "@/react-app/pages/AIGenerator";
import SchedulingPage from "@/react-app/pages/Scheduling";
import SettingsPage from "@/react-app/pages/Settings";
import BillingPage from "@/react-app/pages/Billing";
import ProtectedRoute from "@/react-app/components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/content" element={<ProtectedRoute><ContentLibraryPage /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><CampaignsPage /></ProtectedRoute>} />
          <Route path="/generate" element={<ProtectedRoute><AIGeneratorPage /></ProtectedRoute>} />
          <Route path="/scheduling" element={<ProtectedRoute><SchedulingPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
