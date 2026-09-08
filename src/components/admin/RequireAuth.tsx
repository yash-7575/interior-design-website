import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/lib/auth";

/**
 * Route guard for everything under /admin. Renders nothing decisive until the
 * stored session has been restored, so a page refresh does not bounce a
 * signed-in user back to the login screen.
 */
export default function RequireAuth() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f2ea] flex items-center justify-center">
        <p className="text-sm text-[#8a7d6c]">Checking your session…</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
