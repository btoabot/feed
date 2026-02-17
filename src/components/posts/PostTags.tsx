import { Chip, Stack } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface PostTagsProps {
  tags: string[];
}

const chipSx: SxProps<Theme> = { borderColor: 'divider', colro: 'color.secondary' };

export default function PostTags({ tags }: PostTagsProps) {
  return (
    <Stack direction="row" gap={1}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} size="small" variant="outlined" sx={chipSx} />
      ))}
    </Stack>
  );
}
