import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SellPage from "./pages/SellPage";
import Browse from "./pages/Browse";
import { useAuth0 } from "../contexts/auth0-context.js";

const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Index}/>
        <Route path="/browse" component={Browse}/>
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

// const PrivateRouteSell = ({ component: Component, ...rest }) => {
//     const {dbUser} = useAuth0();
//     console.log(dbUser)

//     return (
//         <Route
//             {...rest}
//             render={props => 
//                 dbUser.first_name !== null ?
//                 ( <Component {...props}/> )
//                 :
//                 ( <Redirect to={{pathname: "/"}} /> )
//             }
//         />
//     )
// }

export default AppRouter;