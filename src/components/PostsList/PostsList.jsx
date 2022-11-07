import React from 'react';
import Post from '../Post/Post';

const PostsList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: 'center' }}>{'Посты не найдены :('}</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post, index) => (
        <Post post={post} key={post.id} number={index + 1} remove={remove} />
      ))}
    </div>
  );
};

export default PostsList;
