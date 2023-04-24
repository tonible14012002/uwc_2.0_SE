import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './loginForm.css';
import axios from 'axios';
//a
export default function Login() {
    const navigate = useNavigate();
    const projectID = '2ddf57c8-852d-4a09-a337-14fb01d1458a';

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState();

    const handleChange = (event) => {
        setInputs((values) => ({...values, [event.target.name]: event.target.value}));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        const authObject = { 'Project-ID': projectID, 'User-Name': inputs.login_username, 'User-Secret': inputs.login_password };

        try {
        await axios.get('https://api.chatengine.io/chats', { headers: authObject });

        localStorage.setItem('username', inputs.login_username);
        localStorage.setItem('password', inputs.login_password);
        console.log('info: ', inputs.login_username,' ', inputs.login_password);
        navigate('/');
        setError('');
        } catch (err) {
        setError('Please Recheck user name and password!!');
        }
    }

    return (
        <Container fluid className="bg-login">
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={4} xs={12}>
                    <Card className="shadow rounded-card" style={{ backgroundColor: "rgb(236,242,246)"}}>
                        <Card.Body className="mx-3">
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-5 text-uppercase text-center">Log in</h2>
                                <div className="mb-3 mt-5">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="UserID">
                                            <Form.Control
                                                name="login_username"
                                                className="form-login"
                                                type="text"
                                                placeholder="User Name / User Identification"
                                                value={inputs.login_username || ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-4"
                                            controlId="Password"
                                        >
                                            <Form.Control
                                                className="form-login"
                                                type="password"
                                                placeholder="Password"
                                                name="login_password"
                                                value={inputs.login_password || ""}
                                                onChange={handleChange}
                                                />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >
                                        <p className="text-danger fs-6 fst-italic">{error}</p>
                                        <p className="small">
                                            <a className="text-primary d-flex flex-row" href="#!">
                                                Forgot password?
                                            </a>
                                        </p>
                                        </Form.Group>
                                        <div className="d-grid mb-5">
                                            <Button className="form-login" variant="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3 mb-5">
                                        <p className="mb-0  text-center">
                                            Don't have an account?{" "}
                                            <a href="{''}" className="text-primary fw-bold">
                                                Sign Up
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}