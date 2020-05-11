import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SoldAll from "./pages/SoldAll";
import SavedAll from "./pages/SavedAll";
import ActiveAll from "./pages/ActiveAll";
import SellPage from "./pages/SellPage";
import Browse from "./pages/Browse";
import Single from "./pages/Single";
import CategoryView from "./pages/CategoryView";
import Search from "./pages/Search";
import { useAuth0 } from "../contexts/auth0-context.js";



const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/browse" component={Browse}/>
        <Route path="/browse/single/:listinguid" component={Single}/>
        <Route path="/browse/category/:category" component={CategoryView}/>
        <Route path="/browse/search/:searchvalue" component={Search}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
        <PrivateRoute path="/profile/allsold" component={SoldAll}/>
        <PrivateRoute path="/profile/allsaved" component={SavedAll}/>
        <PrivateRoute path="/profile/allactive" component={ActiveAll}/>
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