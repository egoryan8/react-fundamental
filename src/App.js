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

  return (
    <div className="App">
      <PostForm />
      <PostsList posts={posts} title={'Список постов про JavaScript'} />
    </div>
  );
}

export default App;
