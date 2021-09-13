import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { connect } from "react-redux";
import productsService from "../services/products.service";
import { NewProductForm } from "./NewProductForm";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeInventory = this.onChangeInventory.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.state = {
            id: null,
            name: "",
            brand: "",
            inventory: 0,
            price: 0,
            categories: [],
            image: "",
            description: "",
            submitted: false,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeBrand(e) {
        this.setState({
            brand: e.target.value,
        });
    }

    onChangeInventory(e) {
        this.setState({
            inventory: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    onChangeImage(e) {
        e.preventDefault();
        this.setState({
            image: e.target.value,
            file: e.target.files[0]
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    addCategory(e) {
        let cat = e.target.value;
        if(cat==="")
            return;
        this.setState({
            categories: [...this.state.categories, cat],
        })
    }

    removeCategory(cat) {
        this.setState({
            categories: this.state.categories.filter(c => c!==cat),
        })
    }

    
    async saveProduct(e, callback) {
        e.preventDefault();
        const { name, brand, inventory, price, image, description } = this.state;
        let categories;
        try {
            const response = await productsService.getCategoriesByName(this.state.categories);
            categories = response.data
        } catch(err) {
            console.log(err);
        } 
        productsService.create({name, brand, inventory, price, description, categories})
            .then((res) => {
                let data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    brand: data.brand,
                    inventory: data.inventory,
                    price: data.price,
                    categories: data.categories.map(c => c.name),
                    //image: data.image,
                    description: data.description,
                    submitted: true,
                });
                productsService.addImage(this.state.id, this.state.file);
                callback();
            }).catch((e) => {
                console.log(e);
            });
    }

    newProduct() {
        this.setState({
            id: null,
            name: "",
            brand: "",
            inventory: 0,
            price: 0,
            image: "",
            categories: [],
            description: "",
            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully</h4>
                        <button className="btn btn-success" onClick={this.newProduct}>Add</button>
                    </div>
                ) : ( <Container className="mb-3">
                        <h3>Add a New Product</h3>
                        <NewProductForm name={this.state.name} changeName={this.onChangeName}
                            brand={this.state.brand} changeBrand={this.onChangeBrand}
                            inventory={this.state.inventory} changeInventory={this.onChangeInventory}
                            price={this.state.price} changePrice={this.onChangePrice}
                            image={this.state.image} changeImage={this.onChangeImage}
                            description={this.state.description} changeDescription={this.onChangeDescription}
                            categories={this.state.categories} addCategory={this.addCategory} removeCategory={this.removeCategory}
                            saveProduct={this.saveProduct} />
                    </Container>
                )}
            </div>
        );
    }
}

// export default connect(null, {})(AddProduct);
export default AddProduct;