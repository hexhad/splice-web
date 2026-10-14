import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Splice — cut, join and polish audio on Android", template: "%s · Splice" },
  description:
    "Splice is an offline Android audio editor. Mark several parts and cut them at once, record over your audio, layer tracks, shape the sound, and export M4A or WAV. No internet, and the microphone only when you record.",
  applicationName: "Splice",
  authors: [{ name: "HEXHAD Studios" }],
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
