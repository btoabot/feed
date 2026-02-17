// server component that fetches data;
// fetched data is passed to the client FeedList, which hydrates Redux.

import { getInitialData } from '@/lib/actions';
import { lazy } from 'react';

const PostList = lazy(() => import('@/components/posts/PostList'));

export default async function Feed() {
  const initialData = await getInitialData();

  return <PostList initialData={initialData} />;
}
