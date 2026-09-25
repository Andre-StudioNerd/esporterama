"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const isActiveRoute = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 px-[15px]">
            <Link
              href="/"
              className={`text-3xl md:text-4xl font-bold tracking-tight transition-colors ${
                isActiveRoute("/events")
                  ? "text-purple-600"
                  : "text-white hover:text-purple-800"
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              ESPORTERAMA
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto sm:flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="O que você procura?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-full bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Buscar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <nav className="flex gap-6">
            <Link
              href="/events"
              className={`font-medium transition-colors ${
                isActiveRoute("/events")
                  ? "text-purple-600"
                  : "text-white hover:text-purple-800"
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Programação
            </Link>
            <Link
              href="/categories"
              className={`font-medium transition-colors ${
                isActiveRoute("/categories") ||
                pathname?.startsWith("/categories/")
                  ? "text-purple-600"
                  : "text-white hover:text-purple-800"
              }`}
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Categorias
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
