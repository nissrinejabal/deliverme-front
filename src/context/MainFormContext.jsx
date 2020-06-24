import React, { createContext, useState } from "react";

export const MainFormContext = createContext();

export const MainFormProvider = (props) => {
  const [state, setState] = useState({
    items: [{
        item: '',
        quantity: '',
        prixMax: ''
    }],
    name: "",
    adresse: "",
    phone: "",
    note: "",
    prixMax: "0",
  });

  return (
    <MainFormContext.Provider value={[state, setState]}>
      {props.children}
    </MainFormContext.Provider>
  );
};
