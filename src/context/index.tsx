import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Category, type Event, type DataContextType } from "../types";

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL =
  "https://raw.githubusercontent.com/Andre-StudioNerd/esporterama/main/db.json";

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("events data context", events);
  console.log("categories data context", categories);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chamada única para o arquivo db.json completo
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Erro ao carregar dados");
      }

      const data = await response.json();

      // Mapeamento e conversão de IDs para números
      const processedCategories = (data.categories || []).map(
        (cat: Category) => ({
          ...cat,
          id: Number(cat.id),
        }),
      );

      const processedEvents = (data.events || []).map((event: Event) => ({
        ...event,
        id: Number(event.id),
        categoryId: Number(event.categoryId),
      }));

      setCategories(processedCategories);
      setEvents(processedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const getEventsByCategory = (categoryId: number): Event[] => {
    return events.filter((event) => event.categoryId === categoryId);
  };

  const searchEvents = (query: string): Event[] => {
    if (!query.trim()) return events;

    const lowerQuery = query.toLowerCase();
    return events.filter(
      (event) =>
        event.name.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery),
    );
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue: DataContextType = {
    categories,
    events,
    loading,
    error,
    getEventsByCategory,
    searchEvents,
    refreshData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
};
