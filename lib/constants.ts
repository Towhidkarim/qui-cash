export const routes = {
  signUp: '/signup',
  signin: '/signin',
  dashboard: '/dashboard',
  transactionHistory: '/dashboard/history',
  transfer: '/dashboard/transfer',
  connect: '/dashboard/connect',
  cards: '/dashboard/cards',
  banks: '/dashboard/banks',
  stats: '/dashboard/stats',
  addFunds: '/dashboard/addfunds',
  scan: '/dashboard/scan',
};

export const queryKeys = {
  account: 'accountData',
  user: 'userData',
  recentTransactions: 'recentTransactions',
};
export type TtabsContent = {
  title: string;
  icon: React.ReactNode;
  url: string;
}[];
