import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signature By Tunde O | Family Wealth Strategy & Notary Services",
  description:
    "Protect your family's financial legacy with the Family Wealth Waterfall strategy. Florida Notary Public services available. FinClear financial portal.",
  keywords: [
    "family wealth",
    "insurance",
    "trust strategy",
    "Florida notary",
    "wealth building",
    "estate planning",
    "Tunde O",
    "FinClear",
    "financial portal",
  ],
  openGraph: {
    title: "Signature By Tunde O | Family Wealth Strategy & Notary Services",
    description:
      "Protect your family's financial legacy with the Family Wealth Waterfall strategy.",
    url: "https://signaturebytundeo.com",
    siteName: "Signature By Tunde O",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-navy text-cream`}
      >
        <SessionWrapper>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </SessionWrapper>
      </body>
    </html>
  );
}
