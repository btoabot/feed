import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPostNextPage } from '@/store/posts/actions';
import { postSelector } from '@/store/posts/slice';
import { PostMeta } from '@/types';
import { useEffect, useRef } from 'react';

export interface Row {
  startIndex: number;
  stopIndex: number;
}

export interface RowProps {
  posts: PostMeta[];
  hasMore: boolean;
  loading: boolean;
}

interface UsePostListProps {
  rowProps: RowProps;
  rowCount: number;
  handleRowsRendered: (_visibleRows: Row, allRows: Row) => void;
  error: string | null;
  initialized: boolean;
}

export default function usePostListProps(): UsePostListProps {
  const dispatch = useAppDispatch();
  const { posts, total, loading, error, initialized } = useAppSelector(postSelector);

  const hasMore = posts.length < total;
  const rowCount = posts.length + (hasMore ? 1 : 0);

  const isLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    isLoadingRef.current = loading;
  }, [loading]);

  //   infinite scroll: load next page when user scrolls near the bottom
  const handleRowsRendered = (_visibleRows: Row, allRows: Row) => {
    if (isLoadingRef.current || !hasMore) return;

    // trigger fetch when the last rendered is close to the end
    if (allRows.stopIndex >= posts.length - 1) {
      dispatch(fetchPostNextPage());
    }
  };

  return {
    rowCount,
    rowProps: {
      posts,
      hasMore,
      loading,
    },
    handleRowsRendered,
    error,
    initialized,
  };
}
