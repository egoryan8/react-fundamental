import { useState } from 'react';
import './App.css';
import Post from './components/Post/Post';
import PostForm from './components/PostForm/PostForm';
import PostsList from './components/PostsList/PostsList';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript1', body: 'Description1' },
    { id: 2, title: 'JavaScript2', body: 'Description2' },
    { id: 3, title: 'JavaScript3', body: 'Description3' },
    { id: 4, title: 'JavaScript4', body: 'Description4' },
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      {posts.length ? (
        <PostsList remove={removePost} posts={posts} title={'Список постов про JavaScript'} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>{'Постов пока нет :('}</h1>
      )}
    </div>
  );
}

export default App;
