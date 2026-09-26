module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    // Tailwind CSS v4 の PostCSS プラグイン。v4 ではベンダープレフィックスも自動付与されるため autoprefixer は不要
    '@tailwindcss/postcss': {},
  },
};
