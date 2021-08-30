import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ViewCart } from './pages/ViewCart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (<>
  
      <Router>
        {/* a topbar could go here */}
        <Switch>
          <Route exact path="/">
            homepage
          </Route>
          <Route exact path="/login">
            login form goes here
          </Route>
          <Route exact path="/register">
            registration form goes here
          </Route>
          <Route path="/products">
            product catalog could go here
          </Route>
          <Route path="/cart">
            <ViewCart/>
          </Route>
          <Route path="/checkout">
            checkout form could go here
          </Route>
          <Route path="/admin">
            all admin routes can be nested here
          </Route>
        </Switch>
      </Router>
  </>);
}

export default App;
