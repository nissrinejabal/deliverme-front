import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MainFormContext } from "../context/MainFormContext";

import ItemInputs from "./ItemInputs";
import InputsLabels from "./InputsLabels";

function ItemsForm(props) {
  const [mainFormState, setMainFormState] = useContext(MainFormContext);
  const isEmptyCheck = mainFormState.items[0].item !== "" && mainFormState.items[0].quantity !== "";

  let item = {
    item: "",
    quantity: '',
    prixMax: '',
  };

  const addItem = () => {
    setMainFormState({
      items: [...mainFormState.items, item],
    });
  };

  return (
    <Container id="itemsForm" className="content">
      <InputsLabels />
      {mainFormState.items.map((item, index) => (
        <ItemInputs key={index} index={index} />
      ))}
      <Button variant="secondary" size="lg" block onClick={addItem}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button
        className="rounded-pill w-75 mx-auto text-white font-weight-bold mt-4"
        variant="warning"
        size="lg"
        block
        onClick={() => props.nextStep()}
        disabled={!isEmptyCheck}
      >
        Saissir votre Adresse
      </Button>
    </Container>
  );
}

export default ItemsForm;
