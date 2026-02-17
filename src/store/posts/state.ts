import { PostsState } from './posts.types';

export const initialState: PostsState = {
  posts: [],
  userMap: {},
  skip: 0,
  total: 0,
  loading: false,
  error: null,
  initialized: false,
  scrollOffset: 0,
};
