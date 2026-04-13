import { useValidacion } from "../context/ValidacionContext";

export function useValidarPoliza() {
  const {
    regexIdPoliza,
    regexMatricula,
    vigenciaMin,
    vigenciaMax,
    edadCocheMin,
    edadCocheMax,
    edadTomadorMin,
    edadTomadorMax,
  } = useValidacion();

  function validar(campos, incluirIdYMatricula = true) {
    const errores = {};

    if (incluirIdYMatricula) {
      if (!campos.id_poliza) {
        errores.id_poliza = "El identificador de poliza es obligatorio";
      } else if (!regexIdPoliza.test(campos.id_poliza)) {
        errores.id_poliza = "Formato incorrecto. Debe ser IDXXXXX (ej. ID00001)";
      }

      if (!campos.matricula) {
        errores.matricula = "La matricula es obligatoria";
      } else if (!regexMatricula.test(campos.matricula)) {
        errores.matricula = "Formato incorrecto. Debe ser 4 numeros y 3 letras validas (ej. 1234BCD)";
      }
    }

    const vigencia = Number(campos.vigencia);
    if (campos.vigencia === "" || isNaN(vigencia)) {
      errores.vigencia = "La vigencia es obligatoria";
    } else if (vigencia < vigenciaMin || vigencia > vigenciaMax) {
      errores.vigencia = `La vigencia debe estar entre ${vigenciaMin} y ${vigenciaMax} meses`;
    }

    const edadCoche = Number(campos.edad_coche);
    if (campos.edad_coche === "" || isNaN(edadCoche)) {
      errores.edad_coche = "La edad del coche es obligatoria";
    } else if (edadCoche < edadCocheMin || edadCoche > edadCocheMax) {
      errores.edad_coche = `La edad del coche debe estar entre ${edadCocheMin} y ${edadCocheMax}`;
    }

    const edadTomador = Number(campos.edad_tomador);
    if (campos.edad_tomador === "" || isNaN(edadTomador)) {
      errores.edad_tomador = "La edad del tomador es obligatoria";
    } else if (edadTomador < edadTomadorMin || edadTomador > edadTomadorMax) {
      errores.edad_tomador = `El tomador debe tener entre ${edadTomadorMin} y ${edadTomadorMax} anos`;
    }

    if (!campos.cilindrada) {
      errores.cilindrada = "La cilindrada es obligatoria";
    }

    if (!campos.cilindros) {
      errores.cilindros = "El numero de cilindros es obligatorio";
    }

    if (!campos.transmision) {
      errores.transmision = "La transmision es obligatoria";
    } else if (campos.transmision !== "Manual" && campos.transmision !== "Automatica") {
      errores.transmision = "Valor de transmision no valido";
    }

    if (!campos.comb_electrico) {
      errores.comb_electrico = "El tipo de combustible es obligatorio";
    } else if (campos.comb_electrico !== "Combustion" && campos.comb_electrico !== "Electrico") {
      errores.comb_electrico = "Valor de combustible no valido";
    }

    if (!campos.peso) {
      errores.peso = "El peso es obligatorio";
    }

    if (campos.siniestro === "" || campos.siniestro === undefined) {
      errores.siniestro = "El campo siniestro es obligatorio";
    }

    return errores;
  }

  return { validar };
}