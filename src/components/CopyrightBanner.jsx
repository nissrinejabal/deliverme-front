import React from 'react';
import { Container } from 'react-bootstrap';


export default function CopyrightBanner() {
    return (
        <Container className="text-center p-2" id="copyright-banner" fluid>
            &copy; 2020 deliverme.com, All right reserved, Created by <a href="http://miftahdev.com">Miftah</a>.
        </Container>
    )
}
