import type { Metadata } from "next";
// Import the font loaders from Next.js
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Configure the Ubuntu font for the body
const fontSans = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

// Configure your local Bitcount font for headings
const fontHeading = localFont({
  // Corrected Path: Use a direct relative path from this file.
  src: "./fonts/BitcountSingle-Light.ttf", 
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Zakaria Bhaibi - Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
