const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data", "seguros.json");

app.use(cors());
app.use(express.json());

// Funcion auxiliar para leer el fichero JSON
function leerPolizas() {
  const contenido = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(contenido);
}

// Funcion auxiliar para escribir el fichero JSON
function guardarPolizas(polizas) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(polizas, null, 2), "utf-8");
}

// GET /polizas - Devuelve todas las polizas
app.get("/polizas", (req, res) => {
  try {
    const polizas = leerPolizas();
    res.json(polizas);
  } catch (error) {
    res.status(500).json({ error: "Error al leer las polizas" });
  }
});

// GET /polizas/:id_poliza - Devuelve una poliza por id
app.get("/polizas/:id_poliza", (req, res) => {
  try {
    const polizas = leerPolizas();
    const poliza = polizas.find((p) => p.id_poliza === req.params.id_poliza);
    if (!poliza) {
      return res.status(404).json({ error: "Poliza no encontrada" });
    }
    res.json(poliza);
  } catch (error) {
    res.status(500).json({ error: "Error al leer la poliza" });
  }
});

// POST /polizas - Da de alta una nueva poliza
app.post("/polizas", (req, res) => {
  try {
    const polizas = leerPolizas();
    const nueva = req.body;

    const existe = polizas.find((p) => p.id_poliza === nueva.id_poliza);
    if (existe) {
      return res.status(409).json({ error: "Ya existe una poliza con ese identificador" });
    }

    polizas.push(nueva);
    guardarPolizas(polizas);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la poliza" });
  }
});

// PUT /polizas - Modifica una poliza existente
app.put("/polizas", (req, res) => {
  try {
    const polizas = leerPolizas();
    const actualizada = req.body;

    const indice = polizas.findIndex((p) => p.id_poliza === actualizada.id_poliza);
    if (indice === -1) {
      return res.status(404).json({ error: "Poliza no encontrada" });
    }

    // No se permite cambiar id_poliza ni matricula
    actualizada.id_poliza = polizas[indice].id_poliza;
    actualizada.matricula = polizas[indice].matricula;

    polizas[indice] = actualizada;
    guardarPolizas(polizas);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la poliza" });
  }
});

// DELETE /polizas/:id_poliza - Elimina una poliza
app.delete("/polizas/:id_poliza", (req, res) => {
  try {
    const polizas = leerPolizas();
    const indice = polizas.findIndex((p) => p.id_poliza === req.params.id_poliza);
    if (indice === -1) {
      return res.status(404).json({ error: "Poliza no encontrada" });
    }

    polizas.splice(indice, 1);
    guardarPolizas(polizas);
    res.json({ mensaje: "Poliza eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la poliza" });
  }
});

// GET /estadisticas - Estadisticas con filtros opcionales
// Query params opcionales: transmision, comb_electrico, siniestro
app.get("/estadisticas", (req, res) => {
  try {
    let polizas = leerPolizas();
    const { transmision, comb_electrico, siniestro } = req.query;

    if (transmision) {
      polizas = polizas.filter((p) => p.transmision === transmision);
    }
    if (comb_electrico) {
      polizas = polizas.filter((p) => p.comb_electrico === comb_electrico);
    }
    if (siniestro !== undefined && siniestro !== "") {
      polizas = polizas.filter((p) => p.siniestro === Number(siniestro));
    }

    const total = polizas.length;

    if (total === 0) {
      return res.json({
        total: 0,
        con_siniestro: 0,
        sin_siniestro: 0,
        porcentaje_con_siniestro: 0,
        porcentaje_sin_siniestro: 0,
        media_edad_coche: 0,
        media_edad_tomador: 0,
      });
    }

    const con_siniestro = polizas.filter((p) => p.siniestro === 1).length;
    const sin_siniestro = total - con_siniestro;

    const media_edad_coche =
      polizas.reduce((acc, p) => acc + p.edad_coche, 0) / total;
    const media_edad_tomador =
      polizas.reduce((acc, p) => acc + p.edad_tomador, 0) / total;

    res.json({
      total,
      con_siniestro,
      sin_siniestro,
      porcentaje_con_siniestro: ((con_siniestro / total) * 100).toFixed(2),
      porcentaje_sin_siniestro: ((sin_siniestro / total) * 100).toFixed(2),
      media_edad_coche: media_edad_coche.toFixed(2),
      media_edad_tomador: media_edad_tomador.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al calcular estadisticas" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});