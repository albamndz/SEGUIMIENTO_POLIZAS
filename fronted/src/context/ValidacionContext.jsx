import { createContext, useContext } from "react";

const ValidacionContext = createContext();

export function ValidacionProvider({ children }) {
  const validaciones = {
    // ID de poliza: IDXXXXX donde XXXXX son 5 digitos
    regexIdPoliza: /^ID\d{5}$/,

    // Matricula espanola: 4 digitos + 3 letras permitidas
    regexMatricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,

    vigenciaMin: 1,
    vigenciaMax: 21,
    edadCocheMin: 0,
    edadCocheMax: 10,
    edadTomadorMin: 18,
    edadTomadorMax: 90,
  };

  return (
    <ValidacionContext.Provider value={validaciones}>
      {children}
    </ValidacionContext.Provider>
  );
}

export function useValidacion() {
  return useContext(ValidacionContext);
}