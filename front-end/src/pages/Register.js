import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getUserInfo, register } from '../redux/authSlice';
import {Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { UsaStates } from 'usa-states';

const Register = () => {
    const states = new UsaStates().states;
    const [username, setUsername] = useState('');
    const [unameFailed, setUnameFailed] = useState(false);
    const [password, setPassword] = useState('');
    const [pwdFailed, setPwdFailed] = useState(false);
    const [streetAddr, setStreetAddr] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [addrFailed, setAddrFailed] = useState(false);
    const [email, setEmail] = useState('');
    const [emailFailed, setEmailFailed] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneFailed, setPhoneFailed] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nameFailed, setNameFailed] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const failed = useSelector(state => state.auth.registerFailed);
    const waiting = useSelector(state => state.auth.waiting);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const usernameTaken = useSelector(state => state.auth.usernameTaken);
    const dispatch = useDispatch();
    const validate = () => {
        let succeeded = true;
        if(username.length<1) {
            setUnameFailed(true);
            succeeded = false;
        } else {
            setUnameFailed(false);
        }
        if(password.length<1) {
            setPwdFailed(true);
            succeeded = false;
        } else {
            setPwdFailed(false);
        }
        if(!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            setEmailFailed(true);
            succeeded = false;
        } else {
            setEmailFailed(false);
        }
        if(!phoneNumber.match(/^(?:[0-9]{3}-){2}[0-9]{4}|[0-9]{10}$/)) {
            setPhoneFailed(true);
            succeeded = false;
        } else {
            setPhoneFailed(false);
        }
        if(firstName.length<1 || lastName.length<1) {
            setNameFailed(true);
            succeeded = false;
        } else {
            setNameFailed(false);
        }
        if(streetAddr.length<1 || city.length<1 || state.length<1 || !zipCode.match(/[0-9]{5}/)) {
            setAddrFailed(true);
            succeeded = false;
        } else {
            setAddrFailed(false);
        }

        return succeeded;
    }
    const submit = (e) => {
        e.preventDefault();
        if(!validate())
            return;
        let userInfo = {
            username,
            password,
            email,
            firstName,
            lastName,
            phoneNumber,
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
            dispatch(register(userInfo)).then(() => dispatch(getUserInfo()));
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
                        ?<p style={{color: "red"}}>registration failed</p>
                        :null}
                        <Form.Group className="mb-4">
                            <Form.Label>username</Form.Label>
                            <input type="text" className="form-control" placeholder="username" required
                                onChange={e => setUsername(e.target.value)}
                            />
                            {usernameTaken?<p style={{color: "red"}}>username unavailable, please choose a different username</p>:null}
                            {unameFailed?<p style={{color: "red"}}>please enter a username</p>:null}
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>email</Form.Label>
                            <input type="email" className="form-control" placeholder="name@example.com" required
                                onChange={e => setEmail(e.target.value)}
                            />
                            {emailFailed?<p style={{color: "red"}}>please enter a valid email</p>:null}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>phone number</Form.Label>
                            <input type="tel" pattern="^(?:[0-9]{3}-){2}[0-9]{4}|[0-9]{10}$" className="form-control" 
                                placeholder="xxx-xxx-xxxx" required onChange={e => setPhoneNumber(e.target.value)}
                            />
                            {phoneFailed?<p style={{color: "red"}}>please enter a 10-digit phone number, with no spaces</p>:null}
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
                            {nameFailed?<p style={{color: "red"}}>please enter first and last name</p>:null}
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
                                        <option value='' ></option>
                                        {states.map(state => <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>)}
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
                            {addrFailed?<p style={{color: "red"}}>please enter a valid address</p>:null}
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
                            {pwdFailed?<p style={{color: "red"}}>please enter a password</p>:null}
                        </Form.Group>

                        <button className="w-100 btn btn-lg btn-primary mb-5" type="submit" onClick={submit}>
                            {waiting?<Spinner animation="border"/>:null}
                            Register
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    </>);
};

export default Register;
