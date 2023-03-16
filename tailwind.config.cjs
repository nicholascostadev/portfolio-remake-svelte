/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				title: ['Excon', 'sans-serif'],
				sans: ['Satoshi', 'sans-serif']
			}
		}
	},
	plugins: []
};
