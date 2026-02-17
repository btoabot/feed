export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostDetailed extends Post {
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostMeta extends Post {
  author: User | null;
  //  timestamp when post was added to the feed (highlight animation)
  addedAt?: number;
}

export interface InitialData {
  posts: Post[];
  users: User[];
  total: number;
}

export interface PostDetailedResponse {
  post: PostDetailed;
  author: User;
}
