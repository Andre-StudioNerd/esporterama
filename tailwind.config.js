/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				fjalla: ['var(--font-fjalla)', 'Fjalla One', 'sans-serif'],
				'work-sans': ['var(--font-work-sans)', 'Work Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};