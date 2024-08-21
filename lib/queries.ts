import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

export const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

export const CREATE_POST = gql`
  mutation( $input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const UPDATE_POST = gql`
  mutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
  

`;
