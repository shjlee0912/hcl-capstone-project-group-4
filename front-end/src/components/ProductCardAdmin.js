import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { priceFormatter } from '../utilFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import productService from "../services/products.service";
import { ButtonGroup } from 'react-bootstrap';
import { removeProduct } from "../redux/catalogSlice";

export const ProductCardAdmin = ({ product }) => {
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();

    let deleteProduct = (e) => {
        console.log(product.id);
        productService.delete(product.id);
        dispatch(removeProduct(product.id));
    }

    return (<>
        <Card as="div" bsPrefix="card">
            <span className="card-image">
                <Card.Img src={product.image} width="50" height="50" alt={`image of ${product.name}`} />
            </span>
            <Card.Body as="div" bsPrefix="card-body">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle bsPrefix="card-subtitle">{product.brand}</Card.Subtitle>
                <Card.Text elementType="p" bsPrefix="card-text">{product.description}</Card.Text>
                <Card.Text elementType="p" bsPrefix="card-text">Inventory: {product.inventory}</Card.Text>
            </Card.Body>
            <Card.Footer bsPrefix="card-footer">
                <div><strong>{priceFormatter.format(product.price)}</strong></div>
                <ButtonGroup>
                    <LinkContainer to={`/edit-products/${product.id}`}><Button variant="secondary" size="sm">Edit</Button></LinkContainer>
                    <Button variant="danger" size="sm" onClick={deleteProduct}>Delete</Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    </>)
}