import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SellPage from "./pages/SellPage";
import Browse from "./pages/Browse";
import Single from "./pages/Single";
import CategoryView from "./pages/CategoryView";
import { useAuth0 } from "../contexts/auth0-context.js";



const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/browse" component={Browse}/>
        <Route path="/browse/single/:listinguid" component={Single}/>
        <Route path="/browse/category/:category" component={CategoryView}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/sell" component={SellPage}/>
    </Switch>
);



const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth0();

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