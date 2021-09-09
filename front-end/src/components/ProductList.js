import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProductCard } from "./ProductCard";

export const ProductList = ({products}) => {
    return(<Container fluid className="d-flex justify-content-center">
            <Row style={{flexGrow: 1}}className="p-3" xl={4} md={3} sm={2} xs={1}>
                {products.map( p => {
                    return (<Col data-testid="card-col" className="mb-4" key={p.id}><ProductCard product={p}/></Col>);
                })}
            </Row>
    </Container>);
}