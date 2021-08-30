import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { QuantityUpdator } from './QuantityUpdator';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const priceFormatter = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'});

export const CartTable = () => {
    let items = useSelector( state => state.cart.items );
    const dispatch = useDispatch();
    const ellipsis = (text, maxLen) => text.length>maxLen?text.substr(0,maxLen-3)+"...":text;
    return (<Container>
        <Table striped bordered size='sm'>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="cart-table-body">
                {items.map( ({product, quantity}) => {
                    return (<tr key={product.id}>
                        <td><Image src="https://via.placeholder.com/500" roundedCircle className="product-image"/></td>
                        <td>{product.name}</td>
                        <td className="description"><p>{ellipsis(product.description, 40)}</p></td>
                        <td>{priceFormatter.format(product.price)}</td>
                        <td><QuantityUpdator prodId={product.id}/></td>
                        <td>{priceFormatter.format(product.price*quantity)}</td>
                        <td className="remove">
                            <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(product.id))}>remove</Button>
                        </td>
                    </tr>
                    );
                })}
                <tr>
                    <td id="total-label" colSpan={5}>Order Total: </td>
                    <td id="total">{priceFormatter.format(items.map(i => i.product.price * i.quantity).reduce( (p1, p2) => p1 + p2 ))}</td>
                    <td id="checkout">
                        <LinkContainer to="/checkout"><Button variant="success">Proceed To Checkout</Button></LinkContainer>
                    </td>
                </tr>
            </tbody>
        </Table>


    </Container>);

}