import React, { useContext, useState } from "react";
import { MainFormContext } from "../context/MainFormContext";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faLock } from "@fortawesome/free-solid-svg-icons";

export default function ItemInputs(props) {
  const [mainFormState, setMainFormState] = useContext(MainFormContext);
  const [active, setActive] = useState(false);
  const { item, quantity, prixMax } = mainFormState.items[props.index];

  const showInput = () => {
    setActive(true);
  };

  const handleProductChange = (e, index, input) => {
    switch (input) {
      case "item":
        mainFormState.items[index].item = e.target.value;
        break;
      case "quantity":
        mainFormState.items[index].quantity = e.target.value;
        break;
      case "unite":
        mainFormState.items[index].unite = e.target.value;
        break;
      case "prix":
        mainFormState.items[index].prixMax = e.target.value;
        break;
      default:
        break;
    }

    setMainFormState({
      items: mainFormState.items,
    });
  };

  const removeProduct = (index) => {
    mainFormState.items.splice(index, 1);

    setMainFormState({
      items: mainFormState.items,
    });
  };

  return (
    <div className="row">
      <div className="form-group col-6 p-1">
        <input
          type="text"
          placeholder={"Pain Complet"}
          className="form-control"
          value={item}
          onChange={(e) => {
            handleProductChange(e, props.index, "item");
          }}
        />
      </div>
      <div className="form-group col-2 p-1">
        <input
          value={quantity}
          placeholder="250 g"
          type="text"
          className="form-control"
          onChange={(e) => {
            handleProductChange(e, props.index, "quantity");
          }}
        />
      </div>

      <div className="form-group col-2 p-1">
        {active ? (
          <input
            value={prixMax}
            placeholder={"250DH"}
            type="text"
            className="form-control"
            onChange={(e) => {
              handleProductChange(e, props.index, "prix");
            }}
          />
        ) : (
          <Button
            className="font-weight-bold"
            variant="outline-primary"
            block
            onClick={showInput}
          >
            <FontAwesomeIcon icon={faLock} />
          </Button>
        )}
      </div>
      <div className="form-group col-2 p-1">
        <Button
          className="font-weight-bold"
          variant="outline-danger"
          block
          onClick={() => removeProduct(props.index)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </div>
  );
}
