export interface Author {
  id?: string;
  name: string;
  posts?: Post[];
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  author?: Author;
}