import { useMemo, useState } from 'react';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm/PostForm';
import PostsList from './components/PostsList/PostsList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'ааааа', body: 'qfqwfqwqw' },
    { id: 2, title: 'ббб', body: 'цпцп' },
    { id: 3, title: 'вв', body: 'ячыфмы' },
    { id: 4, title: 'гг', body: 'р44прук' },
  ]);
  const [filter, setFilter] = useState({ searchValue: '', sort: '' });

  const sortedPosts = useMemo(() => {
    console.log('ОТРАБОТАЛА ФУНКЦИЯ');
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.searchValue.toLowerCase()),
    );
  }, [filter.searchValue, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedPosts.length ? (
        <PostsList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={'Список постов про JavaScript'}
        />
      ) : (
        <h1 style={{ textAlign: 'center' }}>{'Посты не найдены :('}</h1>
      )}
    </div>
  );
}

export default App;
