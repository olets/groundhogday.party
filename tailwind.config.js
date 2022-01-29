module.exports = {
  content: ['./src/pages/**/*.html.twig'],
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
}
