import React, { Component } from "react";
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
        this.state = {
            id: null,
            name: "",
            brand: "",
            inventory: 0,
            price: 0,
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
        console.log(e.target.value);
        console.log(e.target.files[0]);
        // const formData = new FormData();
        // formData.append('file',this.state.image);
        // productsService.addImage(this.state.id, formData)
        //     .then(res =>{
        //         console.log(res.data);
        //         alert("File uploaded successfully");
        //     });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    
    saveProduct(e) {
        e.preventDefault();
        const { name, brand, inventory, price, image, description } = this.state;
        //let product_id = -1;
        const formData = new FormData();
        formData.append('file', this.state.file);
        productsService.create({name, brand, inventory, price, description},formData)
            .then((res) => {
                let data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    brand: data.brand,
                    inventory: data.inventory,
                    price: data.price,
                    //image: data.image,
                    description: data.description,
                    submitted: true,
                });
                console.log(this.state.image);
                console.log(image);
            }).catch((e) => {
                console.log(e);
            });
        console.log(this.state.id);
        //productsService.addImage(this.state.id, image);
    }

    newProduct() {
        this.setState({
            id: null,
            name: "",
            brand: "",
            inventory: 0,
            price: 0,
            image: "",
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
                ) : (
                    <NewProductForm name={this.state.name} changeName={this.onChangeName}
                        brand={this.state.brand} changeBrand={this.onChangeBrand}
                        inventory={this.state.inventory} changeInventory={this.onChangeInventory}
                        price={this.state.price} changePrice={this.onChangePrice}
                        image={this.state.image} changeImage={this.onChangeImage}
                        description={this.state.description} changeDescription={this.onChangeDescription}
                        saveProduct={this.saveProduct} />
                )}
            </div>
        );
    }
}

// export default connect(null, {})(AddProduct);
export default AddProduct;