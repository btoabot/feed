import { fetchPostNextPage } from '../actions';
import feedReducer, { prependPost, clearHighlight, hydrateInitialData } from '../slice';
import type { Post, User } from '@/types';

const mockUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  image: 'https://example.com/avatar.jpg',
};

const mockPost: Post = {
  id: 101,
  title: 'Test Post',
  body: 'Test body content that is long enough to be meaningful',
  userId: 1,
};

const mockPost2: Post = {
  id: 102,
  title: 'Second Post',
  body: 'Another test body',
  userId: 1,
};

describe('feedSlice', () => {
  const initialState = feedReducer(undefined, { type: '@@INIT' });

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      posts: [],
      userMap: {},
      skip: 0,
      total: 0,
      loading: false,
      error: null,
      initialized: false,
      scrollOffset: 0,
    });
  });

  describe('hydrateInitialFeed', () => {
    it('should hydrate state with server data', () => {
      const state = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );

      expect(state.initialized).toBe(true);
      expect(state.posts).toHaveLength(1);
      expect(state.posts[0].author).toEqual(mockUser);
      expect(state.total).toBe(100);
      expect(state.skip).toBe(1);
      expect(state.userMap[1]).toEqual(mockUser);
    });

    it('should not re-hydrate if already initialized', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );

      const reHydrated = feedReducer(
        hydrated,
        hydrateInitialData({
          posts: [mockPost2],
          users: [mockUser],
          total: 200,
        }),
      );

      // Should still have the original data
      expect(reHydrated.posts).toHaveLength(1);
      expect(reHydrated.posts[0].id).toBe(101);
      expect(reHydrated.total).toBe(100);
    });

    it('should set author to null for unknown userId', () => {
      const postWithUnknownUser: Post = { ...mockPost, userId: 999 };
      const state = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [postWithUnknownUser],
          users: [mockUser],
          total: 1,
        }),
      );

      expect(state.posts[0].author).toBeNull();
    });
  });

  describe('prependPost', () => {
    it('should prepend a post at the top with addedAt timestamp', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );

      const beforeTime = Date.now();
      const state = feedReducer(hydrated, prependPost(mockPost2));
      const afterTime = Date.now();

      expect(state.posts).toHaveLength(2);
      expect(state.posts[0].id).toBe(102);
      expect(state.posts[0].addedAt).toBeGreaterThanOrEqual(beforeTime);
      expect(state.posts[0].addedAt).toBeLessThanOrEqual(afterTime);
      expect(state.total).toBe(100);
      expect(state.skip).toBe(1);
    });

    it('should not prepend a duplicate post id', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );

      const state = feedReducer(hydrated, prependPost(mockPost));
      expect(state.posts).toHaveLength(1);
      expect(state.posts[0].id).toBe(101);
    });
  });

  describe('clearHighlight', () => {
    it('should clear the addedAt timestamp for a post', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );
      const withPrepend = feedReducer(hydrated, prependPost(mockPost2));
      expect(withPrepend.posts[0].addedAt).toBeDefined();

      const state = feedReducer(withPrepend, clearHighlight(102));
      expect(state.posts[0].addedAt).toBeUndefined();
    });

    it('should do nothing for non-existent post id', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );
      const state = feedReducer(hydrated, clearHighlight(999));
      expect(state).toEqual(hydrated);
    });
  });

  describe('fetchNextPage async thunk', () => {
    it('should set loading true on pending', () => {
      const state = feedReducer(initialState, {
        type: fetchPostNextPage.pending.type,
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should append posts on fulfilled', () => {
      const hydrated = feedReducer(
        initialState,
        hydrateInitialData({
          posts: [mockPost],
          users: [mockUser],
          total: 100,
        }),
      );

      const state = feedReducer(hydrated, {
        type: fetchPostNextPage.fulfilled.type,
        payload: {
          posts: [mockPost2],
          total: 100,
          skip: 1,
          limit: 20,
        },
      });

      expect(state.loading).toBe(false);
      expect(state.posts).toHaveLength(2);
      expect(state.posts[1].id).toBe(102);
      expect(state.skip).toBe(21);
      expect(state.total).toBe(100);
    });

    it('should set error on rejected', () => {
      const state = feedReducer(initialState, {
        type: fetchPostNextPage.rejected.type,
        error: { message: 'Network error' },
      });
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });

    it('should use fallback error message when none provided', () => {
      const state = feedReducer(initialState, {
        type: fetchPostNextPage.rejected.type,
        error: {},
      });
      expect(state.error).toBe('Failed to load more posts');
    });
  });
});
