module.exports = {
  content: ['./src/views/**/*.html.twig'],
  theme: {
    extend: {
      backgroundImage: {
        'groundhog': "url('https://olets.github.io/assets/images/groundhogs-facing.jpg')",
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
      }
    }
  },
  plugins: [
    ({ addBase, addComponents }) => {
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
    }
  ]
}
