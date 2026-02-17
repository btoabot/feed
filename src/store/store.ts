import { configureStore } from '@reduxjs/toolkit';
import postReducer from '@/store/posts/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};
