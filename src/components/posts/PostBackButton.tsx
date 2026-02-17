'use client';

import { IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const baseSx: SxProps<Theme> = { color: 'test.primary', '&:hover': { bgcolor: 'action.hover' } };

export default function PostBackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <IconButton onClick={handleBack} aria-label="Back to feed" sx={baseSx}>
      <ArrowBackIcon />
    </IconButton>
  );
}
