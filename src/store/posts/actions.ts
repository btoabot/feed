import { PostsResponse } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PAGE_SIZE } from '@/app/constants';
import { fetchPostsClient } from '@/lib/api.client/postApi';
import type { RootState } from '@/store/store.types';

export const fetchPostNextPage = createAsyncThunk<PostsResponse, void>(
  'posts/fetchPostNextPage',
  async (_, { getState }) => {
    const {
      post: { skip },
    } = getState() as RootState;
    const data = await fetchPostsClient(skip, PAGE_SIZE);
    return data;
  },
);
