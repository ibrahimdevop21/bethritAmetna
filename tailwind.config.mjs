/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
	],
	theme: {
		extend: {
			colors: {
				loyalty: {
					bronze: '#CD7F32',
					silver: '#C0C0C0',
					gold: '#FFD700',
					cream: '#F6F0E8',
					dark: '#1A1A1A',
				},
			},
			boxShadow: {
				'loyalty-card': '0 25px 60px rgba(0,0,0,0.45)',
			},
			borderRadius: {
				'2xl': '1.5rem',
			},
		},
	},
	plugins: [],
};
