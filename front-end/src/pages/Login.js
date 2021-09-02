import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import Form from 'react-bootstrap/Form'
import {Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const failed = useSelector(state => state.auth.loginFailed);
    const waiting = useSelector(state => state.auth.waiting);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();
    const submit = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    }

    if (loggedIn) {
        return <Redirect to="/"/>;
    }

    return (<>
        <Container>
            <Row className="justify-content-center">
                <Col lg="7" md="5">
                    <form onSubmit={submit}>
                        <h1 className="h3 mb-1 mt-5 fw-normal">Please sign in</h1>
                        <br />
                        {failed
                        ?<p style={{color: "red"}}>an error occurred signing in</p>
                        :null}
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <input type="text" className="form-control" placeholder="username" required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <input type="password" className="form-control" placeholder="Password" required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            {waiting?<Spinner animation="border"/>:null}
                            Sign in
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    </>);
};

export default Login;
