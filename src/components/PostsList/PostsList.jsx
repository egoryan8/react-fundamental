import React from 'react';
import Post from '../Post/Post';

const PostsList = ({ posts, title }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post, index) => (
        <Post post={post} key={post.id} number={index + 1} />
      ))}
    </div>
  );
};

export default PostsList;
