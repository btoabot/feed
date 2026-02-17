import { Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
interface PostReationsProps {
  views: number;
  likes: number;
  dislikes: number;
}

const textSx: SxProps<Theme> = { fontSize: 14 };

export default function PostReations({ likes, dislikes, views }: PostReationsProps) {
  return (
    <Stack direction="row" gap={1.5}>
      <Typography sx={textSx}>👁️ {views}</Typography>
      <Typography sx={textSx}>👍 {likes}</Typography>
      <Typography sx={textSx}>👎 {dislikes}</Typography>
    </Stack>
  );
}
