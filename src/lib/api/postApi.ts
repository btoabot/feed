// all server api fns use "use cache" for Next.js v16

import { API_BASE, PAGE_SIZE } from '@/app/constants';
import { PostDetailed, PostsResponse } from '@/types';
import { cacheLife, cacheTag } from 'next/cache';

// posts
export async function fetchPosts(skip = 0, limit = PAGE_SIZE): Promise<PostsResponse> {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');

  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    select: 'id,title,body,userId',
  });

  const res = await fetch(`${API_BASE}/posts?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

// post
export async function fetchPost(id: string): Promise<PostDetailed> {
  'use cache';
  cacheLife('days');
  cacheTag('post');

  const params = new URLSearchParams({
    select: 'id,title,body,userId,tags,reactions,views',
  });

  const res = await fetch(`${API_BASE}/posts/${id}?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}
