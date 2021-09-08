import { UsaStates } from 'usa-states';
import { Form, FloatingLabel, Row, Col, Container } from 'react-bootstrap';

export const AddressInput = ({title, addrFailed, streetAddr, setStreetAddr, city, setCity, state, setState,
        zipCode, setZipCode, firstName, setFirstName, lastName, setLastName, nameFailed}) => {
    const states = new UsaStates().states;
    return (
        <>
            <Form.Group className="mb-4 p-2 border">
                <Form.Label>{title}</Form.Label>
                <Form.Group className="mb-2">
                    <Form.Label>name</Form.Label>
                                <Row>
                                    <Col className="mb-1" sm={12} md={6}>
                                        <FloatingLabel controlId="firstName" label="first">
                                            <input type="text" className="form-control" placeholder=" " required value={firstName}
                                                controlId="firstName" onChange={e => setFirstName(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="lastName" label="last">
                                            <input type="text" className="form-control" placeholder="last" required value={lastName}
                                                controlId="lastName" onChange={e => setLastName(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                {nameFailed?<p style={{color: "red"}}>please enter first and last name</p>:null}
                            </Form.Group>
                <FloatingLabel controlId="address" label="address" className="mb-3">
                    <input type="text" className="form-control" placeholder=" "required value={streetAddr}
                        controlId="address" onChange={e => setStreetAddr(e.target.value)}
                    />
                </FloatingLabel>
                <Row className="align-items-center">
                    <Col xs={12} sm={6} md={5} className="mb-1">
                        <FloatingLabel controlId="city" label="city">
                            <input type="text" className="form-control" placeholder=" " required value={city}
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
                            <input type="text" className="form-control" placeholder=" " required value={zipCode}
                                pattern="^[0-9]{5}$" controlId="zip" onChange={e => setZipCode(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                {addrFailed?<p style={{color: "red"}}>please enter a valid address</p>:null}
            </Form.Group>
        </>
    );
}