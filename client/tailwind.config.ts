import { join } from 'path'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [join(__dirname, 'src/**/*.{js,jsx,ts,tsx,html,css}')],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
