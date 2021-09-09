import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { BrowseProducts } from './pages/BrowseProducts';
import { ViewCart } from './pages/ViewCart';
import { getUserInfo, logout } from './redux/authSlice'
import { Checkout } from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AdminView } from './pages/AdminView';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("jwt")) {
      dispatch(getUserInfo());
    } else {
      dispatch(logout());
    }
  })
  return (<>

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
            <Checkout/>
          </Route>
          <Route path="/new-products">
            <AddProduct/>
          </Route>
          <Route path='/edit-products/:id' component={EditProduct}/>
          <Route path="/admin">
            <AdminView/>
          </Route>
        </Switch>
      </Router>
  </>);
}

export default App;
