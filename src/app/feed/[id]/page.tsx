import PostDetails from '@/components/posts/PostDetails';
import { getPostWithAuthor } from '@/lib/actions';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const { post, author } = await getPostWithAuthor(id);

  return <PostDetails post={post} author={author} />;
}
