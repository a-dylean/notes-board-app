import { join } from 'path'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    join(__dirname, 'src/**/*.{js,jsx,ts,tsx,html,css}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class'],
}
export default config
