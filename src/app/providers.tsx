'use client';

import { DataProvider } from '@/context';

export function Providers({ children }: { children: React.ReactNode }) {
	return <DataProvider>{children}</DataProvider>;
}
