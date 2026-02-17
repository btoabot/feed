import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hydrateInitialData, postSelector } from '@/store/posts/slice';
import { useEffect } from 'react';
import { PostListProps } from '@/components/posts/PostList';

export default function useHydrateData({ initialData }: PostListProps) {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(postSelector);

  useEffect(() => {
    if (!initialized) {
      dispatch(hydrateInitialData(initialData));
    }
  }, [dispatch, initialized, initialData]);
}
