import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "../services/auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../components/Header";
import Menu from "../components/Menu";
import NotFound from "../pages/NotFound";
import MyProducts from "../pages/Products/index";
import ProductCreate from "../pages/Products/Create";
import ProductEdit from "../pages/Products/Edit";
import ProductShow from "../pages/Products/Show";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>

        <div className="container">
            <Header />
            <Menu />
        </div>

        <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/login" component={() => <Login />} />
            <Route path="/register" component={() => <Register />} />
            <PrivateRoute path="/product/create" component={() => <ProductCreate />} />  
            <PrivateRoute path="/product/:id/edit" component={() => <ProductEdit />} />
            <Route path="/product/:id" component={() => <ProductShow />} />
            <Route path="/product" component={() => <MyProducts />} /> 
            <Route path="*" component={() => <NotFound />} />
        </Switch>

    </BrowserRouter>
);

export default Routes;
