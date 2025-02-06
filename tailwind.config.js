/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './ui/**/*.{js,jsx,ts,tsx}',
    './node_modules/@metamask/design-system-react/**/*.{cjs,mjs}',
  ],
  // eslint-disable-next-line node/global-require
  presets: [require('@metamask/design-system-tailwind-preset')],
  plugins: [],
};
