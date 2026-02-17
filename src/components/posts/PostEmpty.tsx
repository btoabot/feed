import { Box, Typography } from '@mui/material';

export default function PostEmpty() {
  return (
    <Box py={4} textAlign="center">
      <Typography>No posts found.</Typography>
    </Box>
  );
}
