import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import { useAuth0 } from "../contexts/auth0-context.js";

const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Index}/>
        <PrivateRoute path="/profile" component={Profile}/>
    </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth0();
    console.log(user);

    return (
        <Route
            {...rest}
            render={props =>
                user ? 
                ( <Component {...props}/> )
                :
                ( <Redirect to={{ pathname: "/" }}/> )
            }
        />
    )
}

export default AppRouter;