import { useState } from 'react';
import './App.css';
import Post from './components/Post/Post';
import PostForm from './components/PostForm/PostForm';
import PostsList from './components/PostsList/PostsList';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'ааааа', body: 'qfqwfqwqw' },
    { id: 2, title: 'ббб', body: 'цпцп' },
    { id: 3, title: 'вв', body: 'ячыфмы' },
    { id: 4, title: 'гг', body: 'р44прук' },
  ]);
  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changeSort = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={changeSort}
          defaultValue="Сортировка по"
          options={[
            { value: 'title', name: 'заголовку' },
            { value: 'body', name: 'описанию' },
          ]}
        />
      </div>
      {posts.length ? (
        <PostsList remove={removePost} posts={posts} title={'Список постов про JavaScript'} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>{'Постов пока нет :('}</h1>
      )}
    </div>
  );
}

export default App;
