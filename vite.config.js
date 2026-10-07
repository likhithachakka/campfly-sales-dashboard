import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
