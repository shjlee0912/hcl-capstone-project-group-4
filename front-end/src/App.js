import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { BrowseProducts } from './pages/BrowseProducts';
import { ViewCart } from './pages/ViewCart';
import { getUserInfo, logout } from './redux/authSlice'
import { Checkout } from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Alert } from 'react-bootstrap';
import AddProduct from './components/AddProduct'
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
    let checkLoggedInInterval = setInterval(() => checkLoggedIn(), 30000);
    return () => clearInterval(checkLoggedInInterval);
  }, []);


  return (<>
      {expectedLoggedIn&&!loggedIn
        ?<Alert variant="danger">
          <Alert.Heading>Your session has expired</Alert.Heading>
          <p>you have been logged out</p>
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
          <Route path="/products">
            <BrowseProducts/>
          </Route>
          <Route path="/cart">
            <ViewCart/>
          </Route>
          <Route path="/checkout">
            {user
              ?<Checkout/>
              :<Redirect to="/"/>
            }
          </Route>
          <Route path="/admin">
            {/* {user&&user.roles.includes("ROLE_ADMIN")
              ?<>
                <AddProduct/>
              </>
              :<Redirect to="/"/>
            } */}
            
          </Route>
        </Switch>
      </Router>
  </>);
}

export default App;
