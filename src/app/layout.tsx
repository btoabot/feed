import AppProviders from '@/providers/AppProviders';
import type { Metadata } from 'next';
import PageContainer from '@/components/containers/PageContainer';

export const metadata: Metadata = {
  title: 'Feed App',
  description: 'Generated feed list',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <main>
            <PageContainer>{children}</PageContainer>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
