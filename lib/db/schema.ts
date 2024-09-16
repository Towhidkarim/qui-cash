import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { generateIdFromEntropySize } from 'lucia';
import { createInsertSchema } from 'drizzle-zod';

export const userTable = pgTable('user', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('passwordHash').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  address: text('address').notNull(),
  state: text('state').notNull(),
  nid: text('nid').notNull(),
  postalCode: text('postalCode').notNull(),
  dateOfBirth: timestamp('dateOfBirth').notNull(),
});

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type TUser = typeof userTable.$inferSelect;

// export const UserTypeSchema = createInsertSchema(user)
