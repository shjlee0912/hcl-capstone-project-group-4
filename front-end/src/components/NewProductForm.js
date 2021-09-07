import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';

export const NewProductForm = () => {
    return (
        <div className="new-product-form">
            <Form>
                <Form.Group className="mb-3" controlId = "productName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productInventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control type="file"/>
                </Form.Group>
            </Form>
        </div>
    )
}