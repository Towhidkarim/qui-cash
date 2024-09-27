export const routes = {
  signUp: '/signup',
  signin: '/signin',
  dashboard: '/dashboard',
  transactionHistory: '/dashboard/history',
  transfer: '/dashboard/transfer',
  connect: '/dashboard/connect',
  banks: '/dashboard/banks',
};

export const queryKeys = {
  account: 'accountData',
  recentTransactions: 'recentTransactions',
};
export type TtabsContent = {
  title: string;
  icon: React.ReactNode;
  url: string;
}[];
