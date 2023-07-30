// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BlogPosts from './components/BlogPosts';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
     <div>
      <SignUpPage />
     </div>
  );
}

export default App;
