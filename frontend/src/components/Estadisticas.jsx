import { useState } from "react";

const API = "http://localhost:3001";

function Estadisticas() {
  const [filtros, setFiltros] = useState({
    transmision: "",
    comb_electrico: "",
    siniestro: "",
  });
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  }

  async function cargarEstadisticas(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const params = new URLSearchParams();
    if (filtros.transmision) params.append("transmision", filtros.transmision);
    if (filtros.comb_electrico) params.append("comb_electrico", filtros.comb_electrico);
    if (filtros.siniestro !== "") params.append("siniestro", filtros.siniestro);

    try {
      const respuesta = await fetch(`${API}/estadisticas?${params.toString()}`);
      if (!respuesta.ok) throw new Error("Error al obtener estadisticas");
      const resultado = await respuesta.json();
      setDatos(resultado);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <h2>Estadisticas</h2>

      <form onSubmit={cargarEstadisticas}>
        <div>
          <label>Transmision</label>
          <select name="transmision" value={filtros.transmision} onChange={handleChange}>
            <option value="">Todas</option>
            <option value="Manual">Manual</option>
            <option value="Automatica">Automatica</option>
          </select>
        </div>

        <div>
          <label>Tipo de motor</label>
          <select name="comb_electrico" value={filtros.comb_electrico} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Combustion">Combustion</option>
            <option value="Electrico">Electrico</option>
          </select>
        </div>

        <div>
          <label>Siniestro</label>
          <select name="siniestro" value={filtros.siniestro} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="0">Sin siniestro</option>
            <option value="1">Con siniestro</option>
          </select>
        </div>

        <button type="submit">Calcular estadisticas</button>
      </form>

      {cargando && <p>Calculando...</p>}
      {error && <p className="error">{error}</p>}

      {datos && (
        <div className="resultados">
          <h3>Resultados</h3>
          <p>Total de polizas: <strong>{datos.total}</strong></p>
          <p>Con siniestro: <strong>{datos.con_siniestro}</strong> ({datos.porcentaje_con_siniestro}%)</p>
          <p>Sin siniestro: <strong>{datos.sin_siniestro}</strong> ({datos.porcentaje_sin_siniestro}%)</p>
          <p>Media edad del coche: <strong>{datos.media_edad_coche} años</strong></p>
          <p>Media edad del tomador: <strong>{datos.media_edad_tomador} años</strong></p>
        </div>
      )}
    </div>
  );
}

export default Estadisticas;
