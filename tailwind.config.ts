import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#235470', ink: '#16384C', soft: '#3E708F' },
        gold: { DEFAULT: '#F5D78C', deep: '#E3BC5A' },
        sand: '#FBF7EF',
        mist: '#E9F1F3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      maxWidth: { wrap: '72rem' },
    },
  },
  plugins: [],
};
export default config;
