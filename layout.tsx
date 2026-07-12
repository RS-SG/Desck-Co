import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
export const metadata: Metadata = { title: { default: 'Desck & Co — Objects for the considered life', template: '%s — Desck & Co' }, description: 'Premium objects for a life lived with intention.', metadataBase: new URL('https://desckandco.com') };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CartProvider>{children}</CartProvider><div className="grain" /></body></html>; }
