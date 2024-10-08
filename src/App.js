import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import './App.css';
import BlogListPage from './Pages/Blog/BlogListPage';
import BlogDetailsPage from './Pages/Blog/BlogDetailsPage';
import CreateBlog from './Pages/Blog/CreateBlog';
import Profile from './Pages/Profile/Profile';
import EditBlog from './Pages/Blog/EditBlog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
