import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { QuantityUpdator } from './QuantityUpdator';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { priceFormatter, ellipsis } from '../utilFunctions';


export const CartTable = () => {
    let items = useSelector( state => state.cart.items );
    const dispatch = useDispatch();
    return (<>
        <Table striped bordered size='sm' responsive>
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
                        <td><Image src={product.image} alt={"image of "+product.name}roundedCircle className="product-image"/></td>
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


    </>);

}