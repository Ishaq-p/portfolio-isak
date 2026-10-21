'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import NoiseOverlay from './NoiseOverlay';
import Footer from './Footer';

export default function Chrome({ children }: { children: React.ReactNode }) {
  if (usePathname().startsWith('/bitatlim-demo')) return <>{children}</>;

  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}