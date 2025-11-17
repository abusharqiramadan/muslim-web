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
  title: "Muslim Web",
  icons: {
    icon: "/favicon.ico", // Path to your ICO file in the public folder
  },
  description: "A program to help Muslim educators build a professional online presence.",
  openGraph: {
    title: "Muslim Web",
    description: "A program to help Muslim educators build a professional online presence.",
    //url: "https://yourwebsite.com",
    siteName: "Muslim Web",
    images: [
      {
        url: "/website-banner.png", // Path to your banner image in public folder
        width: 1200,
        height: 630,
        alt: "Muslim Web Website Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Web",
    description: "A program to help Muslim educators build a professional online presence.",
    images: ["/website-banner.png"],
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