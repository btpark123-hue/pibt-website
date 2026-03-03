/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-navy': '#1A237E',
                'electric-blue': '#2979FF',
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
