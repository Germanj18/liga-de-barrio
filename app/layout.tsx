import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Liga de Barrio',
  description: 'Prototipo jugable de Liga de Barrio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
