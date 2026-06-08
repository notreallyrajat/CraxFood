import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
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
    <html lang="en" className={`${outfit.variable} ${cinzel.variable}`}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        {children}
        <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}


