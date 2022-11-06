import React from 'react';
import styles from '../Post/Post.module.css';

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.content}>
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className={styles.buttons}>
        <button>Удалить</button>
      </div>
    </div>
  );
};

export default Post;