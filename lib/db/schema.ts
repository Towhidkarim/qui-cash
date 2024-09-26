import {
  integer,
  numeric,
  pgTable,
  doublePrecision,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { generateIdFromEntropySize } from 'lucia';
import { createInsertSchema } from 'drizzle-zod';

export const userTable = pgTable('user', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  mobileNumber: varchar('mobileNumber', { length: 12 }).notNull(),
  role: text('role', { enum: ['user', 'admin'] })
    .default('user')
    .notNull(),
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

export const accountsTable = pgTable('account', {
  accountID: text('accountID')
    .primaryKey()
    .notNull()
    .$defaultFn(() => 'ac' + generateIdFromEntropySize(10)),
  ownerID: text('ownerID')
    .notNull()
    .references(() => userTable.id),
  balance: doublePrecision('balance').default(0).notNull(),
  currencyMode: varchar('currencyMode', { enum: ['BDT', 'USD'] })
    .default('USD')
    .notNull(),
  accountType: varchar('accountType', {
    enum: ['personal', 'merchant', 'agency'],
  })
    .default('personal')
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const transactionsTable = pgTable('transaction', {
  transactionsID: text('transactionID')
    .primaryKey()
    .notNull()
    .$defaultFn(() => 'trx' + generateIdFromEntropySize(10)),
  receiverUserID: text('receiverUserID')
    .notNull()
    .references(() => userTable.id),
  senderUserID: text('senderUserID')
    .notNull()
    .references(() => userTable.id),
  senderAccountID: text('senderAccountID')
    .references(() => accountsTable.accountID)
    .notNull(),
  receiverAccountID: text('receiverAccountID')
    .references(() => accountsTable.accountID)
    .notNull(),
  status: varchar('status', {
    enum: ['success', 'pending', 'failed'],
  }).notNull(),
  amount: doublePrecision('amount').notNull(),
  transactionsTime: timestamp('transactionTime').defaultNow().notNull(),
  transactionType: text('transactionType').notNull(),
});

export type TUser = typeof userTable.$inferSelect;
export type TAccount = typeof accountsTable.$inferSelect;
export type TTransactions = typeof transactionsTable.$inferSelect;

// export const UserTypeSchema = createInsertSchema(user)
