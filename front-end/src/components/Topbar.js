import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import './Topbar.css';


export const Topbar = () => {
    const numCartItems = useSelector(state => state.cart.items.length);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    return(<>
        <Navbar sticky="top" bg="light" expand="md">
                <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <LinkContainer to="/" className="block" aria-label="Cruip">
                  <img className="mx-auto" src={require('./gm_logo.svg').default} width="140" height="140" alt="Hero" />
            </LinkContainer>
          </div>
                <div className="toggle-margin"><Navbar.Toggle aria-controls="responsive-navbar-nav"/></div>
                <Navbar.Collapse className="justify-content-between">
                    <Nav>
                        <LinkContainer className="link" to="/products"><Navbar.Text>View Products</Navbar.Text></LinkContainer>
                        {user&&user.roles.includes("ROLE_ADMIN")?<LinkContainer className="link" to="/admin"><Navbar.Text>Edit Catalog</Navbar.Text></LinkContainer>:null}
                        {user&&user.roles.includes("ROLE_ADMIN")?<LinkContainer className="link" to="/new-products"><Navbar.Text>Add New Product</Navbar.Text></LinkContainer>:null}
                        {user&&user.roles.includes("ROLE_ADMIN")?<Nav.Link className="link" href="http://localhost:9191/swagger-ui.html"><Navbar.Text>View Swagger-UI</Navbar.Text></Nav.Link>:null}
                    </Nav>
                    <div className="toggle-margin">
                        <Nav> 
                            {loggedIn?<Navbar.Text ><Badge bg="secondary">Logged in as {user?user.username:null}</Badge></Navbar.Text>:null}
                            {loggedIn? <LinkContainer className="link" to="/cart"><Navbar.Text><AiOutlineShoppingCart size="1.7rem"/><Badge pill bg="info">{numCartItems}</Badge></Navbar.Text></LinkContainer>:null}
                            {loggedIn?<Navbar.Text className="link" onClick={() => {
                                dispatch(logout()); 
                                dispatch(clearCart());
                            }}>Logout</Navbar.Text>:null}
                            {loggedIn?null:<LinkContainer className="link" to="/login"><Navbar.Text>Login</Navbar.Text></LinkContainer>}
                            {loggedIn?null:<LinkContainer className="link" to="/register"><Navbar.Text>Sign Up</Navbar.Text></LinkContainer>}
                        </Nav>
                    </div>
                </Navbar.Collapse>

        </Navbar>
    </>);
}
