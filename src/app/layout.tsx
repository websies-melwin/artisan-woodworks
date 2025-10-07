import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artisan Woodworks | Handcrafted Furniture Sofia",
    template: "%s | Artisan Woodworks"
  },
  description: "Luxury handcrafted furniture and custom woodworking in Sofia, Bulgaria. Each piece is meticulously crafted with premium materials and traditional techniques.",
  keywords: ["handcrafted furniture", "custom woodworking", "Sofia Bulgaria", "artisan furniture", "luxury furniture", "oak furniture", "walnut furniture"],
  authors: [{ name: "Artisan Woodworks" }],
  creator: "Artisan Woodworks",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bg_BG"],
    siteName: "Artisan Woodworks",
    title: "Artisan Woodworks | Handcrafted Furniture Sofia",
    description: "Luxury handcrafted furniture and custom woodworking in Sofia, Bulgaria.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
