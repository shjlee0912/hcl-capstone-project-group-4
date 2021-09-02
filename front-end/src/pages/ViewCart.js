
import { useSelector } from 'react-redux';
import { CartTable } from '../components/CartTable';
import Container from 'react-bootstrap/Container';
import './ViewCart.css';

export const ViewCart = () => {
    const items = useSelector(state => state.cart.items);
    return (<>
        <Container className="d-flex justify-content-center">
            <h2 data-testid="title">Your Cart</h2>
        </Container>
        <Container fluid="md">
            {items.length>0?<CartTable data-testid="cart-table"/>:<h4>your cart is currently empty</h4>}
        </Container>
    </>);
}