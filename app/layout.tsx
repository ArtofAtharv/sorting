import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mutation Entries Sorting Tool",
  description: "A web app to sort numbers and identify unique and repeated entries. A small useful gift form juniors Venks, Aradhana, Hrunakshi and Atharv to Adv. Saurabh Todkar Sir.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mutation Entries Sorting Tool",
    url: "https://mesorting.vercel.app",
    siteName: "Mutation Entries Sorting Tool",
    type: "website",
    locale: "en_US",
    description: "A web app to sort numbers and identify unique and repeated entries. A small useful gift form juniors Venks, Aradhana, Hrunakshi and Atharv to Adv. Saurabh Todkar Sir.",
    images: [
      {
        url: "https://mesorting.vercel.app/logo.png",
        width: 630,
        height: 630,
        alt: "Mutation Entries Sorting Tool",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
