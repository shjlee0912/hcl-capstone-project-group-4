import React,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import ProductsService from '../services/products.service';

export const NewProductForm = (props) => {
    return (
        <div className="new-product-form">
            <Form method="post" enctype="multipart/form-data">
                <Form.Group className="mb-3" controlId = "productName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={props.name} onChange={props.changeName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" value={props.brand} onChange={props.changeBrand}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productInventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control type="number" value={props.inventory} onChange={props.changeInventory}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={props.price} onChange={props.changePrice}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" rows={3} value={props.description} onChange={props.changeDescription}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control type="file" name="image" accept="image/png, image/jpeg" value={props.image} onChange={props.changeImage}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={props.saveProduct}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}