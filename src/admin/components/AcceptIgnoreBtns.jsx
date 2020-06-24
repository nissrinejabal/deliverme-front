import React from "react";
import { Container, Button } from "react-bootstrap";
import AdminService from '../../services/AdminService';

const putState = (state, _id, idx, updateState) => {
    AdminService.updateOrderState({_id, state}).then((res) => {
        if (res.updated) updateState(idx, state);
    })

}; 

export default function AcceptIgnoreBtns(props) {
  return (
    <Container className="d-flex justify-content-center">
      <Button variant="success" className="mx-3" onClick={() => putState('Acceptée', props._id, props.idx,props.updateState)}>
        Accepter
      </Button>
      <Button variant="danger" className="mx-3" onClick={() => putState('Ignorée', props._id, props.idx,props.updateState)}>
        Ignorer
      </Button>
    </Container>
  );
}
