import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Provider from '@/components/provider';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'QuiCash',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased`}>
        <NextTopLoader color='#2299DD' />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
