import { CSSProperties } from 'react';
import { RowProps } from '@/components/posts/hooks/usePostListProps';
import { Stack } from '@mui/material';
import PostCard from '@/components/posts/PostCard';
import PostCardSkeleton from '@/components/posts/PostCardSkeleton';

export default function PostRow({
  index,
  style,
  posts,
  hasMore,
  loading,
}: {
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
  index: number;
  style: CSSProperties;
} & RowProps) {
  if (index < posts.length) {
    const post = posts[index];

    return (
      <Stack sx={style} role="listitem">
        <PostCard post={post} />
      </Stack>
    );
  }

  // loading row at the bottom
  return (
    <Stack sx={style}>
      {loading ? <PostCardSkeleton /> : hasMore ? <PostCardSkeleton /> : null}
    </Stack>
  );
}
