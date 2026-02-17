// useNewPostPoller — polls for new posts and prepends them to the feed.
// we simulate react actions by polling for the latest post and comparing its id with
// the first post in our Redux store. When a new post is detected, it's
// prepended with a highlight timestamp for visual feedback.
//
// To simulate "new" posts, we fetch
// a random post via /posts/{randomId} and treat it as new content.
// In real case, this would be replaced with a WebSocket or SSE connection.

'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postSelector, prependPost } from '@/store/posts/slice';
import { fetchAddPost } from '@/lib/api.client/postApi';
import { POLL_INTERVAL_MS } from '@/app/constants';

export function useNewPostPoller() {
  const dispatch = useAppDispatch();
  const { initialized, posts, total } = useAppSelector(postSelector);
  //  O(1) lookup instead of includes
  const postIdSetRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    postIdSetRef.current = new Set(posts.map((p) => p.id));
  }, [posts]);

  useEffect(() => {
    if (!initialized || !total) return;

    let cancelled = false;

    const poll = async () => {
      try {
        const randomId = Math.floor(Math.random() * total) + 1;
        const post = await fetchAddPost(randomId);

        if (cancelled) return;

        if (!postIdSetRef.current.has(post.id)) {
          dispatch(prependPost(post));
        }
      } catch {}
    };

    const id = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [dispatch, initialized, total]);
}
