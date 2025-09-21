"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { supabase } from "@/utils/supabaseClient";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLink, setactiveLink] = useState("home");
  const [session, setSession] = useState<any>(null);
  const fetchSession = async () => {
    const currenSession = await supabase.auth.getSession();
    setSession(currenSession.data.session);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    window.alert("You've logged out successfully");
  };

  useEffect(() => {
    fetchSession();
    const { data: sessionListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      sessionListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-text w-full max-w-[1500px] text-white fixed top-0 z-50">
      <div className="text-2xl tracking-wider select-none">
        <b className="text-header">D</b>ish
        <b className="text-header">D</b>
        iscover
      </div>

      <div className="hidden lg:flex justify-center items-center gap-6">
        <Link
          href="/"
          onClick={() => {
            setactiveLink("home");
          }}
          className={`${activeLink == "home" ? "text-header" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          onClick={() => {
            setactiveLink("favorites");
          }}
          className={`${activeLink == "favorites" ? "text-header" : ""}`}
        >
          Favorites
        </Link>
      </div>
      {session ? (
        <button
          onClick={logout}
          className={` ${
            loading ? "bg-gray-500" : "bg-header"
          } hidden lg:block  border-1 border-header px-3 py-2 rounded-md hover:bg-transparent  cursor-pointer duration-150`}
        >
          {loading ? "Logging out..." : "Log out"}
        </button>
      ) : (
        <Link
          href={"/auth"}
          className="hidden lg:block border-1 border-header px-3 py-2 rounded-md hover:bg-header cursor-pointer duration-150"
        >
          Sign in
        </Link>
      )}

      <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-text flex flex-col items-center gap-6 py-6 lg:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/recipes" onClick={() => setIsOpen(false)}>
            Favorites
          </Link>
          {session ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className={` ${
                loading ? "bg-gray-500" : "bg-header"
              } hidden lg:block  border-1 border-header px-3 py-2 rounded-md hover:bg-transparent  cursor-pointer duration-150`}
            >
              {loading ? "Logging out..." : "Log out"}
            </button>
          ) : (
            <Link
              href={"/auth"}
              onClick={() => setIsOpen(false)}
              className=" border-1 border-header px-3 py-2 rounded-md hover:bg-header duration-150"
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </nav>
  );
}
