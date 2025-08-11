"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setactiveLink] = useState("home");
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-text w-full max-w-[1500px] text-white fixed top-0 z-50">
      <div className="text-xl tracking-wider">
        <b className="text-containerHover">D</b>ish
        <b className="text-containerHover">D</b>
        iscover
      </div>

      <div className="hidden lg:flex justify-center items-center gap-6">
        <Link
          href="/"
          onClick={() => {
            setactiveLink("home");
          }}
          className={`${activeLink == "home" ? "text-containerHover" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          onClick={() => {
            setactiveLink("favorites");
          }}
          className={`${
            activeLink == "favorites" ? "text-containerHover" : ""
          }`}
        >
          Favorites
        </Link>
      </div>

      <button className="hidden lg:block border-1 border-containerHover px-3 py-2 rounded-md hover:bg-containerHover cursor-pointer">
        SignUp
      </button>

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
          <button
            onClick={() => setIsOpen(false)}
            className=" border-1 border-containerHover px-3 py-2 rounded-md hover:bg-containerHover"
          >
            SignUp
          </button>
        </nav>
      )}
    </nav>
  );
}
