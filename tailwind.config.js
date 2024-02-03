module.exports = {
  content: ['./src/views/**/*.html.twig'],
  theme: {
    extend: {
      animation: {
        'confused-spin': 'confused-spin 10s linear infinite',
        spin: 'spin 6s linear infinite',
        'spin-double': 'spin 3s linear infinite',
        'spin-triple': 'spin 2s linear infinite',
      },
      backgroundImage: {
        'groundhog': "url('https://olets.github.io/assets/images/groundhogs-facing.jpg')",
      },
      dropShadow: {
        'heading': '0 0 10px white',
      },
      fontFamily: {
        sans: [
            'UnifrakturCook',
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ],
        serif: [
            'Modak',
            'Alegreya',
            'Georgia',
            'Cambria',
            '"Times New Roman"',
            'Times',
            'serif',
        ],
      },
      keyframes: {
        'confused-spin': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '10%': {
            transform: 'rotate(40deg)',
          },
          '30%': {
            transform: 'rotate(-60deg)',
          },
          '40%': {
            transform: 'rotate(-20deg)',
          },
          '60%': {
            transform: 'rotate(-90deg)',
          },
          '80%': {
            transform: 'rotate(-45deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        }
      },
    },
  },
  plugins: [
    ({ addBase, addComponents, matchUtilities }) => {
      addBase({
        a: {
          '@apply decoration-orange-300 transition-colors underline focus:decoration-orange-500 focus:text-orange-500 hover:decoration-orange-500 hover:text-orange-500': {},
        },
        em: {
          '@apply font-normal font-serif': {},
        },
        '@font-face': {
          fontFamily: 'Modak',
          src: 'url(Modak-Regular-subset.woff2) format("woff2")',
        },
        '@font-face': {
          fontFamily: 'UnifrakturCook',
          src: 'url(UnifrakturCook-Bold-subset.woff2) format("woff2")',
        },
      })

      addComponents({
        '.groundhog': {
          '@apply absolute bg-center bg-contain bg-groundhog inset-10 sm:inset-12 md:inset-20 lg:inset-24 xl:inset-32 p-5 sm:p-10 md:p-20 lg:p-32 xl:p-40': {},
        },
        '.part': {
          '@apply bg-black/70 leading-relaxed relative rounded-lg text-white': {},
        },
        '.spacing': {
          '@apply lg:space-y-20 md:space-y-16 space-y-10': {},
        },
      })

      matchUtilities(
        {
          'animation-direction': (value) => ({
            animationDirection: value,
          }),
        },
        {
          values: {
            normal: 'normal',
            reverse: 'reverse',
            alternate: 'alternate',
            alternateReverse: 'alternate-reverse',
          },
        },
      );
    }
  ]
}
