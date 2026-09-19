import { Link, useNavigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { LogoMark } from "@/components/Logo";

/**
 * Plain chrome for the admin pages. Deliberately not the public Layout — the
 * marketing Navbar, Footer and WhatsApp button have no place here.
 */
export default function AdminShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f2ea]">
      <header className="bg-[#33291f] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/admin" className="flex items-center gap-2.5">
            <LogoMark className="w-7 h-7" />
            <span className="font-serif-display tracking-[0.18em] text-sm">MEGADREAM ADMIN</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              View site
            </Link>
            {session?.user.email && (
              <span className="hidden sm:inline text-white/50">{session.user.email}</span>
            )}
            <button
              onClick={async () => {
                await signOut();
                navigate("/admin/login", { replace: true });
              }}
              className="border border-white/25 rounded-md px-3 py-1.5 hover:bg-white hover:text-[#2b241d] transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-serif-display text-3xl text-[#2b241d]">{title}</h1>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
