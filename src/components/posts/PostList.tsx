'use client';

import { InitialData } from '@/types';
import { Suspense } from 'react';
import { Box } from '@mui/material';

import { List, useListRef } from 'react-window';
import { CARD_HEIGHT_PX } from '@/app/constants';
import usePostListProps from '@/components/posts/hooks/usePostListProps';
import useHydrateData from '@/components/posts/hooks/useHydrateData';
import { useNewPostPoller } from '@/components/posts/hooks/useNewPostPoller';

import PostRow from '@/components/posts/PostRow';
import PostListSkeleton from '@/components/posts/PostListSkeleton';
import PostEmpty from '@/components/posts/PostEmpty';
import PostError from '@/components/posts/PostError';

export interface PostListProps {
  initialData: InitialData;
}

export default function PostList({ initialData }: PostListProps) {
  const { rowProps, rowCount, handleRowsRendered, error, initialized } = usePostListProps();
  const listRef = useListRef(null);

  useHydrateData({ initialData });

  useNewPostPoller();

  if (!initialized) {
    return <PostListSkeleton />;
  }

  if (error) {
    return <PostError error={error} />;
  }

  if (!rowProps.posts?.length) {
    return <PostEmpty />;
  }

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <Box sx={{ height: 'calc(100vh - 64px)', width: '100%' }}>
        <List
          role="list"
          listRef={listRef}
          rowCount={rowCount}
          rowHeight={CARD_HEIGHT_PX}
          rowComponent={PostRow}
          rowProps={rowProps as never}
          onRowsRendered={handleRowsRendered}
          overscanCount={5}
          style={{ width: '100%' }}
        />
      </Box>
    </Suspense>
  );
}
