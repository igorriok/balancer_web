import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import './App.css';
import PrivateRoute from "./PrivateRoute";
import { ProvideAuth } from "./use-auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import GroupsPage from "./pages/GroupsPage";
import Settings from "./pages/Settings";



function App() {
  
  const [ pageTools, setPageTools ] = useState<JSX.Element[]>([]);
  const [ openMenu, setOpenMenu ] = useState<boolean>(false);
  const [ pageName, setPageName ] = useState<JSX.Element>(<div/>);
  
  
  function handleClick(e: MouseEvent) {
    //console.dir(e);
    // @ts-ignore
    if (e?.target?.id !== "menuIcon") {
      setOpenMenu(false);
    }
    
  }
  
  
  useEffect(() => {
  
    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    }
  },[]);
  
  
  return (
    <div className="App">
      <ProvideAuth>
        
        <Router>
  
          <div className="topNav">
    
            <div id="toolbar">
      
              <div className="menuDropdown">
                <button
                    className="btn"
                    id="menuButton"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                  <i className="material-icons" id="menuIcon">
                    menu
                  </i>
                </button>
                {
                  openMenu &&
                    <div className="menuDropdownContent">
                      <Link to={"/"}>Dashboard</Link>
                      <Link to={"/groups"}>Groups</Link>
                      <Link to={"/settings"}>Settings</Link>
                    </div>
                }
              </div>
              
              {
                pageName
              }
      
              {
                pageTools
              }
    
            </div>
          </div>
          
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
                    setPageName={setPageName}
                />
              </PrivateRoute>
              
              <PrivateRoute exact path="/groups">
                <GroupsPage
                    setPageTools={setPageTools}
                    setPageName={setPageName}
                />
              </PrivateRoute>
  
              <PrivateRoute exact path="/settings">
                <Settings
                    setPageName={setPageName}
                />
              </PrivateRoute>
              
              <Route path="*">
                <Redirect to="/"/>
              </Route>
              
            </Switch>
            
          </div>
        </Router>
        
      </ProvideAuth>
    </div>
  );
}

export default App;
