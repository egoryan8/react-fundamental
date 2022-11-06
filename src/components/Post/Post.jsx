import React from 'react';
import styles from '../Post/Post.module.css';
import MyButton from '../UI/button/MyButton';

const Post = ({ post, number, remove }) => {
  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <strong>
          {number}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className={styles.buttons}>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default Post;
