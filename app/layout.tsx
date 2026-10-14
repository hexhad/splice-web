import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Splice - Professional Audio Editor for Android',
  description: 'Cut, layer, mix, and export high-quality audio. All on your Android device. Multi-track editing with professional EQ, speed control, and precision trim.',
  keywords: 'audio editor, Android, music production, audio mixing, DAW',
  openGraph: {
    title: 'Splice - Audio Editor for Android',
    description: 'Professional audio editing made simple',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
