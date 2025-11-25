import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages (update these paths to match your real folder structure)
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import OnboardingPage from "./pages/Onboarding";
import DashboardPage from "./pages/Dashboard";
import ContentLibraryPage from "./pages/ContentLibrary";
import CampaignsPage from "./pages/Campaigns";
import AIGeneratorPage from "./pages/AIGenerator";
import SchedulingPage from "./pages/Scheduling";
import SettingsPage from "./pages/Settings";
import BillingPage from "./pages/Billing";

// Temporary: Remove auth for now until Supabase integration is added
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* REMOVE Mocha callback route */}
        {/* <Route path="/auth/callback" element={<AuthCallbackPage />} /> */}

        {/* For now, remove ProtectedRoute until we implement Supabase auth */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/content" element={<ContentLibraryPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/generate" element={<AIGeneratorPage />} />
        <Route path="/scheduling" element={<SchedulingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/billing" element={<BillingPage />} />
      </Routes>
    </Router>
  );
}
