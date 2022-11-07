import { useMemo, useState } from 'react';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm/PostForm';
import PostsList from './components/PostsList/PostsList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import MyModal from './components/UI/modal/MyModal';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'ааааа', body: 'qfqwfqwqw' },
    { id: 2, title: 'ббб', body: 'цпцп' },
    { id: 3, title: 'вв', body: 'ячыфмы' },
    { id: 4, title: 'гг', body: 'р44прук' },
  ]);
  const [filter, setFilter] = useState({ searchValue: '', sort: '' });
  const [modal, setModal] = useState(false);

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
      <MyButton style={{ margin: '10px 0' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} setModal={setModal} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostsList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Список постов про JavaScript'}
      />
    </div>
  );
}

export default App;
