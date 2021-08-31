import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../components/ProductList';
import { addToCart } from '../redux/cartSlice';
import './BrowseProducts.css';

export const BrowseProducts = () => {
    let products = useSelector(state => state.catalog.products);
    return (<>
        <ProductList products={products}/>
    </>);
}