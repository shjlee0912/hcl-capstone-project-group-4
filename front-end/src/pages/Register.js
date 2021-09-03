import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { register } from '../redux/authSlice';
import {Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { UsaStates } from 'usa-states';

const Register = () => {
    const states = new UsaStates().states;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [streetAddr, setStreetAddr] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const failed = useSelector(state => state.auth.loginFailed);
    const waiting = useSelector(state => state.auth.waiting);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();
    const submit = (e) => {
        e.preventDefault();
        let userInfo = {
            username,
            password,
            email,
            firstName,
            lastName,
            phone,
            addresses: [{
                firstName,
                lastName,
                streetAddr,
                city,
                state,
                zipCode
            }]
        }
        if(password===passwordConfirm) {
            dispatch(register(userInfo));
        }
    }

    if (loggedIn) {
        return <Redirect to="/"/>;
    }

    return (<>
        <Container>
            <Row className="justify-content-center">
                <Col lg="8" md="7">
                    <form onSubmit={submit}>
                        <h1 className="h3 mb-1 mt-5 fw-normal">New Account Registration</h1>
                        <br />
                        {failed
                        ?<p style={{color: "red"}}>an error occurred signing up</p>
                        :null}
                        <Form.Group className="mb-4">
                            <Form.Label>username</Form.Label>
                            <input type="text" className="form-control" placeholder="username" required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>email</Form.Label>
                            <input type="email" className="form-control" placeholder="name@example.com" required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>phone number</Form.Label>
                            <input type="tel" pattern="^(?:[0-9]{3}-){2}[0-9]{4}|[0-9]{10}$" className="form-control" 
                                placeholder="xxx-xxx-xxxx" required onChange={e => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>name</Form.Label>
                            <Row>
                                <Col>
                                    <FloatingLabel controlId="firstName" label="first">
                                        <input type="text" className="form-control" placeholder=" "required
                                            controlId="firstName" onChange={e => setFirstName(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId="lastName" label="last">
                                        <input type="text" className="form-control" placeholder="last" required
                                            controlId="lastName" onChange={e => setLastName(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-4 p-2 border">
                            <Form.Label>Address</Form.Label>
                            <FloatingLabel controlId="address" label="address" className="mb-3">
                                <input type="text" className="form-control" placeholder=" "required
                                    controlId="address" onChange={e => setStreetAddr(e.target.value)}
                                />
                            </FloatingLabel>
                            <Row className="align-items-center">
                                <Col xs={12} sm={6} md={5} className="mb-1">
                                    <FloatingLabel controlId="city" label="city">
                                        <input type="text" className="form-control" placeholder=" "required
                                            controlId="city" onChange={e => setCity(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={4} sm={3} md={3}>
                                    <Form.Label className="mb-0">state</Form.Label>
                                    <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
                                        {states.map(state => <option key="state.abbreviation" value={state.abbreviation}>{state.abbreviation}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} sm={3} md={4}>
                                    <FloatingLabel controlId="zip" label="zip">
                                        <input type="text" className="form-control" placeholder=" " required
                                            pattern="^[0-9]{5}$" controlId="zip" onChange={e => setZipCode(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>password</Form.Label>
                            <input type="password" className="form-control mb-1" placeholder="Password" required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <input type="password" className="form-control" placeholder="Confirm Password" required
                                onChange={e => setPasswordConfirm(e.target.value)}
                            />
                            {password===passwordConfirm?null:<p style={{color: "red"}}>passwords must match</p>}
                        </Form.Group>

                        <button className="w-100 btn btn-lg btn-primary mb-5" type="submit">
                            {waiting?<Spinner animation="border"/>:null}
                            Sign in
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    </>);
};

export default Register;
