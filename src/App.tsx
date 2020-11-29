import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import PrivateRoute from "./PrivateRoute";
import { ProvideAuth } from "./use-auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import menuIcon from './icons/menu-white-48dp.svg';



function App() {
  
  
  
  return (
    <div className="App">
      <ProvideAuth>
  
        <div className="topnav">
          <button className="btn">
            <img src={menuIcon} alt="menu" height={30}/>
          </button>
        </div>
        
        <Router>
          <div>
        
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/signup">
                <SignupPage />
              </Route>
              <PrivateRoute exact path="/">
                <Dashboard />
              </PrivateRoute>
            </Switch>
            
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
