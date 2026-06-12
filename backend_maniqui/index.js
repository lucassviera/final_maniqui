const express = require('express');
const app = express();
const PORT = 3000;

// MIDDLEWARE: Obligatorio para que Express pueda leer los datos que le enviamos en un POST
app.use(express.json());

// NUESTROS ARREGLOS (Simulación de Base de Datos)
let maniquies = [
    { id: 1, numero_serie: 'SERIE-A001', modelo_nombre: 'Masculino Ejecutivo', estado_venta: 'Stock' },
    { id: 2, numero_serie: 'SERIE-B002', modelo_nombre: 'Vintage Madera', estado_venta: 'Vendido' }
];

let piezas = [
    { id: 1, id_tipo_pieza: 1, material: 'Plástico', color: 'Blanco', estado: 'Disponible' },
    { id: 2, id_tipo_pieza: 4, material: 'Madera', color: 'Natural', estado: 'Disponible' }
];

// ============================================================================
// ENDPOINTS PARA MANIQUÍES
// ============================================================================

// 1. OBTENER TODOS LOS MANIQUÍES (GET)
app.get('/api/maniquies', (req, res) => {
    res.json(maniquies);
});

// 2. CREAR UN NUEVO MANIQUÍ (POST)
app.post('/api/maniquies', (req, res) => {
    const nuevoManiqui = {
        id: maniquies.length + 1, // Autoincremental simple
        numero_serie: req.body.numero_serie,
        modelo_nombre: req.body.modelo_nombre,
        estado_venta: req.body.estado_venta
    };

    // Validar que no vengan campos vacíos
    if (!nuevoManiqui.numero_serie || !nuevoManiqui.modelo_nombre) {
        return res.status(400).json({ error: "Faltan campos obligatorios (numero_serie o modelo_nombre)" });
    }

    maniquies.push(nuevoManiqui);
    res.status(201).json({ mensaje: "Maniquí creado con éxito", maniqui: nuevoManiqui });
});

// 3. BORRAR UN MANIQUÍ POR ID (DELETE)
app.delete('/api/maniquies/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const index = maniquies.findIndex(m => m.id === idBuscar);

    if (index === -1) {
        return res.status(404).json({ error: "Maniquí no encontrado" });
    }

    // Lo sacamos del arreglo
    const eliminado = maniquies.splice(index, 1);
    res.json({ mensaje: "Maniquí eliminado con éxito", eliminado: eliminado[0] });
});

// ============================================================================
// ENDPOINTS PARA PIEZAS
// ============================================================================

// 4. OBTENER TODAS LAS PIEZAS (GET)
app.get('/api/piezas', (req, res) => {
    res.json(piezas);
});


// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});