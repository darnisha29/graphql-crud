import { useMutation, useQuery } from '@apollo/client';
import { GET_POST, UPDATE_POST, GET_POSTS } from '../lib/queries';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const UpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_POST, { variables: { id } });
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setBody(data.post.body);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost({ variables: { id, input: { title, body } } });
    router.push('/');
  };

  return (
    <div>
      <h1>Update Post</h1>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePage;
