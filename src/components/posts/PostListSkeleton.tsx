import { SKELETON_COUNT } from '@/app/constants';
import { Box, Skeleton } from '@mui/material';
import PostCardSkeleton from '@/components/posts/PostCardSkeleton';

export default function PostListSkeleton() {
  return (
    <Box>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => {
        return <PostCardSkeleton key={i} />;
      })}
      <Skeleton />
    </Box>
  );
}
