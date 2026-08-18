export interface Category {
	id: number;
	name: string;
}

export interface Event {
	id: number;
	name: string;
	image: string;
	description: string;
	date: string;
	categoryId: number;
	location: string;
}

export interface DataContextType {
	categories: Category[];
	events: Event[];
	loading: boolean;
	error: string | null;
	getEventsByCategory: (categoryId: number) => Event[];
	searchEvents: (query: string) => Event[];
	refreshData: () => Promise<void>;
}
