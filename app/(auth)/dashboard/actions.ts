'use server';

import { routes } from '@/lib/constants';
import { validateRequest } from '@/lib/db/auth';
import { db } from '@/lib/db/database';
import { accountsTable, transactionsTable, userTable } from '@/lib/db/schema';
import { eq, or } from 'drizzle-orm';
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
      .innerJoin(userTable, eq(transactionsTable.receiverUserID, receiver.id))
      .innerJoin(userTable, eq(transactionsTable.senderUserID, sender.id))
      .where(
        or(
          eq(transactionsTable.senderAccountID, user.id),
          eq(transactionsTable.receiverAccountID, user.id),
        ),
      );

    const refinedData = history.map((value) => ({
      ...value,
      receiverName: value.receiverName as string,
      senderName: value.senderName as string,
      secondPerson:
        value.receiverName === user.username
          ? value.senderName
          : value.receiverName,
      transactionType:
        value.receiverName === user.username ? 'money received' : 'money sent',
    }));

    return refinedData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
