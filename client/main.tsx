import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { Author, Post } from '@shared/interfaces';
import { getAuthors,
         getPosts,
         createAuthor,
         createPost } from './client';

const Input = styled.input`
`

const Label = styled.label``;

const FormGroup = styled.div`
`;

const Form = styled.form`
`;

const Button = styled.button``;

interface AppForms {
  authorForm?: Author;
  postForm?: Post;
}

interface AppState extends AppForms {
  authors?: Author[];
  posts?: Post[];
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    authors: [],
    posts: [],
    authorForm: {
      id: null,
      name: '',
      posts: []
    },
    postForm: {
      id: null,
      title: '',
      content: '',
      author: null
    }
  };

  public componentDidMount(): void {
    this.refreshAuthors();
    this.refreshPosts();
  }

  public async refreshAuthors(): Promise<void> {
    const authors = await getAuthors();
    this.setState({ authors });
  }

  public async refreshPosts(): Promise<void> {
    const posts = await getPosts();
    this.setState({ posts });
  }

  public async createAuthor(author: Author): Promise<void> {
    const newAuthor = await createAuthor(author);
    const { authors } = this.state;
    this.setState({ authors: [...authors, newAuthor] });
  }

  public async createPost(authorId: string, post: Post): Promise<void> {
    const newPost = await createPost(authorId, post);
    const { posts } = this.state;
    this.setState({ posts: [...posts, newPost] });
  }

  private onFormChange(formName: keyof AppForms, key: keyof Author | keyof Post): (e: React.FormEvent<any>) => void {
    return (e: React.FormEvent<any>) => {
      const form = this.state[formName];
      const target = e.target as HTMLInputElement;
      form[key] = target.value;
      this.setState({
        [formName]: form
      });
    }
  }

  private onFormSubmit(formName: keyof AppForms): (e: React.FormEvent<any>) => void {
    return (e: React.FormEvent<any>) => {
      e.preventDefault();
      const form = this.state[formName];
      switch (formName) {
        case 'authorForm':
          this.createAuthor(form as Author);
          break;
      }
    }
  }

  public render(): JSX.Element {
    const { authors } = this.state;
    return (
      <div>
        <Form onSubmit={this.onFormSubmit('authorForm')}>
          <h2>Author</h2>
          <FormGroup>
            <Label>Name</Label>
            <Input value={this.state.authorForm.name}
                   onChange={this.onFormChange('authorForm', 'name')} />
          </FormGroup>
          <Button type="submit">Create Author</Button>
        </Form>
        <hr />
        <h2>Authors</h2>
        {authors.map((author, index) => <div key={author.name + index}>{author.name}</div>)}
      </div>
    );
  }

}

const container = document.createElement('div');
document.body.appendChild(container);
render(<App />, container);
