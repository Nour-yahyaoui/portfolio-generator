// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Portfolio Builder 2026',
  description: 'Create stunning portfolios with our modern builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}