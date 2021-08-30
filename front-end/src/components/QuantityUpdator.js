import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BsPlusCircle } from 'react-icons/bs'
import { BsDashCircle } from 'react-icons/bs'

export const QuantityUpdator = ( {prodId} ) => {
    let item = useSelector(state => state.cart.items.find(i => i.product.id===prodId));
    let quant = item?item.quantity:0;
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
                <Button variant='danger' size='sm' onClick={(event) => decrement(event)}><BsDashCircle/></Button>
                    <input type="text" value={quant} className={quant<=product.inventory && quant>0?"quant":"quant insufficient-error"} onChange={(event) => validateAndUpdate(event)} />
                <Button variant='success' size='sm' onClick={(event) => increment(event)}><BsPlusCircle/></Button>
            </div>
                <br/>
        </span>
    </Container>);
}