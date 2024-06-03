/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                "hotel-background": "url('../frontend/src/assets/hotelBackground.jpeg')"
                // "footer-texture": "url('/img/footer-texture.png')"
            }
        }
    },
    plugins: []
};
