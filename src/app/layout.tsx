import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CraxFood - Gourmet On Demand",
  description: "Experience premium dining delivered at hyper-speed. Handcrafted by 5-star chefs, delivered straight to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

