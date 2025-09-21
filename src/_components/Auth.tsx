"use client";

import { supabase } from "@/utils/supabaseClient";
import { useState, FormEvent } from "react";
import { redirect } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (mode === "signUp") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setLoading(false);
        window.alert(`Error Signing Up: ${signUpError.message}`);
        return;
      }
      window.alert(
        "Sign Up successful! Check your email to confirm. Or you may be signed up already with this email"
      );
      setLoading(false);
    } else if (mode === "signIn") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setLoading(false);
        window.alert(`Error Signing in: ${signInError.message}`);
        return;
      }
      setLoading(false);
      // window.alert("Signed in successfully!");
      redirect("/");
    }
  };

  return (
    <div className="bg-text p-8 py-10 w-screen max-w-[600px] rounded-lg">
      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-100"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-containerHover sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md ${
              loading
                ? "bg-white text-black hover:bg-white hover:text-black"
                : "bg-containerHover text-white"
            }  border border-containerHover px-3 py-1.5 text-sm/6 font-semibold  cursor-pointer hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-containerHover`}
          >
            {loading
              ? "Processing..."
              : mode === "signIn"
              ? "Sign in"
              : "Sign up"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center text-sm text-gray-300">
        {mode === "signIn" ? (
          <>
            Don't have an account?{" "}
            <button
              className="font-semibold text-white hover:text-containerHover"
              onClick={() => setMode("signUp")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="font-semibold text-white hover:text-containerHover cursor-pointer"
              onClick={() => setMode("signIn")}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
