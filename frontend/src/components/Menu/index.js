import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, userAuth } from '../../services/auth';

function Menu() {
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
                <Link className="p-2 link-secondary" to="/">Home</Link>
                <Link className="p-2 link-secondary" to="/about">About</Link>
                {isAuthenticated() && <>
                    <Link className="p-2 link-secondary" to="/posts">My entries</Link>
                    <Link className="p-2 link-secondary" to="/posts/new">Write new entry</Link>
                    <p className="p-2 link-secondary">Welcome, {userAuth?.name}</p>
                </>}
            </nav>
        </div>
    );
}

export default Menu;