const BASE_URL = 'https://gorest.co.in/public/v2';

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};
