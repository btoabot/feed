import { PostMeta, User } from '@/types';

export interface PostsState {
  posts: PostMeta[];
  // fast lookup by userId (O(1))
  userMap: Record<number, User>;
  skip: number;
  total: number;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  scrollOffset: number;
}
