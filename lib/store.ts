import { create } from 'zustand';
import { TAccount } from './db/schema';

type State = {
  userID: string;
  userName: string;
  email: string;
  accountInfo: Omit<TAccount, 'createdAt'>;
};

type Action = {
  setAccountInfo: (accountDetails: TAccount) => void;
  setUserInfo: ({
    userID,
    userName,
    email,
  }: {
    userID: string;
    userName: string;
    email: string;
  }) => void;
};

export const useStore = create<State & Action>((set) => ({
  email: '',
  userID: '',
  userName: '',
  accountInfo: {
    accountID: '',
    balance: 0,
    accountType: 'personal',
    currencyMode: 'USD',
    ownerID: '',
  },

  setAccountInfo: (accountDetails: TAccount) =>
    set((state) => ({ accountInfo: accountDetails })),

  setUserInfo: ({
    userID,
    userName,
    email,
  }: {
    userID: string;
    userName: string;
    email: string;
  }) =>
    set(() => ({
      userID,
      userName,
      email,
    })),
}));
