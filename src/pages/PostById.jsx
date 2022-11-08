import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import MyButton from '../components/UI/button/MyButton';
import Preloader from '../components/UI/preloader/Preloader';
import { useFetching } from '../hooks/useFetching';
import { useNavigate } from 'react-router-dom';

import styles from './PostById.module.css';

const PostById = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const res = await PostService.getById(params.id);
    setPost(res.data);
  });

  useEffect(() => {
    fetchPostById();
    console.log(post);
  }, []);

  return (
    <div className={styles.wrapper}>
      <MyButton onClick={() => navigate('/')}>К постам</MyButton>
      <h1 className={styles.header}>Вы открыли страницу с постом №{params.id}</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.text}>
          {post.id}. {post.title}
          <div className={styles.body}>{post.body}</div>
        </div>
      )}
    </div>
  );
};

export default PostById;
