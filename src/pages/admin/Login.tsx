import { useState, type FormEvent } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/lib/auth";
import { LogoMark } from "@/components/Logo";

export default function AdminLogin() {
  const { session, loading, configured, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? "/admin"} replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);
    if (signInError) setError(signInError);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#33291f] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <LogoMark className="w-9 h-9" />
          <span className="font-serif-display text-white tracking-[0.18em]">MEGADREAM</span>
        </div>

        <div className="bg-[#faf7f1] rounded-2xl p-8">
          <h1 className="font-serif-display text-2xl text-[#2b241d]">Admin sign in</h1>
          <p className="text-sm text-[#6b6156] mt-2 leading-relaxed">
            Sign in to add or edit the projects shown on the website.
          </p>

          {!configured && (
            <p className="mt-6 text-sm text-[#8a2f2f] bg-[#f7e9e9] border border-[#e6cccc] rounded-lg p-3 leading-relaxed">
              This deployment has no Supabase credentials set, so sign-in is unavailable. Set
              VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and redeploy.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#6b6156] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#2b241d] focus:outline-none focus:ring-2 focus:ring-[#33291f]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#6b6156] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#e2d9c8] rounded-lg text-[#2b241d] focus:outline-none focus:ring-2 focus:ring-[#33291f]"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-[#8a2f2f]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !configured}
              className="w-full bg-[#33291f] text-white py-3 rounded-lg font-medium hover:bg-[#241c14] transition-colors disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
