import { useState, useMemo } from 'react';
import { useData } from '../context';

export const useSearch = () => {
	const { searchEvents } = useData();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredEvents = useMemo(() => {
		return searchEvents(searchQuery);
	}, [searchEvents, searchQuery]);

	const clearSearch = () => {
		setSearchQuery('');
	};

	return {
		searchQuery,
		setSearchQuery,
		filteredEvents,
		clearSearch,
		hasResults: filteredEvents.length > 0,
		totalResults: filteredEvents.length,
		isSearching: searchQuery.trim().length > 0,
	};
};
