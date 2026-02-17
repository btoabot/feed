import { API_BASE, PAGE_SIZE } from '@/app/constants';
import { Post, PostsResponse } from '@/types';

export async function fetchPostsClient(skip = 0, limit = PAGE_SIZE): Promise<PostsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    select: 'id,title,body,userId,tags,reactions,views',
  });

  const res = await fetch(`${API_BASE}/posts?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

export async function fetchAddPost(id: number): Promise<Post> {
  const params = new URLSearchParams({
    select: 'id,title,body,userId',
  });
  const res = await fetch(`${API_BASE}/posts/${id}?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch post ${id}: ${res.status}`);
  return res.json();
}
