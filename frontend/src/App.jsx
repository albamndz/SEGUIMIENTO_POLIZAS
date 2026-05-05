import { useState } from "react";
import TablaPolizas from "./components/TablaPolizas";
import FormularioAlta from "./components/FormularioAlta";
import FormularioEdicion from "./components/FormularioEdicion";
import Estadisticas from "./components/Estadisticas";

function App() {
  const [seccion, setSeccion] = useState("tabla");
  const [polizaAEditar, setPolizaAEditar] = useState(null);

  function handleEditarPoliza(poliza) {
    setPolizaAEditar(poliza);
    setSeccion("edicion");
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icono">P</span>
          <span className="logo-texto">PolizasApp</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-seccion">Menu</p>
          <button
            className={seccion === "tabla" ? "nav-item activo" : "nav-item"}
            onClick={() => setSeccion("tabla")}
          >
            Polizas
          </button>
          <button
            className={seccion === "alta" ? "nav-item activo" : "nav-item"}
            onClick={() => setSeccion("alta")}
          >
            Nueva poliza
          </button>
          <button
            className={seccion === "estadisticas" ? "nav-item activo" : "nav-item"}
            onClick={() => setSeccion("estadisticas")}
          >
            Estadisticas
          </button>
        </nav>

        <div className="sidebar-footer">
          <p>2º DAW</p>
          <p>Diseno Web Cliente</p>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido">
        <div className="topbar">
          <h1 className="topbar-titulo">
            {seccion === "tabla" && "Gestion de Polizas"}
            {seccion === "alta" && "Nueva Poliza"}
            {seccion === "edicion" && "Editar Poliza"}
            {seccion === "estadisticas" && "Estadisticas"}
          </h1>
        </div>

        <div className="pagina">
          {seccion === "tabla" && (
            <TablaPolizas onEditar={handleEditarPoliza} />
          )}
          {seccion === "alta" && (
            <FormularioAlta onGuardado={() => setSeccion("tabla")} />
          )}
          {seccion === "edicion" && (
            <FormularioEdicion
              poliza={polizaAEditar}
              onGuardado={() => setSeccion("tabla")}
              onCancelar={() => setSeccion("tabla")}
            />
          )}
          {seccion === "estadisticas" && <Estadisticas />}
        </div>
      </main>

    </div>
  );
}

export default App;