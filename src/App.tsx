import React, {createContext, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import './App.css';
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Singup";


function ProtectedPage() {
  return <h3>Protected</h3>;
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function useProvideAuth() {
  
  const [user, setUser] = useState<string>("");
  
  const signin = (cb: any) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };
  
  const signout = (cb: any) => {
    return fakeAuth.signout(() => {
      setUser("");
      cb();
    });
  };
  
  return {
    user,
    signin,
    signout
  };
}

// @ts-ignore
function ProvideAuth({ children }) {
  
  const auth = useProvideAuth();
  
  return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
  );
}

// @ts-ignore
const authContext = createContext();

function App() {
  
  
  
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <div>
        
            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignupPage />
              </Route>
              <PrivateRoute exact path="/dashboard">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
            
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
