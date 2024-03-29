const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./node_modules/flowbite-react/lib/**/*.js",'./src/**/*.{js,ts,jsx,tsx}', './src/components/carousel/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCFCFC',
          100: '#FCFCFC',
          200: '#FCFCFC',
          300: '#FCFCFC',
          400: '#FAFAFA',
          500: '#FAFAFA',
          600: '#E3E3E3',
          700: '#C7C7C7',
          800: '#A6A6A6',
          900: '#787878',
          950: '#595959',
        },
        secondary: {
          50: '#FFF9F0',
          100: '#FFF5E5',
          200: '#FFEBCC',
          300: '#FFDEAD',
          400: '#FFD494',
          500: '#FFC56E',
          600: '#FFA929',
          700: '#EB8D00',
          800: '#C77700',
          900: '#8A5300',
          950: '#663D00',
        },
        success: colors.green,
        info: colors.cyan,
        danger: colors.red,
        warning: colors.orange,
        light: colors.white,
        dark: colors.black,
      },
      textColor: {
        palette: {
          base: withOpacity('--color-text-base'),
          mute: withOpacity('--color-text-muted'),
          side: withOpacity('--color-text-side'),
        },
      },
      backgroundColor: {
        palette: {
          fill: withOpacity('--color-bg'),
          card: withOpacity('--color-bg-side'),
          dark: withOpacity('--color-bg-dark'),
          digitalCategory: 'var(--digital-category-bgc)',
          fashionCategory: 'var(--fashion-category-bgc)',
          beautyCategory: 'var( --beauty-category-bgc)',
          sportCategory: 'var(--sport-category-bgc)',
          houseCategory: 'var(--house-category-bgc)',
          toyCategory: 'var(--toy-category-bgc)',
          stationeryCategory: 'var(--stationery-category-bgc)',
        },
      },
      fontFamily: {
        farsi: "'iranyekan', 'IRANSans', 'Tahoma'",
        english: "'Poppins', 'Roboto', 'sans-serif'",
      },
      keyframes: {
        sidenavLTR: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
        sidenavRTL: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        dropDown: {
          '0%': { opacity: 0, transform: 'scaleY(0)' },
          '100%': { opacity: 1, transform: 'scaleY(1)' },
        },
      },
      animation: {
        sidenavLTREntering: 'sidenavLTR 0.3s ease-in-out forwards',
        sidenavRTLEntering: 'sidenavRTL 0.3s ease-in-out forwards',
        sidenavLTRExit: 'sidenavLTR 0.3s ease-in-out reverse forwards',
        sidenavRTLExit: 'sidenavRTL 0.3s ease-in-out reverse forwards',
        fadeEntering: 'fade 0.3s forwards',
        fadeExit: 'fade 0.3s reverse forwards',
        dropDown: 'dropDown 0.3s forwards',
        dropDownExit: 'dropDown 0.3s reverse forwards',
      },
      backgroundImage: {
        offersBG: "url('/images/carouselBox-bg/offersbg.webp')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
