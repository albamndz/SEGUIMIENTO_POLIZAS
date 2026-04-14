import { useState } from "react";
import { useValidarPoliza } from "../hooks/useValidarPoliza";

const API = "http://localhost:3001";

function FormularioEdicion({ poliza, onGuardado, onCancelar }) {
  const [campos, setCampos] = useState({
    id_poliza: poliza?.id_poliza || "",
    vigencia: poliza?.vigencia ?? "",
    matricula: poliza?.matricula || "",
    edad_coche: poliza?.edad_coche ?? "",
    edad_tomador: poliza?.edad_tomador ?? "",
    cilindrada: poliza?.cilindrada ?? "",
    cilindros: poliza?.cilindros ?? "",
    transmision: poliza?.transmision || "",
    comb_electrico: poliza?.comb_electrico || "",
    peso: poliza?.peso ?? "",
    siniestro: poliza?.siniestro ?? "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeServidor, setMensajeServidor] = useState("");
  const { validar } = useValidarPoliza();

  if (!poliza) {
    return <p>No hay ninguna poliza seleccionada para editar.</p>;
  }

  function handleChange(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensajeServidor("");

    // En edicion no se validan id_poliza ni matricula
    const erroresEncontrados = validar(campos, false);
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }
    setErrores({});

    const polizaActualizada = {
      ...campos,
      vigencia: Number(campos.vigencia),
      edad_coche: Number(campos.edad_coche),
      edad_tomador: Number(campos.edad_tomador),
      cilindrada: Number(campos.cilindrada),
      cilindros: Number(campos.cilindros),
      peso: Number(campos.peso),
      siniestro: Number(campos.siniestro),
    };

    try {
      const respuesta = await fetch(`${API}/polizas`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(polizaActualizada),
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        setMensajeServidor(datos.error || "Error al actualizar la poliza");
        return;
      }

      onGuardado();
    } catch (err) {
      setMensajeServidor("No se pudo conectar con el servidor");
    }
  }

  return (
    <div>
      <h2>Editar poliza {poliza.id_poliza}</h2>
      {mensajeServidor && <p className="error">{mensajeServidor}</p>}
      <form onSubmit={handleSubmit} noValidate>

        <div>
          <label>ID Poliza</label>
          <input name="id_poliza" value={campos.id_poliza} disabled />
          <small>El identificador no se puede modificar</small>
        </div>

        <div>
          <label>Matricula</label>
          <input name="matricula" value={campos.matricula} disabled />
          <small>La matricula no se puede modificar</small>
        </div>

        <div>
          <label>Vigencia (meses)</label>
          <input name="vigencia" type="number" value={campos.vigencia} onChange={handleChange} />
          {errores.vigencia && <span className="error">{errores.vigencia}</span>}
        </div>

        <div>
          <label>Edad del coche</label>
          <input name="edad_coche" type="number" value={campos.edad_coche} onChange={handleChange} />
          {errores.edad_coche && <span className="error">{errores.edad_coche}</span>}
        </div>

        <div>
          <label>Edad del tomador</label>
          <input name="edad_tomador" type="number" value={campos.edad_tomador} onChange={handleChange} />
          {errores.edad_tomador && <span className="error">{errores.edad_tomador}</span>}
        </div>

        <div>
          <label>Cilindrada (cc)</label>
          <input name="cilindrada" type="number" value={campos.cilindrada} onChange={handleChange} />
          {errores.cilindrada && <span className="error">{errores.cilindrada}</span>}
        </div>

        <div>
          <label>Cilindros</label>
          <input name="cilindros" type="number" value={campos.cilindros} onChange={handleChange} />
          {errores.cilindros && <span className="error">{errores.cilindros}</span>}
        </div>

        <div>
          <label>Transmision</label>
          <select name="transmision" value={campos.transmision} onChange={handleChange}>
            <option value="">-- Selecciona --</option>
            <option value="Manual">Manual</option>
            <option value="Automatica">Automatica</option>
          </select>
          {errores.transmision && <span className="error">{errores.transmision}</span>}
        </div>

        <div>
          <label>Tipo de motor</label>
          <select name="comb_electrico" value={campos.comb_electrico} onChange={handleChange}>
            <option value="">-- Selecciona --</option>
            <option value="Combustion">Combustion</option>
            <option value="Electrico">Electrico</option>
          </select>
          {errores.comb_electrico && <span className="error">{errores.comb_electrico}</span>}
        </div>

        <div>
          <label>Peso (kg)</label>
          <input name="peso" type="number" value={campos.peso} onChange={handleChange} />
          {errores.peso && <span className="error">{errores.peso}</span>}
        </div>

        <div>
          <label>Siniestro</label>
          <select name="siniestro" value={campos.siniestro} onChange={handleChange}>
            <option value="">-- Selecciona --</option>
            <option value="0">No</option>
            <option value="1">Si</option>
          </select>
          {errores.siniestro && <span className="error">{errores.siniestro}</span>}
        </div>

        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
}

export default FormularioEdicion;