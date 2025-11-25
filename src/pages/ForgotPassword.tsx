import { Link } from "react-router";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-slate-600 mt-2">Enter your email to receive a reset link</p>
          </div>

          {/* Form */}
          <form className="space-y-4 opacity-50 pointer-events-none">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  disabled
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              disabled
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Password reset is handled through Google OAuth
        </p>
      </div>
    </div>
  );
}
