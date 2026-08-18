"use client";

import { useState } from "react";
import { useData } from "@/context";
import { useEvents, useCategories, useSearch } from "@/hooks";
import EventCard from "@/layout/ui/event-card";
import CategoryCard from "@/layout/ui/category-card";
import Button from "@/layout/ui/button";
import { Warning, Star, Search, Event } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { loading, error } = useData();
  const { upcomingEvents, formatEventDate } = useEvents();
  const { categoriesWithEventCount, getCategoryName } = useCategories();
  const { searchQuery, setSearchQuery, filteredEvents, isSearching } =
    useSearch();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl font-fjalla text-gray-600">
            Carregando jogos incríveis...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Warning className="text-red-500" style={{ fontSize: "4rem" }} />
          <h2 className="text-2xl font-fjalla text-gray-800 mb-4">
            Ops! Algo deu errado
          </h2>
          <p
            className="text-gray-600 mb-6"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  const featuredEvents = upcomingEvents.slice(0, 3);
  const categoryColors = [
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
    "#000000",
  ];

  const eventsToShow = isSearching
    ? filteredEvents
    : selectedCategory
      ? upcomingEvents.filter((event) => event.categoryId === selectedCategory)
      : upcomingEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl leading-tight md:leading-snug font-fjalla mb-6 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent">
              Descubra os jogos
            </h1>
            <p
              className="mt-6 md:mt-8 text-xl md:text-2xl max-w-4xl mx-auto"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Os melhores jogos do Brasil estão aqui. Futebol, basquete e muito
              mais te esperam!
            </p>
          </div>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-fjalla mb-8 text-center flex items-center justify-center gap-3">
                <Star
                  className="text-purple-600"
                  style={{ fontSize: "2rem" }}
                />
                Jogos em Destaque
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
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
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
              Explore por Categoria
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Encontre exatamente o que você procura navegando pelas nossas
              categorias
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categoriesWithEventCount.map((category, index) => (
              <div
                key={category.id}
                className={`transform transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "ring-4 ring-purple-600 ring-opacity-50"
                    : ""
                }`}
                onClick={() => router.push(`/categories/${category.id}`)}
              >
                <CategoryCard
                  title={`${category.name.toUpperCase()} (${category.eventCount})`}
                  backgroundColor={
                    categoryColors[index % categoryColors.length]
                  }
                />
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="text-center mb-8">
              <Button onClick={() => setSelectedCategory(null)}>
                Ver Todos os Jogos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Search Results or Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-fjalla text-gray-800 mb-4">
              <span className="flex items-center justify-center gap-3">
                {isSearching ? (
                  <>
                    <Search
                      className="text-blue-500"
                      style={{ fontSize: "2.5rem" }}
                    />
                    Resultados da Busca &ldquo;{searchQuery}&rdquo;
                  </>
                ) : selectedCategory ? (
                  <>
                    <Event
                      className="text-green-500"
                      style={{ fontSize: "2.5rem" }}
                    />
                    Jogos de {getCategoryName(selectedCategory)}
                  </>
                ) : (
                  <>Próximos Jogos</>
                )}
              </span>
            </h2>
            <p
              className="text-lg text-gray-600"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {isSearching
                ? `${filteredEvents.length} jogos(s) encontrado(s)`
                : selectedCategory
                  ? `Todos os jogos da categoria ${getCategoryName(selectedCategory)}`
                  : `${upcomingEvents.length} jogos incríveis te esperando`}
            </p>
          </div>

          {eventsToShow.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-fjalla text-gray-700 mb-4">
                {isSearching
                  ? "Nenhum evento encontrado"
                  : "Nenhum evento disponível"}
              </h3>
              <p
                className="text-gray-600 mb-8"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {isSearching
                  ? "Tente buscar por outro termo ou explore nossas categorias"
                  : "Novos jogos serão adicionados em breve!"}
              </p>
              {isSearching && (
                <Button onClick={() => setSearchQuery("")}>Limpar Busca</Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {eventsToShow.slice(0, 12).map((event) => (
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
          )}

          {eventsToShow.length > 12 && (
            <div className="text-center mt-12">
              <Button onClick={() => router.push("/events")}>
                Ver Mais Jogos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-fjalla mb-6">
            <span className="flex items-center justify-center gap-3">
              Não Perca Nenhum Jogo!
            </span>
          </h2>
          <p
            className="text-xl mb-8"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Inscreva-se para receber as novidades e ser o primeiro a saber dos
            melhores jogos.
          </p>
          <Button onClick={() => alert("Newsletter em breve!")}>
            Quero me Inscrever
          </Button>
          <p
            className="text-xl mb-8"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Este projeto foi desenvolvido para compor meu portfólio e foca na
            interface e na experiência visual (front-end). A aplicação utiliza
            um arquivo JSON local para simular a exibição e o consumo de dados,
            sem integração com banco de dados real ou interações complexas de
            usuário, servindo como demonstração de estrutura, layout e
            estilização.
          </p>
          <p
            className="text-xl mb-8 text-purple-500"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Desenvolvido por André Luís Fernades.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
