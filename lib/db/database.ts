import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

let sql: ReturnType<typeof postgres>;
const neonUrl = process.env.NEON_DB_URL;
const localUrl = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'development') {
  if (!global.__sql) {
    global.__sql = postgres(localUrl as string, {
      ssl: false,
    });
  }
  sql = global.__sql;
} else {
  sql = postgres(neonUrl as string);
}

// const queryClient = postgres(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}
