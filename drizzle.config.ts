import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
