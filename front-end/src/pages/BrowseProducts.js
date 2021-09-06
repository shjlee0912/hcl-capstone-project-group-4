import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, incrementPage, decrementPage, getProducts, getCategories } from '../redux/catalogSlice';
import { ProductList } from '../components/ProductList';
import { FilterForm } from '../components/FilterForm';
import Spinner from 'react-bootstrap/Spinner'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BrowseProducts.css';

export const BrowseProducts = () => {
    const dispatch = useDispatch();
    let productsLoaded = useSelector(state => state.catalog.loaded);
    let pageNum = useSelector(state => state.catalog.page);
    let [enteredPageNum, setEnteredPageNum] = useState(pageNum);
    useEffect(() => {
        if(!productsLoaded)
            dispatch(getProducts()).then(dispatch(getCategories()));
    }, [productsLoaded]);
    let resultsPerPage = 12;
    let products = useSelector(state => state.catalog.products);
    let maxPage = Math.ceil(products.length/resultsPerPage);
    let productsToShow = products.slice((pageNum-1)*resultsPerPage, (pageNum-1)*resultsPerPage+resultsPerPage);
    const updatePage = (e) => {
        if(e.key && e.key!=="Enter") {
            return;
        } else if(enteredPageNum==="" || enteredPageNum<1) {
            dispatch(setPage(1));
            setEnteredPageNum(1);
        } else if(enteredPageNum>maxPage) {
            dispatch(setPage(maxPage));
            setEnteredPageNum(maxPage)
        } else {
            dispatch(setPage(Number(enteredPageNum)));
        }
    }
    let changePageInput = (e) => {
        if(e.target.value.match("^[0-9]*$"))
            setEnteredPageNum(e.target.value);
    }
    let increment = (e) => {
        if(enteredPageNum<maxPage) {
            dispatch(incrementPage());
            setEnteredPageNum(oldNum => oldNum + 1);
        }
    }
    let decrement = (e) => {
        if(enteredPageNum>1) {
            dispatch(decrementPage());
            setEnteredPageNum(oldNum => oldNum - 1);
        }
    }
    return (<>
        <div className="d-flex justify-content-center mt-3"><h2>Product Catalog</h2></div>
        <FilterForm/>
        {productsLoaded
            ?(<>
                <ProductList data-testid="product-list" products={productsToShow}/>
                <Container className="d-flex justify-content-center mb-2">
                    {pageNum>1?<Button variant="primary" className="m-2" onClick={decrement}>previous</Button>:null}
                    <div className=" d-flex align-items-center">
                        <span>page</span>
                        <FormControl className="page-input" type="text" value={enteredPageNum} onChange={changePageInput} onKeyPress={updatePage} onBlur={updatePage}/>
                        <span>of {maxPage}</span>
                    </div>
                    {pageNum<maxPage?<Button variant="primary" className="m-2" onClick={increment}>next</Button>:null}
                </Container>
            </>)
            :<Container>
            <Row className="mt-5 spinner-row">
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
            </Row>
            <Row className="spinner-row">
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
                <Col>
                    <Spinner animation="grow" variant="secondary"></Spinner>
                </Col>
            </Row>
        </Container>
        }
    </>);
}