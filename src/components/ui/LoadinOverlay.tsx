import { Box, CircularProgress } from '@mui/material';

export default function LoadingOverlay() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={32} />
    </Box>
  );
}
