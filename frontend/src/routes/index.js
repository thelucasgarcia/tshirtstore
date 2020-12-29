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
import ProductForm from "../pages/Products/Form";
import ProductView from "../pages/Products/View";
import About from "../pages/About";

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
            <Route path="/about" component={() => <About/>} />

            <Route path="/products" exact  component={() => <MyProducts />} /> 
            <PrivateRoute path="/product/create" component={() => <ProductForm />} />  
            <PrivateRoute path="/product/:id/edit" component={(e) => <ProductForm e={e} />} />
            <Route path="/product/:id" component={() => <ProductView />} />

            <Route path="*" component={() => <NotFound />} />
        </Switch>

    </BrowserRouter>
);

export default Routes;
