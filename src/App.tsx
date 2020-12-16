import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import PrivateRoute from "./PrivateRoute";
import { ProvideAuth } from "./use-auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Singup";
import Dashboard from "./pages/Dashboard";



function App() {
  
  const [ pageTools, setPageTools ] = useState([]);
  
  const tools = () => {
    return (
        <div>
          {pageTools}
        </div>
    )
  }
  
  
  return (
    <div className="App">
      <ProvideAuth>
  
        <div className="topNav">
          
          <div id="toolbar">
  
            <button className="btn">
              <i className="material-icons">menu</i>
            </button>
            
            {
              pageTools
            }

          </div>
          
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
                <Dashboard
                    setPageTools={setPageTools}
                />
              </PrivateRoute>
            </Switch>
            
          </div>
        </Router>
        
      </ProvideAuth>
    </div>
  );
}

export default App;
