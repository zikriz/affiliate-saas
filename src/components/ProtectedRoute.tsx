import { useAuth } from "@getmocha/users-service/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/login");
    }
  }, [user, isPending, navigate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin">
          <Loader2 className="w-10 h-10 text-blue-600" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
