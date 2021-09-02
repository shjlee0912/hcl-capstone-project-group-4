import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BsPlusCircle } from 'react-icons/bs'
import { BsDashCircle } from 'react-icons/bs'

export const QuantityUpdator = ( {prodId} ) => {
    let item = useSelector(state => state.cart.items.find(i => i.product.id===prodId));
    if(!item) {
        return(<p style={{color: "red"}}>invalid item</p>);
    }
    let quant = item.quantity;
    let product = item.product;
    const dispatch = useDispatch();
    const increment = (event) => {
        dispatch(incrementQuantity(prodId));
    }
    const decrement = (event) => {
        if(quant>1) {
            dispatch(decrementQuantity(prodId));
        }
    }
    const changeQuantity = (amt) => dispatch(updateQuantity({productId: prodId, quantity: parseInt(amt)}));
    const validateAndUpdate = (event) => {
        if(event.target.value.match(/^[0-9]*$/)) {
            changeQuantity(event.target.value?event.target.value:0);
        }
    }
    return (  <Container>
        <span className={quant<=product.inventory?"":"insufficient-error-msg"}>
            <div className="quant-updator">
                <Button data-testid="dec-btn" variant='danger' size='sm' onClick={(event) => decrement(event)}><BsDashCircle/></Button>
                    <input data-testid="quant-input" type="text" value={quant} className={quant<=product.inventory && quant>0?"quant":"quant insufficient-error"} onChange={(event) => validateAndUpdate(event)} />
                <Button data-testid="inc-btn" variant='success' size='sm' onClick={(event) => increment(event)}><BsPlusCircle/></Button>
            </div>
            <br/>
        </span>
    </Container>);
}