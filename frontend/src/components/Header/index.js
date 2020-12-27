import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth';

// import { Container } from './styles';

function Header() {
    return (
        <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-4 pt-1"></div>
                <div className="col-4 text-center">
                    <a className="blog-header-logo text-dark" href="#">My Diary</a>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center">

                    {isAuthenticated() === false ? (
                        <>
                            <Link className="btn btn-sm btn-outline-secondary mx-1" to="/login">Sign in</Link>
                            <Link className="btn btn-sm btn-outline-secondary mx-1" to="/register">Sign up</Link>
                        </>
                    ) : (
                            <button className="btn btn-sm btn-outline-secondary mx-1" onClick={() => logout()}>Logout</button>
                        )}
                </div>
            </div>
        </header>
    );
}

export default Header;