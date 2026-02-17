import { Post, PostMeta, User } from '@/types';

export function enrichPosts(
  posts: Post[],
  userMap: Record<number, User>,
  addedAt?: number,
): PostMeta[] {
  return posts.map((post) => ({
    ...post,
    author: userMap[post.userId] ?? null,
    ...(addedAt !== undefined && { addedAt }),
  }));
}

export function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '...';
}
