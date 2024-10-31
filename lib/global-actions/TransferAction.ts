'use server';

import { redirect } from 'next/navigation';
import { validateRequest } from '../db/auth';
import { routes } from '../constants';
import { z } from 'zod';
import { db } from '../db/database';
import { accountsTable, transactionsTable, userTable } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

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
  const { user } = await validateRequest();
  if (!user) redirect('/');

  const { data: parsedData, success } = await TransferSchema.safeParseAsync({
    senderAccountID,
    recipientAccountID,
    amount,
  });
  if (!success) redirect('/');

  try {
    await db.transaction(async (tx) => {
      const recipientUserID = (
        await tx
          .select({ id: accountsTable.ownerID })
          .from(accountsTable)
          .where(eq(accountsTable.accountID, parsedData.recipientAccountID))
      )[0].id;

      await tx
        .update(accountsTable)
        .set({ balance: sql`${accountsTable.balance} + ${parsedData.amount}` })
        .where(eq(accountsTable.accountID, parsedData.recipientAccountID));

      await tx
        .update(accountsTable)
        .set({ balance: sql`${accountsTable.balance} - ${parsedData.amount}` })
        .where(eq(accountsTable.accountID, parsedData.senderAccountID));

      const transactionsID = generateIdFromEntropySize(10);

      await tx.insert(transactionsTable).values({
        amount,
        receiverAccountID: parsedData.recipientAccountID,
        senderAccountID: parsedData.senderAccountID,
        receiverUserID: recipientUserID,
        senderUserID: user.id,
        status: 'success',
        transactionType: 'transfer',
        transactionsID,
      });
    });

    return { ok: true, message: 'Transfer Succesful' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Something Went Wrong!' };
  }
}
