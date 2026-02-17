import { Container } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const baseSx: SxProps<Theme> = { py: 2, minHeight: '100vh' };

export default function PageContainer({ children, sx }: PageContainerProps) {
  return (
    <Container maxWidth="sm" sx={sx ? ([baseSx, sx] as SxProps<Theme>) : baseSx}>
      {children}
    </Container>
  );
}
