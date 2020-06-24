import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import {Card} from 'react-bootstrap';
import LoginForm from './LoginForm';
import { AuthContext } from '../context/AuthContext';


export default function LoginPage(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if(isAuthenticated) return <Redirect to="/" />
    return (
        <Card className="w-50 mx-auto loginCard shadow-lg">
            <Card.Header className="border-0 bg-white">
                <h1 className="text-center">Se connecter</h1>
            </Card.Header>
            <Card.Body>
                <LoginForm history={props.history} />
            </Card.Body>
        </Card>
    )
}
