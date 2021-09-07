import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';

export const NewProductForm = () => {
    return (
        <div className="new-product-form">
            <Form>
                <Form.Group className="mb-3" controlId = "productName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" value={this.state.brand} onChange={this.onChangeBrand}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productInventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control type="number" value={this.state.inventory} onChange={this.onChangeInventory}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={this.state.price} onChange={this.onChangePrice}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId = "productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={this.state.description} onChange={this.onChangeDescription}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control type="file" value={this.state.image} onChange={this.onChangeImage}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.saveProduct}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}