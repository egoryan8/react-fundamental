import { useEffect, useRef, useState } from 'react';
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
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ searchValue: '', sort: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.searchValue);

  const pagesArray = getPagesArray(totalPages);

  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const res = await PostService.getAll(limit, currentPage);
    setPosts([...posts, ...res.data]);
    const totalCount = res.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useObserver(lastElement, currentPage < totalPages, isPostsLoading, () => {
    setCurrentPage(currentPage + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [currentPage, limit]);

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
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {isPostsLoading && <Preloader />}
      {postError && (
        <h2
          style={{
            textAlign: 'center',
            margin: '50px auto 0',
            maxWidth: '300px',
          }}>{`Произошла ошибка: ${postError}`}</h2>
      )}
      <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'} />
      <div ref={lastElement} style={{ height: 20, background: 'transparent' }}></div>
      {/* <Paginator
        pagesArray={pagesArray}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
}

export default Posts;
