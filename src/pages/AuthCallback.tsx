import { useAuth } from "@getmocha/users-service/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const { exchangeCodeForSessionToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        navigate("/onboarding");
      } catch (err) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {error ? (
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-slate-600 text-sm mt-2">Redirecting to login...</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-spin mb-4 inline-block">
            <Loader2 className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-slate-700 font-medium">Completing authentication...</p>
        </div>
      )}
    </div>
  );
}
