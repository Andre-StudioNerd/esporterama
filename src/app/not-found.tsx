"use client";

import Button from "@/layout/ui/button";
import {
  TheaterComedy,
  Home,
  Event,
  Palette,
  CalendarToday,
} from "@mui/icons-material";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <TheaterComedy
          className="text-gray-400 mb-8"
          style={{ fontSize: "6rem" }}
        />

        <h1 className="text-6xl font-fjalla text-gray-800 mb-4">404</h1>

        <h2 className="text-3xl font-fjalla text-gray-700 mb-6">
          Página Não Encontrada
        </h2>

        <p
          className="text-lg text-gray-600 mb-8"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Ops! Parece que você se perdeu no meio dos jogos. A página que você
          está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => (window.location.href = "/")}>
            <span className="flex items-center gap-2">
              <Home style={{ fontSize: "1.2rem" }} />
              Voltar ao Início
            </span>
          </Button>

          <Button
            onClick={() => (window.location.href = "/eventos")}
            className="bg-gray-800 hover:bg-gray-700"
          >
            <span className="flex items-center gap-2">
              <Event style={{ fontSize: "1.2rem" }} />
              Ver Jogos
            </span>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-fjalla text-gray-800 mb-4">
            Enquanto isso, que tal explorar:
          </h3>

          <div className="space-y-2">
            <Link
              href="/categories"
              className="text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              <Palette style={{ fontSize: "1.2rem" }} />
              Nossas Categorias
            </Link>

            <Link
              href="/events"
              className="text-purple-600 hover:text-purple-500 transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              <CalendarToday style={{ fontSize: "1.2rem" }} />
              Próximos Jogos
            </Link>
          </div>
        </div>

        <div
          className="mt-8 text-sm text-gray-500"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Se você acredita que isso é um erro, entre em contato conosco.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
