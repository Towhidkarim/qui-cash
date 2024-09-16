import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

let sql: ReturnType<typeof postgres>;
if (process.env.NODE_ENV === 'development') {
  if (!global.__sql) {
    global.__sql = postgres(process.env.DATABASE_URL as string, {
      ssl: false,
    });
  }
  sql = global.__sql;
} else {
  sql = postgres(process.env.DATABASE_URL as string, {
    ssl: false,
  });
}

// const queryClient = postgres(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}
