import { ReactNode } from "react";

/**
 * Temporary ProtectedRoute that simply renders children.
 * You can later replace this with real auth logic (e.g. Supabase session check).
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return <>{children}</>;
}