import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import './Topbar.css';


export const Topbar = () => {
    const numCartItems = useSelector(state => state.cart.items.length);
    return(<>
        <Navbar sticky="top" bg="light" expand="md">
                <LinkContainer className="m-2" to="/"><Navbar.Brand >Capstone Project</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-between">
                    <Nav>
                        <LinkContainer className="link" to="/products"><Navbar.Text>View Products</Navbar.Text></LinkContainer>
                    </Nav>
                    <Nav> 
                        <Navbar.Text><LinkContainer className="link" to="/cart"><div><AiOutlineShoppingCart size="1.7rem"/><div id="cart-size">{numCartItems}</div></div></LinkContainer></Navbar.Text>
                        <LinkContainer className="link" to="/login"><Navbar.Text>Login</Navbar.Text></LinkContainer>
                        <LinkContainer className="link" to="/register"><Navbar.Text>Sign Up</Navbar.Text></LinkContainer>
                        <LinkContainer className="link" to="/logout"><Navbar.Text >Logout</Navbar.Text></LinkContainer>
                    </Nav>
                </Navbar.Collapse>

        </Navbar>
    </>);
}