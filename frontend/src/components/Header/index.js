import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth';

// import { Container } from './styles';

function Header() {
    return (
        <header className="py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-12 d-flex justify-content-end align-items-center">

                    {isAuthenticated() === false ? (
                        <>
                            <Link className="btn btn-sm btn-outline-secondary mx-1" to="/login">Login</Link>
                            <Link className="btn btn-sm btn-outline-secondary mx-1" to="/register">Create account</Link>
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