import React, {useState, createContext, useContext} from "react";
import {User} from "./entities/User";


const LOGIN_URL = process.env.NODE_ENV !== "production" ?
    'http://localhost:5037/authenticate' :
    'http://178.168.41.217:5037/authenticate';

// @ts-ignore
const authContext: any = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
// @ts-ignore
export function ProvideAuth({ children }) {

    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth: any = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    
    const userString: string | null = localStorage.getItem('user');
    const userObj: User = /*userString ? JSON.parse(userString) :*/ {username: "", token: ""};

    const [user, setUser] = useState<User>(userObj);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signIn = (email: string, password:string, cb: any) => {

        return fetch(LOGIN_URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: email, password: password}),
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            
            console.dir(data);
            
            localStorage.setItem("user", JSON.stringify({username: email, token: data.token}));
            
            setUser({username: email, token: data.token});
            
            cb();
            return data;
        }).catch((error) => {
            console.error(error);
        })

    };

    const signOut = () => {
        setUser({username: "", token: ""});
    };

    const sendPasswordResetEmail = (email: string) => {

    };

    const confirmPasswordReset = (code: string, password: string) => {

    };


    // Return the user object and auth methods
    return {
        user,
        signin: signIn,
        signout: signOut,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}