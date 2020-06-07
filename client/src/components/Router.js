import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./_PAGES/Index";
import Profile from "./_PAGES/Profile";
import SoldAll from "./_PAGES/SoldAll";
import SavedAll from "./_PAGES/SavedAll";
import ActiveAll from "./_PAGES/ActiveAll";
import SellPage from "./_PAGES/SellPage";
import Browse from "./_PAGES/Browse";
import Single from "./_PAGES/Single";
import CategoryView from "./_PAGES/CategoryView";
import ErrorPage from "./_PAGES/ErrorPage";
import Search from "./_PAGES/Search";
import { useAuth0 } from "../contexts/auth0-context.js";



const AppRouter = () => (
    <Switch>
        <HomeRoute exact path="/" component={Index}/>
        {/* <Route exact path="/browse" component={Browse}/> */}
        <Route path="/browse/single/:listinguid" component={Single}/>
        <Route path="/browse/category/:category" component={CategoryView}/>
        <Route path="/browse/search/:searchvalue" component={Search}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
        <PrivateRoute path="/profile/allsold" component={SoldAll}/>
        <PrivateRoute path="/profile/allsaved" component={SavedAll}/>
        <PrivateRoute path="/profile/allactive" component={ActiveAll}/>
        <SellRoute path="/sell" component={SellPage}/>
        <Route component={ErrorPage}/>
    </Switch>
);

const HomeRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => 
                ( <Redirect to={{ pathname: "/browse/category/All-For-Sale" }}/>)
            }
        />
    )
}


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

const SellRoute = ({ component: Component, ...rest }) => {
    const { dbUser } = useAuth0();
    console.log(dbUser)

    return (
        <Route
        {...rest}
        render={props => 
            dbUser.first_name && dbUser.last_name ? 
            ( <Component {...props}/> )
            :
            ( <Redirect to={{ pathname: "/" }}/> )
        }
        />
    )
}

export default AppRouter;