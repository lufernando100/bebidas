import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Crear el context

export const ModalContext = createContext();

const ModalProvider = (props) => {
  //State del provider
  const [idreceta, guardarIdReceta] = useState(null);
  const [info, guardarReceta] = useState({});

  // Una vez tenemos la receta, llamar la API

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const respuesta = await axios(url);
      guardarReceta(respuesta.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{
        info,
        guardarIdReceta,
        guardarReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
