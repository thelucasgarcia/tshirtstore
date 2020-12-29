import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

function Menu() {
    return (
        <>
            <div className="container text-center my-5">
                <Link className="h1 text-muted text-decoration-none " to="/">TSHIRT STORE</Link>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand d-lg-none" to="/">TSHIRT STORE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav col-12 justify-content-center align-items-center">
                            <li className="nav-item mx-4">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            {isAuthenticated() && <>
                                <li className="nav-item mx-4">
                                    <Link className="nav-link" to="/products">My products</Link>
                                </li>
                                <li className="nav-item mx-4">
                                    <Link className="nav-link" to="/product/create">Create product</Link>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;