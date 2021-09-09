import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProductCardAdmin } from "./ProductCardAdmin";

export const ProductListAdmin = ({products}) => {
    return(<Container fluid>
        <Row className="p-3" xxl={5} xl={4} md={3} sm={2} xs={1}>
            {products.map( p => {
                return (<Col data-testid="card-col" className="mb-4" key={p.id}><ProductCardAdmin product={p}/></Col>);
            })}
        </Row>
    </Container>);
}