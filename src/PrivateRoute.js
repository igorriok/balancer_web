import React, {useState} from "react";
import { Redirect, Route } from "react-router-dom";



const LOGIN_URL = process.env.NODE_ENV !== "production" ?
    'http://192.168.202.21:8180/auth' :
    'https://esso-test.orange.md/auth';



export default function PrivateRoute({ children, ...rest }) {

    const { auth } = rest;
    const [token, setToken] = useState("");


    const signIn = () => {


        return null;
    };

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}