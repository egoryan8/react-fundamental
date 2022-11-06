import React from 'react';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import styles from './PostForm.module.css';

const PostForm = () => {
  return (
    <form className={styles.form}>
      <MyInput type="text" placeholder="название поста" />
      <MyInput type="text" placeholder="описание поста" />
      <MyButton disabled>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
