import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from '../components/ProductList';
import { addToCart } from '../redux/cartSlice';
import { filter } from '../redux/catalogSlice';
import { getProducts } from '../redux/catalogSlice';
import './BrowseProducts.css';

export const BrowseProducts = () => {
    const dispatch = useDispatch();
    let productsLoaded = useSelector(state => state.catalog.loaded);
    if(!productsLoaded) {
        dispatch(getProducts());
    }
    let filterObject = useSelector(state => state.catalog.filter);
    let products = useSelector(state => state.catalog.products);
    return (<>
        <ProductList data-testid="product-list" products={products}/>
    </>);
}