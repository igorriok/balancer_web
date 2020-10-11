import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./LoginPage";


function ProtectedPage() {
  return <h3>Protected</h3>;
}


function App() {
  
  const [auth, setAuth] = useState(false);
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <PrivateRoute
            path="/protected"
            auth={auth}
            setAuth={setAuth}
          >
            <ProtectedPage />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
