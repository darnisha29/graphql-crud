'use client'
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST, UPDATE_POST, GET_POSTS } from '../lib/queries';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const UpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_POST, { variables: { id } });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (data) {
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const existingIndex = storedPosts.findIndex((post: any) => post.id === id);
      if (existingIndex > -1) {
        setTitle(storedPosts[existingIndex].title);
        setBody(storedPosts[existingIndex].body);
      } else {
        setTitle(data.post.title)
        setBody(data.post.body);
      }

    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updatePost({ variables: { id, input: { title, body } } });
      console.log(response);


      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const existingIndex = storedPosts.findIndex((post: any) => post.id === id);
      if (existingIndex > -1) {

        storedPosts[existingIndex] = { id, title, body };
      } else {

        storedPosts.push({ id, title, body });
      }


      localStorage.setItem('posts', JSON.stringify(storedPosts));


      router.push('/');
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter the body text"
            required
            rows={6}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
