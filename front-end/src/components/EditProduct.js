import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { getProducts } from "../redux/catalogSlice";
import productService from "../services/products.service";
import { EditProductForm } from "./EditProductForm";
import Button from 'react-bootstrap/Button';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeInventory = this.onChangeInventory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.state = {
            currentProduct: {
                id: null,
                name: "",
                brand: "",
                inventory: 0,
                price: 0,
                image: "",
                description: "",
                submitted: false,
            },
            submitted: false,
        };
    };
    componentDidMount() {
        this.getProducts(this.props.match.params.id);
    }
    getProducts(id) {
        productService.getProductById(id)
            .then((response) => {
                this.setState({
                    currentProduct: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: name,
                },
            };
        });
    }

    onChangeBrand(e) {
        const brand = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    brand: brand,
                },
            };
        });
    }

    onChangeInventory(e) {
        const inventory = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    inventory: inventory,
                },
            };
        });
    }

    onChangePrice(e) {
        const price = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    price: price,
                },
            };
        });
    }

    onChangeImage(e) {
        const image = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    image: image,
                    file: e.target.files[0],
                },
            };
        });
    }

    onChangeDescription(e) {
        const desc = e.target.value;
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    description: desc,
                },
            };
        });
    }

    updateProduct(event) {
        event.preventDefault();
        console.log("updateProduct()");
        console.log(this.state.currentProduct.id);
        console.log(this.state.currentProduct);
        const{name,brand,inventory,price,image,description} = this.state.currentProduct;
        console.log(this.state.currentProduct);
        productService.update(this.state.currentProduct.id, {name,brand,inventory,price,description})
            .then((res) => {
                console.log(res);
                if(image) {
                    productService.addImage(res.data.id, this.state.file).then(this.setState({ submitted: true }))
                }
                
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully</h4>
                        <LinkContainer to="/admin"><Button variant="success" size="sm">Go Back to Catalog</Button></LinkContainer>
                    </div>
                ) : (
                    <EditProductForm name={this.state.currentProduct.name} changeName={this.onChangeName}
                        brand={this.state.currentProduct.brand} changeBrand={this.onChangeBrand}
                        inventory={this.state.currentProduct.inventory} changeInventory={this.onChangeInventory}
                        price={this.state.currentProduct.price} changePrice={this.onChangePrice}
                        image={this.state.currentProduct.image} changeImage={this.onChangeImage}
                        description={this.state.currentProduct.description} changeDescription={this.onChangeDescription}
                        updateProduct={this.updateProduct} />
                )}
            </div>
        )
    }
}

export default EditProduct;