import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../components/SignUp';
import BlogPosts from '../components/BlogPosts';
import Login from '../components/Login';

function AllRoutes(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element ={<BlogPosts />} />
                <Route path="/signup" element ={<SignUp />} />
                <Route path="/login" element ={<Login />} />
            </Routes>
        </div>
    );
}

export default AllRoutes;