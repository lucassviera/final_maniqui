const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');
const cors = require('cors');

app.use(cors());
// MIDDLEWARE: Obligatorio para que Express pueda leer los datos que le enviamos en un POST
app.use(express.json());

// Nota: Eliminamos los arreglos let maniquies y let piezas porque ahora usaremos las tablas de MySQL

// ============================================================================
// ENDPOINTS PARA MANIQUÍES
// ============================================================================

// 1. OBTENER TODOS LOS MANIQUÍES (GET) -> Desde la Base de Datos
app.get('/api/maniquies', (req, res) => {
    const query = 'SELECT * FROM maniquies';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener maniquíes:", err);
            return res.status(500).json({ error: "Error interno del servidor al consultar la DB" });
        }
        res.json(results); // Le enviamos al Front lo que devolvió MySQL
    });
});

// 2. CREAR UN NUEVO MANIQUÍ (POST) -> Insertar en la Base de Datos
app.post('/api/maniquies', (req, res) => {
    const { numero_serie, modelo_nombre, estado_venta } = req.body;

    // Validar que no vengan campos vacíos (mantenemos tu lógica)
    if (!numero_serie || !modelo_nombre) {
        return res.status(400).json({ error: "Faltan campos obligatorios (numero_serie o modelo_nombre)" });
    }

    // Consulta SQL con placeholders (?) por seguridad
    const query = 'INSERT INTO maniquies (numero_serie, modelo_nombre, estado_venta) VALUES (?, ?, ?)';
    
    db.query(query, [numero_serie, modelo_nombre, estado_venta || 'Stock'], (err, result) => {
        if (err) {
            console.error("Error al insertar maniquí:", err);
            return res.status(500).json({ error: "Error al guardar en la base de datos" });
        }
        
        // Devolvemos el éxito junto con el ID autoincremental que generó MySQL
        res.status(201).json({ 
            mensaje: "Maniquí creado con éxito", 
            maniqui: {
                id: result.insertId,
                numero_serie,
                modelo_nombre,
                estado_venta: estado_venta || 'Stock'
            }
        });
    });
});

// 3. BORRAR UN MANIQUÍ POR ID (DELETE) -> Eliminar de la Base de Datos
app.delete('/api/maniquies/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);

    const query = 'DELETE FROM maniquies WHERE id = ?';

    db.query(query, [idBuscar], (err, result) => {
        if (err) {
            console.error("Error al eliminar maniquí:", err);
            return res.status(500).json({ error: "Error al eliminar en la base de datos" });
        }

        // result.affectedRows te dice cuántas filas se borraron. Si es 0, no existía ese ID.
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Maniquí no encontrado" });
        }

        res.json({ mensaje: "Maniquí eliminado con éxito", id_eliminado: idBuscar });
    });
});

// ============================================================================
// ENDPOINTS PARA PIEZAS
// ============================================================================

// 4. OBTENER TODAS LAS PIEZAS (GET) -> Desde la Base de Datos
app.get('/api/piezas', (req, res) => {
    const query = 'SELECT * FROM piezas';

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener piezas:", err);
            return res.status(500).json({ error: "Error al consultar las piezas" });
        }
        res.json(results);
    });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});