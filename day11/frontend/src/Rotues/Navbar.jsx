import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div>

            <Link to="/">Blog</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            
        </div>
    );
}

export default Navbar;