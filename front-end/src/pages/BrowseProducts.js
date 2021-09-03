import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../components/ProductList';
import { FilterForm } from '../components/FilterForm';
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProducts } from '../redux/catalogSlice';
import './BrowseProducts.css';

export const BrowseProducts = () => {
    const dispatch = useDispatch();
    let productsLoaded = useSelector(state => state.catalog.loaded);
    if(!productsLoaded) {
        dispatch(getProducts());
    }
    let filterObject = useSelector(state => state.catalog.filter);
    let products = useSelector(state => state.catalog.products);
    return (<>
        <div className="d-flex justify-content-center mt-3"><h2>Product Catalog</h2></div>
        <FilterForm/>
        {productsLoaded
            ?<ProductList data-testid="product-list" products={products}/>
            :<Container>
            <Row className="mt-5 spinner-row">
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
            </Row>
            <Row className="spinner-row">
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
            </Row>
        </Container>
        }
    </>);
}