import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filter, resetFilterAndSort, sort, reload } from '../redux/catalogSlice';
import Accordion from 'react-bootstrap/Accordion';
import CloseButton from 'react-bootstrap/CloseButton';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { current } from '@reduxjs/toolkit';


export const FilterForm = () => {

    const dispatch = useDispatch();
    let categories = useSelector(state => state.catalog.categories);
    const currentFilter = useSelector(state => state.catalog.filter);
    const currentSort = useSelector(state => state.catalog.sort);
    const pricePattern = "^(?:[0-9]+.?[0-9]{0,2}|[0-9]*.?[0-9]{1,2})$";
    let [oldFilter, setOldFilter] = useState(currentFilter);
    let [oldSort, setOldSort] = useState(currentSort);
    const equalPrices = (p1, p2) => {
        if (isNaN(p1) && isNaN(p2))
            return true;
        else
            return p1===p2
    }
    const sortChanged = () => {
        return oldSort!==currentSort || !equalPrices(oldFilter.minPrice, currentFilter.minPrice)
            || !equalPrices(oldFilter.maxPrice, currentFilter.maxPrice) || oldFilter.nameIncludes!==currentFilter.nameIncludes
            || oldFilter.categories.filter(cat => !currentFilter.categories.includes(cat)).length>0
            || currentFilter.categories.filter(cat => !oldFilter.categories.includes(cat)).length>0;
    }
    useEffect( () => {
        const refresh = setInterval(() => {
            if(sortChanged())
            {
                setOldFilter({...currentFilter});
                setOldSort(currentSort);
                dispatch(reload());
                console.log("reloaded")
            }
        }, 750)
        return () => clearInterval(refresh);
    });

    return (<Container className=" mt-4">
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Container className="d-flex justify-content-between align-items-center">
                        <h6>search</h6>
                        <Button as="div" variant="warning" onClick={(e) => {
                            e.stopPropagation();
                            dispatch(resetFilterAndSort())
                        }}>clear all</Button>
                    </Container>
                </Accordion.Header>
                <Accordion.Body>
                    <Row className="border border-dark rounded p-3 justify-content-end align-items-start">
                        <Col xs={12} md={6} className="mb-2">
                            <Form.Select value="" onChange={e => {
                                if(e.target.value==="")
                                    return;
                                const newCategories = currentFilter.categories.map(c => c);
                                newCategories.push(e.target.value)
                                dispatch(filter({...currentFilter, usingCategories: newCategories.length>0, categories: newCategories }));
                            }}>
                                <option value="">categories...</option>
                                {categories.filter(cat => !currentFilter.categories.includes(cat)).sort().map( cat => (<>
                                    <option data-testid={cat} key={cat} value={cat}>
                                        {cat}
                                    </option>
                                </>))}
                            </Form.Select>
                            {currentFilter.categories.map( cat => (
                            <Badge key={cat} pill className="m-2">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="m-1">{cat}</span>
                                    <CloseButton onClick={
                                        () => {
                                            let newCategories = currentFilter.categories.filter( c => c!==cat);
                                            dispatch(filter({...currentFilter, usingCategories: newCategories.length>0, categories: newCategories}));
                                        }
                                    }/>
                                </div>
                            </Badge>
                            ))}
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <InputGroup>
                                <InputGroup.Text>name</InputGroup.Text>
                                <FormControl data-testid="name" type="text" value={currentFilter.nameIncludes||""} onChange={ e =>  {
                                    dispatch(filter({...currentFilter, usingName: e.target.value.length>0, nameIncludes: e.target.value===""?null:e.target.value} 
                                ))} }/>
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <InputGroup className="mb-1">
                                <InputGroup.Text>min price: $</InputGroup.Text>
                                <FormControl data-testid="min-price" type="text" pattern={pricePattern} value={currentFilter.minPrice||""}
                                    onChange={ e => dispatch(filter({...currentFilter, 
                                                usingMinPrice: (e.target.value.length>0 && e.target.value.match("^[0-9]*$"))?true:false, 
                                                minPrice: e.target.value===""?null:Number(e.target.value)}))}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>max price: $</InputGroup.Text>
                                <FormControl data-testid="max-price" type="text" pattern={pricePattern} value={currentFilter.maxPrice||""}
                                                onChange={ e => dispatch(filter({...currentFilter,
                                                usingMaxPrice: (e.target.value.length>0 && e.target.value.match("^[0-9]*$"))?true:false, 
                                                maxPrice: e.target.value===""?null:Number(e.target.value)}))}/>
                            </InputGroup>
                        </Col>
                        <Col xs={6} md={3} className="mb-2"></Col>
                        <Col xs={12} md={3} className="mb-2"><Form.Label>Order By</Form.Label>
                                <Form.Select data-testid="sort" value={currentSort} onChange={e => dispatch(sort(e.target.value))}>
                                    <option value="AZ">name A-Z</option>
                                    <option value="ZA">name Z-A</option>
                                    <option value="PRICE_ASC">Price: low to high</option>
                                    <option value='PRICE_DESC'>Price: high to low</option>
                                </Form.Select>
                        </Col>
                    </Row>
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>

    </Container>)
}