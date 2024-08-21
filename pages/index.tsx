"use client";

import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, DELETE_POST } from '../lib/queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();


  const handleDelete = async (id: any) => {
    try {
      // await deletePost({ variables: { id } });
      const deletedPostIds = JSON.parse(localStorage.getItem('deletedPostIds') || '[]');
      if (!deletedPostIds.includes(id)) {
        deletedPostIds.push(id);
        localStorage.setItem('deletedPostIds', JSON.stringify(deletedPostIds));
      }


      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const updatedStoredPosts = storedPosts.filter((post: any) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedStoredPosts));


      setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    if (data) {

      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');


      const deletedPostIds = JSON.parse(localStorage.getItem('deletedPostIds') || '[]');
      const apiPosts = data.posts.data;
      const allPosts = apiPosts.map((apiPost: any) => {
        const storedPost = storedPosts.find((post: any) => post.id === apiPost.id);
        return storedPost ? { ...apiPost, ...storedPost } : apiPost;
      });


      const additionalStoredPosts = storedPosts.filter((storedPost: any) => !apiPosts.some((apiPost: any) => apiPost.id === storedPost.id));

      const finalPosts = [...allPosts, ...additionalStoredPosts]
        .filter((post: any) => !deletedPostIds.includes(post.id));

      setPosts(finalPosts);
    }
  }, [data]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex text-center m-6 justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>
        <button
          className="p-3 border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          onClick={() => router.push('/create')}
        >
          Create New Post
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post: { id: any; title: string; body: string }) => (
          <div
            key={post.id}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
            <p>{post.body}</p>
            <div className="flex-grow"></div>
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 py-2 px-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
              <button
                className="flex-1 py-2 px-4 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                onClick={() => router.push(`/update?id=${post.id}`)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;






























