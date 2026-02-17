import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

export default function PostDetailsSkeletton() {
  return (
    <Stack direction="column" gap={1}>
      <Box>
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
      <Card variant="outlined">
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="text" width={160} height={28} />
          </Stack>
          <Box>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
