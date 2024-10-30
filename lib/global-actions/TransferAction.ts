'use server';

import { redirect } from 'next/navigation';
import { validateRequest } from '../db/auth';
import { routes } from '../constants';
import { z } from 'zod';
import { db } from '../db/database';
import { accountsTable } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

type TransferInfo = {
  senderAccountID: string;
  recipientAccountID: string;
  amount: number;
};

const TransferSchema = z.object({
  senderAccountID: z.string().min(9),
  recipientAccountID: z.string().min(9),
  amount: z.number().nonnegative().min(1),
});

export default async function TransferMoneyAction({
  senderAccountID,
  recipientAccountID,
  amount,
}: z.infer<typeof TransferSchema>) {
  const session = await validateRequest();
  if (!session.user) redirect('/');

  const { data: parsedData, success } = await TransferSchema.safeParseAsync({
    senderAccountID,
    recipientAccountID,
    amount,
  });
  if (!success) redirect('/');

  try {
    // await db
    //   .update(accountsTable)
    //   .set({ balance: sql`${accountsTable.balance} + ${parsedData.amount}` })
    //   .where(eq(accountsTable.accountID, parsedData.recipientAccountID));
    await db
      .update(accountsTable)
      .set({
        balance: sql`balance + CASE 
                    WHEN ${accountsTable.accountID} = ${parsedData.recipientAccountID} THEN ${parsedData.amount}
                    WHEN ${accountsTable.accountID} = ${parsedData.senderAccountID} THEN -${parsedData.amount}
                    ELSE 0 
                  END`,
      })
      .where(
        sql`${accountsTable.accountID} IN (${parsedData.recipientAccountID}, ${parsedData.senderAccountID})`,
      )
      .execute();
    return { ok: true, message: 'Transfer Succesful' };
  } catch (error) {
    return { ok: false, message: 'Something Went Wrong!' };
  }
}
