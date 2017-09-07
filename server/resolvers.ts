import { GraphQLResolveInfo } from 'graphql/type/definition';
import { Author, Post } from '@shared/interfaces';

const authorStore: Author[] = [];
const postStore = [];

export namespace Query {

  export function authors(): Author[] {
    return authorStore;
  }

  export function posts(): Post[] {
    return postStore;
  }

}

export namespace Mutation {

  export async function createAuthor(rootValue, { name }, context, info: GraphQLResolveInfo): Promise<Author> {
    const author: Author = {
      id: authorStore.length.toString(),
      name,
      posts: []
    }

    authorStore.push(author);

    return Promise.resolve(author);
  }

  export function createPost(rootValue, { title, content, authorId }, context, info: GraphQLResolveInfo): Post {
    const author = authorStore.find(r => r.id === authorId);

    const post = {
      id: postStore.length.toString(),
      title,
      content,
      author
    }

    if (author) {
      author.posts.push(post);
    }

    postStore.push(post);

    return post;
  }

}