import { useEffect, useState } from 'react';
import PostService from './API/PostService';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm/PostForm';
import PostsList from './components/PostsList/PostsList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import Preloader from './components/UI/preloader/Preloader';
import { usePosts } from './hooks/usePosts';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ searchValue: '', sort: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.searchValue);
  const [isPostsLoading, setIsPostsLoading] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
  }

  return (
    <div className="App">
      <MyButton style={{ margin: '10px 0' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} setModal={setModal} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <Preloader />
      ) : (
        <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'} />
      )}
    </div>
  );
}

export default App;
