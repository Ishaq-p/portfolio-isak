import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import NoiseOverlay from "./components/NoiseOverlay";
import Footer from "./components/Footer";
import './globals.css';
import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-fraunces'
});

export const metadata: Metadata = {
  title: "Ishaq PaktinYar - Software Engineer & Bioinformatics Researcher",
  description: "Backend systems and applied machine learning, built and deployed in production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${fraunces.variable} font-sans`}>
        <NoiseOverlay />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}