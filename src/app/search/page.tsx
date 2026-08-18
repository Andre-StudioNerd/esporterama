"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEvents } from "@/hooks";
import { useData } from "@/context";
import EventCard from "@/layout/ui/event-card";
import Button from "@/layout/ui/button";
import { Search as SearchIcon, FilterList, Event } from "@mui/icons-material";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const { searchEvents } = useData();
  const { formatEventDate } = useEvents();

  const results = searchEvents(query);

  useEffect(() => {
    // Se não houver query, redireciona para home
    if (!query) {
      router.push("/");
    }
  }, [query, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <SearchIcon
              className="text-blue-500"
              style={{ fontSize: "2rem" }}
            />
            <h1 className="text-3xl font-fjalla text-gray-800">
              Resultados da Busca
            </h1>
          </div>

          <div className="border-t pt-4">
            <p
              className="text-lg text-gray-600"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Você pesquisou por:{" "}
              <strong className="text-gray-800">&quot;{query}&quot;</strong>
            </p>
            <p
              className="text-sm text-gray-500 mt-2"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {results.length === 0
                ? "Nenhum resultado encontrado"
                : `${results.length} jogo(s) encontrado(s)`}
            </p>
          </div>
        </div>

        {/* Results Section */}
        {results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <SearchIcon
              className="text-gray-300 mb-4 mx-auto"
              style={{ fontSize: "5rem" }}
            />
            <h2 className="text-2xl font-fjalla text-gray-700 mb-4">
              Nenhum evento encontrado
            </h2>
            <p
              className="text-gray-600 mb-8 max-w-md mx-auto"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Não encontramos jogos que correspondam à sua busca. Tente usar
              palavras-chave diferentes ou explore nossas categorias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push("/events")}>
                <Event className="mr-2" style={{ fontSize: "1.2rem" }} />
                Ver Todos os jogos
              </Button>
              <Button
                onClick={() => router.push("/categories")}
                className="bg-gray-600 hover:bg-gray-700"
              >
                <FilterList className="mr-2" style={{ fontSize: "1.2rem" }} />
                Explorar Categorias
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Filters Info */}
            <div className="mb-6">
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Dica: Os resultados incluem jogos que contêm &quot;{query}&quot;
                no título, descrição ou localização
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((event) => (
                <div
                  key={event.id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <EventCard
                    imageUrl={event.image}
                    title={event.name}
                    date={formatEventDate(event.date)}
                    location={event.location}
                    href={`/events/${event.id}`}
                  />
                </div>
              ))}
            </div>

            {/* Load More / Actions */}
            {results.length > 12 && (
              <div className="text-center mt-12">
                <Button onClick={() => router.push("/events")}>
                  Ver Mais Jogos
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Suggestions Section */}
        {results.length > 0 && results.length < 4 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-fjalla text-gray-800 mb-4 text-center">
              Poucos resultados encontrados?
            </h3>
            <p
              className="text-gray-600 text-center mb-6"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Tente ampliar sua busca ou explore outras opções
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => router.push("/events")}>
                Ver Todos os Jogos
              </Button>
              <Button
                onClick={() => router.push("/categories")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Explorar por Categoria
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
