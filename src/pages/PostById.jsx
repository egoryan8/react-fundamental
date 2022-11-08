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
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const res = await PostService.getById(params.id);
    setPost(res.data);
  });

  const [fetchCommsById, isComLoading, comError] = useFetching(async () => {
    const res = await PostService.getCommentsById(params.id);
    setComments(res.data);
  });

  useEffect(() => {
    fetchPostById();
    fetchCommsById();
  }, []);

  return (
    <div className={styles.wrapper}>
      <MyButton onClick={() => navigate('/')}>К постам</MyButton>
      <h1 className={styles.header}>Вы открыли страницу с постом №{params.id}</h1>
      {isLoading && isComLoading ? (
        <Preloader />
      ) : (
        <div>
          <div className={styles.text}>
            {post.id}. {post.title}
            <div className={styles.body}>{post.body}</div>
            <hr />
            <h2 className={styles.commsHeader}>Комментарии</h2>
            {comments.map((comm) => (
              <div className={styles.comment}>
                <h5>{comm.email}</h5>
                <p>{comm.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostById;
