import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '@/store/posts/state';
import type { RootState } from '@/store/store.types';
import { InitialData, Post, PostMeta } from '@/types';
import { enrichPosts } from '@/utils';
import { fetchPostNextPage } from '@/store/posts/actions';

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    hydrateInitialData(state, action: PayloadAction<InitialData>) {
      if (state.initialized) return;
      const { posts, users, total } = action.payload;

      state.userMap = Object.fromEntries(users.map((u) => [u.id, u]));
      state.posts = enrichPosts(posts, state.userMap);
      state.total = total;
      state.skip = posts.length;
      state.initialized = true;
    },

    prependPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload;

      if (state.posts.some((p) => p.id === post.id)) return;

      const newPost: PostMeta = {
        ...post,
        author: state.userMap[action.payload.userId] ?? null,
        addedAt: Date.now(),
      };

      state.posts.unshift(newPost);
    },

    clearHighlight(state, action: PayloadAction<number>) {
      const post = state.posts.find((p) => p.id === action.payload);

      if (post) {
        post.addedAt = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostNextPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostNextPage.fulfilled, (state, action) => {
        const { posts, total, skip, limit } = action.payload;

        state.loading = false;
        state.total = total;
        state.skip = skip + limit;
        state.posts.push(...enrichPosts(posts, state.userMap));
      })
      .addCase(fetchPostNextPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load more posts';
      });
  },
});

export const { hydrateInitialData, prependPost, clearHighlight } = postSlice.actions;

export const postSelector = (state: RootState) => state.post;

export default postSlice.reducer;
