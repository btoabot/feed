'use client';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import StoreProvider from '@/providers/StoreProvider';
import { ReactNode, Suspense } from 'react';
import theme from '@/theme';
import LoadingOverlay from '@/components/ui/LoadinOverlay';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StoreProvider>
    </Suspense>
  );
}
