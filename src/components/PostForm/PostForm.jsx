import React, { useState } from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import styles from './PostForm.module.css';

const PostForm = ({ create, setModal }) => {
  const [post, setPost] = useState({ title: '', body: '' });
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      title: post.title,
      body: post.body,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' });
    setModal(false);
  };
  return (
    <form className={styles.form}>
      <MyInput
        type="text"
        placeholder="название поста"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="описание поста"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
