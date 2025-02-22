// app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Mi CRM',
  description: 'CRM básico con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
