import { useMemo } from 'react';
import { useData } from '../context';
import { type Event } from '../types';

export const useEvents = () => {
	const { events } = useData();

	const upcomingEvents = useMemo(() => {
		const now = new Date();
		return events
			.filter((event) => new Date(event.date) >= now)
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	}, [events]);

	const pastEvents = useMemo(() => {
		const now = new Date();
		return events
			.filter((event) => new Date(event.date) < now)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}, [events]);

	const getEventById = (id: number): Event | undefined => {
		return events.find((event) => event.id === id);
	};

	const getEventsByLocation = (location: string): Event[] => {
		return events.filter((event) => event.location.toLowerCase().includes(location.toLowerCase()));
	};

	const getEventsByDateRange = (startDate: Date, endDate: Date): Event[] => {
		return events.filter((event) => {
			const eventDate = new Date(event.date);
			return eventDate >= startDate && eventDate <= endDate;
		});
	};

	const formatEventDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const formatEventDateTime = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		});
	};

	return {
		events,
		upcomingEvents,
		pastEvents,
		getEventById,
		getEventsByLocation,
		getEventsByDateRange,
		formatEventDate,
		formatEventDateTime,
	};
};
