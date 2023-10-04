module.exports = {
  purge: ['./src/**/*.vue', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        'nixie': ['NixieOne', 'nixieone'], 
      },
      borderWidth: {
        'button': '2px',
      },
      borderColor: {
        'button': '#0751bf',
      },
      backgroundColor: {
        'button-inactive': 'rgba(19, 24, 32, 0.45)',
        'card-blue': '#182233',
        'button': '#131820',
        'button-hover': '#0a0f14',
        'button-active': '#1a2026',
      },
      textColor: {
        'button': '#0751bf',
        'button-inactive': '#0751bf',
        'teal': '#5d9fa5',
      },
      textShadow: {
        'button': '0 0 2px #0751bf',
      },
      minHeight: {
        'content': '400px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.placeholder-blue::placeholder': {
          color: '#0751bf',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
