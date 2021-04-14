import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ResponsiveDrawer from "../../components/Navigation/ResponsiveDrawer";
import Books from "../../components/Books/Books";
import Categories from "../../components/Categories/Categories";
import './Layout.css';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Login from "../../components/Auth/Login/Login";
import Register from "../../components/Auth/Register/Register";

const Layout = (props) => {
    let routes = (
        <Switch>
            <Route exact path="/">
                <Books/>
            </Route>
            <Route exact path="/books">
                <Books/>
            </Route>
            <Route exact path="/categories">
                <Categories/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/register">
                <Register/>
            </Route>
        </Switch>
    )

    return (
        <React.Fragment>
            <div id="rootContainer">
                <ResponsiveDrawer isAuthenticated={props.isAuthenticated}
                                  username={props.username}
                                  logout={props.logoutUser}/>
                <main id="mainContainer">
                    {routes}
                </main>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        username: state.authReducer.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onTryAutoSignIn: () => dispatch(actions.authCheckState()),
        logoutUser: () => dispatch(actions.logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
