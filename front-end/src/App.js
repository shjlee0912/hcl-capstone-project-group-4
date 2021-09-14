import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { AuthRoute } from './components/Auth/AuthRoute';
import { Topbar } from './components/Topbar';
import { BrowseProducts } from './pages/BrowseProducts';
import { ViewCart } from './pages/ViewCart';
import { getUserInfo, logout } from './redux/authSlice'
import { Checkout } from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Alert } from 'react-bootstrap';
import { AdminView } from './pages/AdminView';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user);
  const [expectedLoggedIn, setExpectedLoggedIn] = useState(loggedIn===true);

  let checkLoggedIn = () => {
    if(localStorage.getItem("jwt")) {
      setExpectedLoggedIn(true);
      dispatch(getUserInfo());
    } else {
      setExpectedLoggedIn(false);
      dispatch(logout());
    }
  }
  useEffect(() => {
    checkLoggedIn();
    //need a better method of checking for expiration of token, should read from JWT
    // let checkLoggedInInterval = setInterval(() => checkLoggedIn(), 30000);
    // return () => clearInterval(checkLoggedInInterval);
  }, []);


  return (<>
      {expectedLoggedIn&&!loggedIn
        ?<Alert variant="danger">
          <Alert.Heading>You have been logged out</Alert.Heading>
        </Alert>
        :null
      }
      
      <Router>
        <Topbar data-testid="topbar"/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <AuthRoute path="/products" role="ROLE_USER">
            <BrowseProducts/>
          </AuthRoute>
          <AuthRoute path="/cart" role="ROLE_USER">
            <ViewCart/>
          </AuthRoute>
          <AuthRoute path="/checkout" role="ROLE_USER">
            <Checkout/>
          </AuthRoute>
          <AuthRoute path="/new-products" role="ROLE_ADMIN">
            <AddProduct/>
          </AuthRoute>
          <AuthRoute path="/edit-products/:id" role="ROLE_ADMIN">
            <EditProduct/>
          </AuthRoute>
          <AuthRoute path="/admin" role="ROLE_ADMIN">
            <AdminView/>
          </AuthRoute>
        </Switch>
      </Router>
  </>);
}

export default App;
