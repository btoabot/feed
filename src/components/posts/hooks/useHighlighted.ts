import { useAppDispatch } from '@/store/hooks';
import { clearHighlight } from '@/store/posts/slice';
import { useEffect } from 'react';
import { HIGHLIGHT_DURATION_MS } from '@/app/constants';

export default function useHighlighted({ id, addedAt }: { id: number; addedAt?: number }): boolean {
  const dispatch = useAppDispatch();
  const isHighlighted = addedAt !== undefined;

  useEffect(() => {
    if (!isHighlighted) return;
    const timer = setTimeout(() => {
      dispatch(clearHighlight(id));
    }, HIGHLIGHT_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isHighlighted, id, dispatch]);

  return isHighlighted;
}
