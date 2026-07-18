/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./apps/www-kamila/src/**/*.{html,ts,scss}'],
	theme: {
		extend: {
			colors: {
				'sage-green': '#7a9a83',
				'forest-green': '#3f5344',
				'gold-accent': '#c7a977',
				'warm-white': '#faf9f6',
				charcoal: '#4a4a4a',
			},
			fontFamily: {
				sans: ['Lexend', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
		},
	},
};