import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import OrdersService from '../services/orders.service';
import { priceFormatter } from '../utilFunctions';
import { AddressInput } from '../components/AddressInput';
import { Container, Button, Form } from 'react-bootstrap';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Redirect } from 'react-router';


const cardOptions = {
    hidePostalCode: false,
    style: {
        base: {
            color: "black", 
        },
        invalid: {
            color: "red",
        }
    }
}

export const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const items = useSelector(state => state.cart.items);
    const total = items.length>0?items.map(i => i.quantity * i.product.price).reduce((t1, t2) => t1 + t2):0;
    const user = useSelector(state => state.auth.user);
    const [userAddrId, setUserAddrId] = useState(user.addresses[0] && user.addresses[0].id);
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false)

    const [newAddr, setNewAddr] = useState(user.addresses.length>0&&user.addresses[0]!=null?false:true);
    const [streetAddr, setStreetAddr] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addrFailed, setAddrFailed] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [nameFailed, setNameFailed] = useState(false);

    if(items.length===0) {
        return <Redirect to="/cart"/>
    }

    const validate = () => {
        if(newAddr===false)
            return;
        let succeeded = true;
        if(streetAddr.length<1 || city.length<1 || state.length<1 || !String(zipCode).match(/[0-9]{5}/)) {
            setAddrFailed(true);
            succeeded = false;
        } else {
            setAddrFailed(false);
        }
        if(firstName.length<1 || lastName.length<1) {
            setNameFailed(true);
        } else {
            setNameFailed(false)
        }
        return succeeded;
    }

    const submitPayment = async (e) => {
        setDisabled(true);
        setPaymentFailed(false);
        if( (newAddr &&!validate()) || !stripe || !elements) {
            setDisabled(false);
            return;
        }
        let addressId;
        e.preventDefault();
        if(newAddr) {
            try {
                let newAddrRes = await OrdersService.createShippingAddress({
                    username: user.username,
                    firstName,
                    lastName,
                    streetAddr,
                    city,
                    state,
                    zipCode,
                });
                addressId = newAddrRes.data.id;
            } catch(err) {
                setPaymentFailed(true);
                setDisabled(false);
                return;
            }
        } else {
            addressId = userAddrId
        }
        const cardElement = elements.getElement(CardElement)

        const result = await stripe.createToken(cardElement);

        if(result.error) {
            setPaymentFailed(true);
            setDisabled(false);
            return;
        }

        const orderobj = {
            token: result.token.id,
            username: user.username,
            addressId: addressId,
            items: items.map( item => {
                return {productId: item.product.id, quantity: item.quantity}
            }),
        }

        const response = await OrdersService.placeOrder(orderobj);
        setDisabled(false);
        dispatch(clearCart());
    }

    return (<>
        <Container/>
            <Container className="mb-4 mt-4">
                <h2>Checkout</h2>
                <h5>total: {priceFormatter.format(total)}</h5>
                {paymentFailed?<p style={{color: "red"}}>payment failed</p>:null}
            </Container>

            <Container className="mb-3">
                <Form.Check
                    className="mb-2"
                    type="switch"
                    label="use existing shipping address"
                    disabled={user.addresses.length<1||user.addresses[0]==null}
                    checked={!newAddr}
                    onChange={() => setNewAddr(oldVal => !oldVal)}/>
                {newAddr
                    ?<AddressInput title="Add New Shipping Address To Account" addrFailed={addrFailed} streetAddr={streetAddr} setStreetAddr={setStreetAddr}
                    city={city} setCity={setCity} state={state} setState={setState} zipCode={zipCode} setZipCode={setZipCode}
                    firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} nameFailed={nameFailed}/>
                    :(<><Form.Label>Select Address:</Form.Label>
                        <Form.Select value={userAddrId} onChange={(e) => setUserAddrId(e.target.value)}>
                        {user.addresses.map(addr => (
                            <option key={addr.id} value={addr.id}>{addr.streetAddr}, {addr.city}, {addr.state}, {addr.zipCode}</option>
                        ))}
                        </Form.Select></>)
                }
            </Container>
            <Container className="border rounded p-4">
                <CardElement options={cardOptions}/>
            </Container>
            <div className="d-flex justify-content-center m-3">
                <Button disabled={disabled} variant="success" onClick={submitPayment}>Confirm Payment of {priceFormatter.format(total)}</Button>
            </div>
        <Container/>
    </>);
}