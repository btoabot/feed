// RPC-style fns while keeping execution on the server

import { InitialData, PostDetailedResponse } from '@/types';
import { fetchPost, fetchPosts } from '@/lib/api/postApi';
import { PAGE_SIZE } from '@/app/constants';
import { fetchUser, fetchUsers } from '@/lib/api/userApi';

export async function getInitialData(): Promise<InitialData> {
  const [postData, userData] = await Promise.all([fetchPosts(0, PAGE_SIZE), fetchUsers()]);

  return {
    posts: postData.posts,
    users: userData.users,
    total: postData.total,
  };
}

// Fetch a single detailed post + its author using cached users list, with fallback
export async function getPostWithAuthor(postId: string): Promise<PostDetailedResponse> {
  const [post, usersData] = await Promise.all([fetchPost(postId), fetchUsers()]);
  let author = usersData.users.find((user) => user.id === post.userId);
  if (!author) {
    author = await fetchUser(postId);
  }
  return { post, author };
}
