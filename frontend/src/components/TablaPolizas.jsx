import { useState, useEffect } from "react";

const API = "http://localhost:3001";

function TablaPolizas({ onEditar }) {
  const [polizas, setPolizas] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [idEliminar, setIdEliminar] = useState("");
  const [mensajeEliminar, setMensajeEliminar] = useState("");

  useEffect(() => {
    cargarPolizas();
  }, []);

  async function cargarPolizas() {
    try {
      setCargando(true);
      const respuesta = await fetch(`${API}/polizas`);
      if (!respuesta.ok) throw new Error("Error al cargar las polizas");
      const datos = await respuesta.json();
      setPolizas(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function eliminarPoliza(id) {
    if (!confirm(`Seguro que quieres eliminar la poliza ${id}?`)) return;
    try {
      const respuesta = await fetch(`${API}/polizas/${id}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) throw new Error("Error al eliminar la poliza");
      setMensajeEliminar(`Poliza ${id} eliminada correctamente`);
      cargarPolizas();
    } catch (err) {
      setMensajeEliminar(err.message);
    }
  }

  async function eliminarPorFormulario(e) {
    e.preventDefault();
    if (!idEliminar.trim()) return;
    await eliminarPoliza(idEliminar.trim());
    setIdEliminar("");
  }

  if (cargando) return <p>Cargando polizas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>

      <div className="form-eliminar">
        <form onSubmit={eliminarPorFormulario}>
          <label htmlFor="idEliminar">Eliminar poliza por ID:</label>
          <input
            id="idEliminar"
            type="text"
            value={idEliminar}
            onChange={(e) => setIdEliminar(e.target.value)}
            placeholder="ID00001"
          />
          <button type="submit">Eliminar</button>
        </form>
        {mensajeEliminar && <p className="mensaje">{mensajeEliminar}</p>}
      </div>

      <h2>LISTADO DE POLIZAS</h2>

      <table>
        <thead>
          <tr>
            <th>ID Poliza</th>
            <th>Vigencia (meses)</th>
            <th>Matricula</th>
            <th>Edad coche</th>
            <th>Edad tomador</th>
            <th>Cilindrada (cc)</th>
            <th>Cilindros</th>
            <th>Transmision</th>
            <th>Combustible</th>
            <th>Peso (kg)</th>
            <th>Siniestro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {polizas.map((p) => (
            <tr key={p.id_poliza}>
              <td>{p.id_poliza}</td>
              <td>{p.vigencia}</td>
              <td>{p.matricula}</td>
              <td>{p.edad_coche}</td>
              <td>{p.edad_tomador}</td>
              <td>{p.cilindrada}</td>
              <td>{p.cilindros}</td>
              <td>{p.transmision}</td>
              <td>{p.comb_electrico}</td>
              <td>{p.peso}</td>
              <td>{p.siniestro === 1 ? "Si" : "No"}</td>
              <td>
                <div className="acciones">
                  <button onClick={() => onEditar(p)}>Editar</button>
                  <button onClick={() => eliminarPoliza(p.id_poliza)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPolizas;