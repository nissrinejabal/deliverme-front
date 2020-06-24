import React, { useContext } from 'react';
import {Card} from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from "react-router-dom";


export default function LoginPage(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if(isAuthenticated) return <Redirect to="/" />
    return (
        <Card className="w-50 mx-auto loginCard shadow-lg">
            <Card.Header className="border-0 bg-white">
                <h1 className="text-center">Créer un compte</h1>
            </Card.Header>
            <Card.Body>
                <SignUpForm history={props.history}/>
            </Card.Body>
        </Card>
    )
}