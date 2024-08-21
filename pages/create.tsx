
"use client"

import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../lib/queries';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createPost({ variables: { input: { title, body } } });
    console.log(response);
    router.push('/');
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePage;
