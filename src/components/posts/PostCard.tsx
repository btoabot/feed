'use client';

import { PostMeta } from '@/types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import AvatarWithSkeleton from '@/components/ui/AvatarWithSkeleton';
import { TRUNCATE_LENGHT } from '@/app/constants';
import { truncateText } from '@/utils';
import useHighlighted from '@/components/posts/hooks/useHighlighted';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isHighlighted = useHighlighted({ id: post.id, addedAt: post?.addedAt });

  const authorName = post.author
    ? `${post.author?.firstName} ${post.author?.lastName}`
    : 'Unknown Author';

  const handleNavigate = () => {
    startTransition(() => {
      router.push(`/feed/${post?.id}`);
    });
  };

  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        mb: 1.5,
        animation: isHighlighted ? 'highlightFade 3s ease-out' : 'none',
        '@keyframes highlightFade': {
          '0%': { backgroundColor: '#8fdaff' },
          '100%': { backgroundColor: 'transparent' },
        },
      }}
    >
      <CardActionArea onClick={handleNavigate} aria-label={`View post: ${post.title}`}>
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" alignContent="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
              <AvatarWithSkeleton src={post.author?.image} alt={authorName} />
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {authorName}
              </Typography>
            </Stack>

            {isPending ? <CircularProgress size={16} /> : null}
          </Stack>
          <Box pl={5}>
            <Typography variant="body1" color="text.secondary">
              {truncateText(post.body, TRUNCATE_LENGHT)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
