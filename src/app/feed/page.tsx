import type { Metadata } from 'next';
import { Suspense } from 'react';
import Feed from '@/components/feed/Feed';
import PostListSkeleton from '@/components/posts/PostListSkeleton';

export const metadata: Metadata = {
  title: 'Feed | App',
  description: 'Browse the latest posts',
};

export default function FeedPage() {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <Feed />
    </Suspense>
  );
}
