import React from 'react';
import styles from '../Post/Post.module.css';
import MyButton from '../UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, remove }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className={styles.buttons}>
        <MyButton onClick={() => navigate(`/posts/${post.id}`)}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default Post;
