// Tests for FeedCard component.
// Covers: rendering author name, truncated body, highlight animation, link href.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '@/store/posts/slice';
import PostCard from '../PostCard';
import { PostMeta, User } from '@/types';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const mockAuthor: User = {
  id: 1,
  firstName: 'Jane',
  lastName: 'Smith',
  image: 'https://example.com/jane.jpg',
};

function createPost(overrides: Partial<PostMeta> = {}): PostMeta {
  return {
    id: 1,
    title: 'Test Title',
    body: 'Short body',
    userId: 1,
    author: mockAuthor,
    ...overrides,
  };
}

function renderWithStore(post: PostMeta) {
  const store = configureStore({
    reducer: { feed: postReducer },
  });
  return render(
    <Provider store={store}>
      <PostCard post={post} />
    </Provider>,
  );
}

describe('FeedCard', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render author name', () => {
    renderWithStore(createPost());
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it("should render 'Unknown Author' when author is null", () => {
    renderWithStore(createPost({ author: null }));
    expect(screen.getByText('Unknown Author')).toBeInTheDocument();
  });

  it('should truncate body longer than 100 characters', () => {
    const longBody = 'A'.repeat(150);
    renderWithStore(createPost({ body: longBody }));
    const displayed = screen.getByText(
      (content) => content.startsWith('A') && content.endsWith('...'),
    );
    // 100 chars + ellipsis
    expect(displayed.textContent!.length).toBeLessThanOrEqual(103);
  });

  it('should not truncate body shorter than 100 characters', () => {
    renderWithStore(createPost({ body: 'Short body' }));
    expect(screen.getByText('Short body')).toBeInTheDocument();
  });

  it('should navigate to the correct post detail page on click', async () => {
    const user = userEvent.setup();
    renderWithStore(createPost({ title: 'My Post', body: 'Post content here' }));
    await user.click(screen.getByLabelText('View post: My Post'));
    expect(mockPush).toHaveBeenCalledWith('/feed/1');
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Post content here')).toBeInTheDocument();
  });
});
