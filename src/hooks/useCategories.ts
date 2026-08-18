import { useMemo } from 'react';
import { useData } from '../context';
import { type Category } from '../types';

export const useCategories = () => {
	const { categories, getEventsByCategory } = useData();

	const categoriesWithEventCount = useMemo(() => {
		return categories.map((category) => ({
			...category,
			eventCount: getEventsByCategory(category.id).length,
		}));
	}, [categories, getEventsByCategory]);

	const getCategoryById = (id: number): Category | undefined => {
		return categories.find((category) => category.id === id);
	};

	const getCategoryName = (categoryId: number): string => {
		const category = getCategoryById(categoryId);
		return category ? category.name : 'Categoria não encontrada';
	};

	return {
		categories,
		categoriesWithEventCount,
		getCategoryById,
		getCategoryName,
		getEventsByCategory,
	};
};
