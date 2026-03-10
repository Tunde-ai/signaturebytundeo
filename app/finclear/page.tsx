"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function FinClearLogin() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/finclear/app");
    }
  }, [status, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/finclear/app");
    }
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 bg-gradient-to-b from-navy via-navy-light to-navy">
      <div className="w-full max-w-md mx-auto px-4">
        {/* FinClear Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center">
              <span className="text-gold font-bold text-lg">FC</span>
            </div>
            <span className="text-2xl font-heading font-bold text-cream">
              FinClear
            </span>
          </div>
          <p className="text-slate text-sm">
            Client-Accountant Financial Portal
          </p>
          <p className="text-gold/60 text-xs mt-1">
            by Signature By Tunde O
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
          <h2 className="text-xl font-heading font-bold text-cream mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fc-email"
                className="block text-sm font-medium text-cream mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="fc-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="fc-password"
                className="block text-sm font-medium text-cream mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="fc-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy border border-gold/30 rounded px-4 py-3 text-cream placeholder-slate/50 focus:outline-none focus:border-gold transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In to FinClear"}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-6 border-t border-gold/10">
            <p className="text-xs text-slate text-center mb-3">
              Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setEmail("demo@finclear.com");
                  setPassword("demo123");
                }}
                className="text-xs border border-gold/20 rounded px-3 py-2 text-slate hover:text-gold hover:border-gold/40 transition-colors"
              >
                Client Demo
              </button>
              <button
                onClick={() => {
                  setEmail(process.env.NEXT_PUBLIC_TUNDE_EMAIL || "");
                  setPassword("");
                }}
                className="text-xs border border-gold/20 rounded px-3 py-2 text-slate hover:text-gold hover:border-gold/40 transition-colors"
              >
                Accountant Login
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-gold text-lg mb-1">&#9638;</div>
            <p className="text-xs text-slate">Dashboard</p>
          </div>
          <div>
            <div className="text-gold text-lg mb-1">&#128196;</div>
            <p className="text-xs text-slate">Documents</p>
          </div>
          <div>
            <div className="text-gold text-lg mb-1">&#9878;</div>
            <p className="text-xs text-slate">AI Reports</p>
          </div>
        </div>
      </div>
    </section>
  );
}
