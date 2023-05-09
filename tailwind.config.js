/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    	colors: {
        	'blink-black-1': '#0B0C10',
        	'blink-black-2': '#1A1A1D',
        	'blink-black-3': '#272727',
        	'blink-blue-1': '#00cdac',
          'blink-gray-1': '#dbdbdb',
          'blink-gray-2': '#737373',
          'blink-red-1': '#eb3349',

      	},
      	backgroundImage: {
      		'blink-gradient-1': "linear-gradient(45deg, #02aab0 , #00cdac)",
      		'blink-gradient-3': "linear-gradient(45deg, #2193b0 , #6dd5ed)",
      		'blink-gradient-5': "linear-gradient(to right, #eb3349 , #f45c43)",
      		'blink-gradient-6': "linear-gradient(45deg, #ff512f , #dd2476)",
      		'blink-gradient-7': "linear-gradient(to right, #4568dc , #b06ab3)",
      		'blink-gradient-8': "radial-gradient(circle at 25% 80%, #5680E9 , #84CEEB, #5AB9EA, #C1C8E4)",
      		'bl-grad-black': "linear-gradient(45deg,#0B0C10,#1A1A1D)",
      		'bl-grad-black-bottom': "linear-gradient(to bottom,#0B0C10,#272727)",

      	},
      	fontFamily: {
			'sans': ['Poppins', 'sans-serif'],
			
    	},
    },
  },
  plugins: [],
}


