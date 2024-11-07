import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env',
});
let dbUrl;
if (process.env.NODE_ENV === 'development') dbUrl = process.env.DATABASE_URL;
else dbUrl = process.env.NEON_DB_URL;

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  dbCredentials: {
    url: dbUrl!,
  },
});
