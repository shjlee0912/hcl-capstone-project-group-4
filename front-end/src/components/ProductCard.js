import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { priceFormatter } from '../utilFunctions';
import { addToCart } from '../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';


export const ProductCard = ({product}) => {
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const cartIds = useSelector(state => state.cart.items.map(item => item.product.id));

    const [quant, setQuant] = useState(1);
    const dispatch = useDispatch();
    const validateAndUpdate = (event) => {
        if(event.target.value.match(/^[0-9]*$/)) {
            if(event.target.value>product.inventory) {
                setQuant(product.inventory)
            } else {
                setQuant(event.target.value);
            }
        }
    }

    return(<>
        <Card as="div" bsPrefix="card">
            <span className="card-image">
                <Card.Img src={product.image} width="50" height="50" alt={`image of ${product.name}`}/>
            </span>
            <Card.Body as="div" bsPrefix="card-body">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle bsPrefix="card-subtitle">{product.brand}</Card.Subtitle>
                <Card.Text elementType="p" bsPrefix="card-text">{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer bsPrefix="card-footer">
                <div><strong>{priceFormatter.format(product.price)}</strong></div>
                {product.inventory>0
                    ?(loggedIn
                        ?(cartIds.includes(product.id)
                            ?<LinkContainer to="/cart"><Button variant="outline-primary" size="sm">in your cart</Button></LinkContainer>
                            :<><Button variant="primary" size="sm" onClick={() => dispatch(addToCart({product: product, quantity: quant}))}>Add to Cart</Button>
                        <input data-testid="qty-input" className="quant-input" type="number" min={1} max={product.inventory} value={quant} onChange={(event) => validateAndUpdate(event)}/></>
                        )
                        :<LinkContainer to="/login"><Button size="sm" variant="info">log in to purchase</Button></LinkContainer>
                    )
                    :<span>out of stock</span>
                }
            </Card.Footer>
        </Card>
    </>);
}