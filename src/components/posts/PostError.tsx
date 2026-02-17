import { Box, Typography } from '@mui/material';

export default function PostError({ error }: { error: string }) {
  return (
    <Box py={4} textAlign="center">
      <Typography color="error" variant="body1">
        {error}
      </Typography>
    </Box>
  );
}
