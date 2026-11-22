import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works under the GitHub Pages subpath (/si-582-maketogether/).
// Hash routing means every screen is served from index.html, so no 404 fallback is needed.
export default defineConfig({ base: './', plugins: [react()] })
