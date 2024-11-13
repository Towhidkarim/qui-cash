'use server';

import { routes } from '@/lib/constants';
import { validateRequest } from '@/lib/db/auth';
import { db } from '@/lib/db/database';
import { accountsTable, transactionsTable, userTable } from '@/lib/db/schema';
import { and, desc, eq, gte, lt, or, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { redirect } from 'next/navigation';

export async function GetAccountInfoAction() {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);

  try {
    const accountInfo = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.ownerID, user.id));

    return accountInfo[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function GetTransactionHistoryAction(count: number) {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);

  try {
    const accountID = (
      await db
        .select({ id: accountsTable.accountID })
        .from(accountsTable)
        .where(eq(accountsTable.ownerID, user.id))
    )[0].id;
    const sender = alias(userTable, 'sender');
    const receiver = alias(userTable, 'receiver');
    const history = await db
      .select({
        senderName: sender.username,
        receiverName: receiver.username,
        amount: transactionsTable.amount,
        transactionTime: transactionsTable.transactionsTime,
        transactionID: transactionsTable.transactionsID,
        status: transactionsTable.status,
      })
      .from(transactionsTable)
      .innerJoin(receiver, eq(transactionsTable.receiverUserID, receiver.id))
      .innerJoin(sender, eq(transactionsTable.senderUserID, sender.id))
      .where(
        or(
          eq(transactionsTable.senderAccountID, accountID),
          eq(transactionsTable.receiverAccountID, accountID),
        ),
      )
      .orderBy(desc(transactionsTable.transactionsTime));

    const refinedData = history.map((value) => ({
      ...value,
      receiverName: value.receiverName as string,
      senderName: value.senderName as string,
      secondPerson:
        value.receiverName === user.username
          ? value.senderName
          : value.receiverName,
      transactionType:
        value.receiverName === user.username
          ? ('money received' as const)
          : ('money sent' as const),
    }));

    return refinedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function GetRecentTransactionTotal() {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);

  try {
    const sevenDaysAgo = sql`NOW() - INTERVAL '7 days'`;
    const outwardAmount = await db
      .select({
        sum: sql<number>`cast(sum(${transactionsTable.amount}) as int)`,
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.senderUserID, user.id),
          gte(transactionsTable.transactionsTime, sevenDaysAgo),
        ),
      );

    const inwardAmount = await db
      .select({
        sum: sql<number>`cast(sum(${transactionsTable.amount}) as int)`,
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.receiverAccountID, user.id),
          gte(transactionsTable.transactionsTime, sevenDaysAgo),
        ),
      );

    return { outward: outwardAmount[0].sum, inward: inwardAmount[0].sum };
  } catch (error) {
    console.log(error);
  }
}
