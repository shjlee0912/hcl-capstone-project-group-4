import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { getProducts } from "../redux/catalogSlice";
import productService from "../services/products.service";
import { EditProductForm } from "./EditProductForm";
import { Button, Container } from 'react-bootstrap';

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
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.state = {
            currentProduct: {
                id: null,
                name: "",
                brand: "",
                inventory: 0,
                price: 0,
                image: "",
                description: "",
                categories: [],
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
                    currentProduct: {
                        ...response.data,
                        categories: response.data.categories.map(c => c.name)
                    },
                });
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
        e.preventDefault();
        this.setState(function (prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    image: e.target.value,
                    file: e.target.files[0],
                },
            };
        });
    }

    addCategory(e) {
        let cat = e.target.value;
        if(cat==="")
            return;
        this.setState({
            currentProduct: {
                ...this.state.currentProduct,
                categories: [...this.state.currentProduct.categories, cat],
            }
        })
    }

    removeCategory(cat) {
        this.setState({
            currentProduct: {
                ...this.state.currentProduct,
                categories: this.state.currentProduct.categories.filter(c => c!==cat),
            }
        })
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

    async updateProduct(event, callback) {
        event.preventDefault();
        const{name,brand,inventory,price,image,description} = this.state.currentProduct;
        let categories;
        try {
            const response = await productService.getCategoriesByName(this.state.currentProduct.categories);
            categories = response.data
        } catch(err) {
            console.log(err);
        } 
        productService.update(this.state.currentProduct.id, {name,brand,inventory,price,description, categories})
            .then((res) => {
                if(image) {
                    productService.addImage(res.data.id, this.state.currentProduct.file).then(this.setState({ submitted: true }))
                }
                this.setState({submitted: true});
                callback();
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
                ) : (<Container className="mb-3">
                        <EditProductForm name={this.state.currentProduct.name} changeName={this.onChangeName}
                            brand={this.state.currentProduct.brand} changeBrand={this.onChangeBrand}
                            inventory={this.state.currentProduct.inventory} changeInventory={this.onChangeInventory}
                            price={this.state.currentProduct.price} changePrice={this.onChangePrice}
                            image={this.state.currentProduct.image} changeImage={this.onChangeImage}
                            description={this.state.currentProduct.description} changeDescription={this.onChangeDescription}
                            categories={this.state.currentProduct.categories} addCategory={this.addCategory} removeCategory={this.removeCategory}
                            updateProduct={this.updateProduct} />
                    </Container>
                )}
            </div>
        )
    }
}

export default EditProduct;