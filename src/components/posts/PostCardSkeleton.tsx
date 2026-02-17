import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function PostCardSkeleton() {
  return (
    <Card sx={{ mb: 2 }} variant="outlined" elevation={0}>
      <CardContent sx={{ p: 2.2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
          <Skeleton variant="circular" width={36} height={36} />
          <Skeleton variant="text" width={120} height={20} />
        </Stack>
        <Box pl={5}>
          <Skeleton variant="text" width="100%" height={18} />
          <Skeleton variant="text" width="75%" height={18} />
        </Box>
      </CardContent>
    </Card>
  );
}
