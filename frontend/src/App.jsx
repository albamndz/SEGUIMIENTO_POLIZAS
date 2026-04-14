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
    <div className="app">
      <header>
        <h1>GESTIÓN DE POLIZAS DE SEGURO</h1>
        <nav>
          <button onClick={() => setSeccion("tabla")}>Ver polizas</button>
          <button onClick={() => setSeccion("alta")}>Nueva poliza</button>
          <button onClick={() => setSeccion("estadisticas")}>Estadisticas</button>
        </nav>
      </header>

      <main>
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
      </main>
    </div>
  );
}

export default App;