// all server api fns use "use cache" for Next.js v16

import { API_BASE } from '@/app/constants';
import { User, UsersResponse } from '@/types';

import { cacheLife, cacheTag } from 'next/cache';

// users
export async function fetchUsers(): Promise<UsersResponse> {
  'use cache';
  cacheLife('days');
  cacheTag('users');

  const params = new URLSearchParams({
    limit: '0',
    select: 'firstName,lastName,image',
  });

  const res = await fetch(`${API_BASE}/users?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

// user
export async function fetchUser(id: string): Promise<User> {
  'use cache';
  cacheLife('days');
  cacheTag('user');

  const params = new URLSearchParams({
    select: 'firstName,lastName,image',
  });

  const res = await fetch(`${API_BASE}/users/${id}?${params}`);

  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}
