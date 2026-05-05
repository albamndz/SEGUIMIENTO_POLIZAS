# Gestion de Polizas de Seguro

Aplicacion web para el seguimiento de polizas de seguro de automovil desarrollada como actividad individual de la segunda evaluacion del modulo Diseno Web en Entorno Cliente (2º DAW).

## Descripcion

La aplicacion permite gestionar polizas de seguro de automovil almacenadas en un fichero JSON. Desde la interfaz se pueden consultar todas las polizas, dar de alta nuevas, editarlas y eliminarlas. Ademas incluye una seccion de estadisticas donde se pueden aplicar filtros y obtener datos agregados sobre el conjunto de polizas.

## Tecnologias utilizadas

- **Frontend**: React 18 con Vite como bundler
- **Backend**: Node.js con Express
- **Comunicacion**: peticiones asincronas fetch con API REST en formato JSON
- **Gestion de estado global**: React Context (para las expresiones regulares de validacion)

## Estructura del proyecto

```
SEGUIMIENTO_POLIZAS/
  backend/
    data/
      seguros.json            # Fichero de datos, solo accesible desde el backend
    index.js                  # Servidor Express con todos los endpoints REST
    package.json
  frontend/
    src/
      components/
        TablaPolizas.jsx      # Tabla con todas las polizas y acciones
        FormularioAlta.jsx    # Formulario para crear una nueva poliza
        FormularioEdicion.jsx # Formulario para editar una poliza existente
        Estadisticas.jsx      # Seccion de estadisticas con filtros
      context/
        ValidacionContext.jsx # Context con las expresiones regulares
      hooks/
        useValidarPoliza.js   # Hook reutilizable de validacion de formularios
      App.jsx                 # Componente raiz con la navegacion y el sidebar
      main.jsx                # Punto de entrada de React
      index.css               # Estilos globales
    index.html
    vite.config.js
    package.json
  package.json                # Arranque conjunto con concurrently
  .gitignore
  README.md
```

## Instalacion y arranque

Necesitas tener instalado Node.js en tu maquina.

### 1. Instalar todas las dependencias

Desde la raiz del proyecto ejecuta:

```bash
npm run install:all
```

Esto instalara las dependencias de la raiz, el backend y el frontend automaticamente.

### 2. Arrancar la aplicacion

```bash
npm run dev
```

Esto arranca el backend y el frontend a la vez.

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Endpoints de la API REST

| Metodo | Ruta                | Descripcion                       |
|--------|---------------------|-----------------------------------|
| GET    | /polizas            | Devuelve todas las polizas        |
| GET    | /polizas/:id_poliza | Devuelve una poliza por su id     |
| POST   | /polizas            | Crea una nueva poliza             |
| PUT    | /polizas            | Actualiza una poliza existente    |
| DELETE | /polizas/:id_poliza | Elimina una poliza                |
| GET    | /estadisticas       | Devuelve estadisticas con filtros |

El endpoint de estadisticas acepta los siguientes parametros opcionales en la query:
- `transmision`: Manual o Automatica
- `comb_electrico`: Combustion o Electrico
- `siniestro`: 0 o 1

## Funcionalidades

### Gestion de polizas
- Consulta de todas las polizas en una tabla con buscador por ID y matricula
- Busqueda de poliza por ID para editar
- Alta manual mediante formulario con validacion de todos los campos
- Edicion de una poliza existente sin poder modificar id ni matricula
- Eliminacion desde la tabla o introduciendo el id en un formulario

### Validaciones del formulario
- El id de poliza debe seguir el formato IDXXXXX (5 digitos)
- La matricula debe cumplir el formato espanol: 4 numeros y 3 letras validas
- La vigencia debe estar entre 1 y 21 meses
- La edad del coche debe estar entre 0 y 10 anos
- El tomador debe tener entre 18 y 90 anos
- Las expresiones regulares se almacenan en React Context

### Estadisticas
- Filtrado por transmision, tipo de motor y siniestro
- Total de polizas en el subconjunto filtrado
- Porcentaje de polizas con y sin siniestro
- Media de edad del coche y del tomador
- Los calculos se realizan en el backend
