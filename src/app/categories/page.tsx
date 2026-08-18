"use client";

import { useParams } from "next/navigation";
import { useCategories, useEvents } from "@/hooks";
import CategoryCard from "@/layout/ui/category-card";
import EventCard from "@/layout/ui/event-card";
import Button from "@/layout/ui/button";
import {
  LocalFireDepartment,
  EmojiEvents,
  WorkspacePremium,
  MilitaryTech,
  FolderOpen,
} from "@mui/icons-material";

const Categories = () => {
  const { categoryId } = useParams();
  const { categoriesWithEventCount, getCategoryById, getEventsByCategory } =
    useCategories();
  const { formatEventDate } = useEvents();

  const selectedCategoryId = categoryId ? parseInt(categoryId as string) : null;
  const selectedCategory = selectedCategoryId
    ? getCategoryById(selectedCategoryId)
    : null;
  const categoryEvents = selectedCategoryId
    ? getEventsByCategory(selectedCategoryId)
    : [];

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

  if (selectedCategory) {
    // Página de categoria específica
    return (
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header da Categoria */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
              {selectedCategory.name}
            </h1>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Explore todos os jogos da categoria {selectedCategory.name}
            </p>
          </div>

          {/* Voltar */}
          <div className="mb-8">
            <Button onClick={() => window.history.back()}>
              ← Voltar para Categorias
            </Button>
          </div>

          {/* Eventos da Categoria */}
          {categoryEvents.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen
                className="text-gray-400 mb-4"
                style={{ fontSize: "4rem" }}
              />
              <h3 className="text-2xl font-fjalla text-gray-700 mb-4">
                Nenhum jogo nesta categoria
              </h3>
              <p
                className="text-gray-600"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Novos jogos serão adicionados em breve!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p
                  className="text-lg text-gray-600"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  <span className="font-semibold">{categoryEvents.length}</span>{" "}
                  jogo(s) encontrado(s)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryEvents.map((event) => (
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
            </>
          )}
        </div>
      </div>
    );
  }

  // Página de todas as categorias
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
            Todas as Categorias
          </h1>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Explore jogos por categoria e encontre exatamente o que você procura
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {categoriesWithEventCount.map((category, index) => (
            <div
              key={category.id}
              className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() =>
                (window.location.href = `/categories/${category.id}`)
              }
            >
              <CategoryCard
                title={`${category.name.toUpperCase()}`}
                backgroundColor={categoryColors[index % categoryColors.length]}
              />
              <div className="text-center mt-4">
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {category.eventCount} jogo(s)
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-fjalla text-gray-800 text-center mb-8 flex items-center justify-center gap-3">
            <LocalFireDepartment
              className="text-red-500"
              style={{ fontSize: "2rem" }}
            />
            Categorias Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoriesWithEventCount
              .sort((a, b) => b.eventCount - a.eventCount)
              .slice(0, 3)
              .map((category, index) => (
                <div
                  key={category.id}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <div className="mb-2">
                    {index === 0 ? (
                      <EmojiEvents
                        className="text-purple-600"
                        style={{ fontSize: "2rem" }}
                      />
                    ) : index === 1 ? (
                      <WorkspacePremium
                        className="text-gray-400"
                        style={{ fontSize: "2rem" }}
                      />
                    ) : (
                      <MilitaryTech
                        className="text-orange-600"
                        style={{ fontSize: "2rem" }}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-fjalla text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-3xl font-fjalla text-purple-600 mb-2">
                    {category.eventCount}
                  </p>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    jogos
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href = `/categories/${category.id}`)
                    }
                    className="mt-4"
                  >
                    Ver Jogos
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
