import { useEffect, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPagesArray } from '../utils/pages';
import { getPagesCount } from '../utils/pages';
import PostService from '../API/PostService';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import PostForm from '../components/PostForm/PostForm';
import PostFilter from '../components/PostFilter';
import PostsList from '../components/PostsList/PostsList';
import Preloader from '../components/UI/preloader/Preloader';
import Paginator from '../components/UI/Paginator';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ searchValue: '', sort: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.searchValue);

  const pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const res = await PostService.getAll(limit, currentPage);
    setPosts(res.data);
    const totalCount = res.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

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

      {isPostsLoading ? (
        <Preloader />
      ) : !postError ? (
        <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'} />
      ) : (
        <h2
          style={{
            textAlign: 'center',
            margin: '50px auto 0',
            maxWidth: '300px',
          }}>{`Произошла ошибка: ${postError}`}</h2>
      )}
      <Paginator
        pagesArray={pagesArray}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Posts;
