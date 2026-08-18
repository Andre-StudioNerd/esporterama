import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Category, type Event, type DataContextType } from '../types';

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3001';

interface DataProviderProps {
	children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	console.log('events data context', events);
	console.log('categories data context', categories);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const [categoriesResponse, eventsResponse] = await Promise.all([
				fetch(`${API_BASE_URL}/categories`),
				fetch(`${API_BASE_URL}/events`),
			]);

			if (!categoriesResponse.ok || !eventsResponse.ok) {
				throw new Error('Erro ao carregar dados');
			}

			const categoriesData = await categoriesResponse.json();
			const eventsData = await eventsResponse.json();

			// Garantir que os IDs sejam números
			const processedCategories = categoriesData.map((cat: Category) => ({
				...cat,
				id: Number(cat.id),
			}));

			const processedEvents = eventsData.map((event: Event) => ({
				...event,
				id: Number(event.id),
				categoryId: Number(event.categoryId),
			}));

			setCategories(processedCategories);
			setEvents(processedEvents);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Erro desconhecido');
			console.error('Erro ao carregar dados:', err);
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
				event.location.toLowerCase().includes(lowerQuery)
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

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error('useData deve ser usado dentro de um DataProvider');
	}
	return context;
};
