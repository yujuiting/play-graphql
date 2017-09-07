import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import { Author, Post } from '@shared/interfaces';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
});

interface Response {
  authors?: Author[];
  posts?: Post[];
  createAuthor?: Author;
  createPost?: Post;
}

export async function getAuthors(): Promise<Author[]> {
  const query = gql`
    {
      authors {
        id
        name
      }
    }
  `;

  const res = await client.query<Response>({ query });

  return res.data.authors;
}

export async function createAuthor(author: Author): Promise<Author> {
  const mutation = gql`
    mutation {
      createAuthor(name: "${author.name}") {
        id
        name
      }
    }
  `;

  const res = await client.mutate<Response>({ mutation });

  return res.data.createAuthor;
}

export async function getPosts(): Promise<Post[]> {
  const query = gql`
    {
      posts {
        id
        title
        content
      }
    }
  `;

  const res = await client.query<Response>({ query });

  return res.data.posts;
}

export async function createPost(authorId: string, post: Post): Promise<Post> {
  const mutation = gql`
    {
      createPost(
        title: ${post.title},
        content: ${post.content},
        authorId: ${authorId}
      ) {
        id
        name
      }
    }
  `;

  const res = await client.mutate<Response>({ mutation });

  return res.data.createPost;
}