import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useAuth} from "./use-auth";




// @ts-ignore
export default function PrivateRoute({ children, ...rest }) {

    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) => {

                //console.dir(auth.user.token);

                return auth.user.token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }}
        />
    );
}