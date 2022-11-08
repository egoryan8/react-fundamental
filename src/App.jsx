import React from 'react';
import Posts from './pages/Posts';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import PostById from './pages/PostById';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:id" element={<PostById />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
