import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, reload } from '../redux/catalogSlice';
import { Form, Button, Badge, CloseButton } from 'react-bootstrap';

export const EditProductForm = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
    }, []);
    console.log(props.categories)
    const allCategories = useSelector(state => state.catalog.categories);
    return (
        <div className="edit-product-form">
            <Form enctype="multipart/form-data">
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
                <Form.Group className="mb-3">
                    <Form.Label>Categories</Form.Label>
                    <Form.Select onChange={props.addCategory}>
                        <option value=""></option>
                        {allCategories.filter(c => !props.categories.includes(c)).map( cat =>
                            <option key={cat} value={cat}>{cat}</option>
                        )}
                    </Form.Select>
                    {props.categories.map( cat => (
                        <Badge key={cat} pill className="m-2">
                           <div className="d-flex align-items-center justify-content-between">
                                <span className="m-1">{cat}</span>
                                <CloseButton onClick={() => props.removeCategory(cat)}/>
                            </div>
                        </Badge>   
                     ))}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control type="file" name="image" accept="image/png, image/jpeg" value={props.image} onChange={props.changeImage}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => props.updateProduct(e, () => dispatch(reload()))}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}