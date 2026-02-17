import { PostDetailedResponse } from '@/types';
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import PostBackButton from '@/components/posts/PostBackButton';
import PostReations from '@/components/posts/PostReactions';
import PostTags from '@/components/posts/PostTags';

export default function PostDetails({ post, author }: PostDetailedResponse) {
  const authorName = `${author.firstName} ${author.lastName}`;

  return (
    <Stack direction="column" gap={1}>
      <Box>
        <PostBackButton />
      </Box>

      <Card variant="outlined" elevation={0}>
        <CardContent sx={{ px: 3, py: 2 }}>
          <Stack alignItems="center" spacing={1.5} mb={3}>
            <Avatar src={author.image} alt={authorName} sx={{ width: 80, height: 80 }} />
            <Typography variant="h4" component="h1" textAlign="center">
              {authorName}
            </Typography>
          </Stack>

          <Box mb={4}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
              {post.body}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
            <PostTags tags={post.tags} />
            <PostReations
              likes={post.reactions.likes}
              dislikes={post.reactions.dislikes}
              views={post.views}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
