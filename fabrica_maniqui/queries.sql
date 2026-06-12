USE fabrica_maniquies;

-- ============================================================================
-- CONSULTAS DE VERIFICACIÓN (QUERIES)
-- ============================================================================

-- 1. Listado de Stock
-- Obtener el número de serie, material y color de todas las piernas que pertenezcan al lado derecho.
-- Nota: Filtramos por id_tipo_pieza = 4 (Piernas) y buscamos coincidencias en el estado/descripción.
SELECT id_pieza, material, color, estado
FROM piezas
WHERE id_tipo_pieza = 4 
  AND (estado LIKE '%Derecha%' OR estado LIKE '%Derecho%');


-- 2. Cabezas por fechas
-- Mostrar todas las cabezas que fueron fabricadas después de una fecha específica.
-- Nota: Filtramos por id_tipo_pieza = 1 (Cabezas) y una fecha posterior al 1 de enero de 2026.
SELECT id_pieza, material, color, fecha_ingreso
FROM piezas
WHERE id_tipo_pieza = 1 
  AND fecha_ingreso > '2026-01-01 00:00:00';


-- 3. Modelos por talla
-- Listar todos los torsos cuyo talle sea 'mediano' o 'largo', ordenados por material de forma alfabética.
-- Nota: Filtramos por id_tipo_pieza = 2 (Torsos).
SELECT id_pieza, material, color, estado AS talle
FROM piezas
WHERE id_tipo_pieza = 2 
  AND (estado LIKE '%Mediano%' OR estado LIKE '%Largo%')
ORDER BY material ASC;


-- 4. Conteo de Materiales
-- Realizar un conteo total de cuántas piezas hay en la base de datos agrupadas por su material.
SELECT material, COUNT(*) AS total_piezas
FROM piezas
GROUP BY material;


-- 5. Consulta de Ensamble
-- Mostrar el código del Maniquí Completo junto con la fecha de ensamblaje y el ID/serie de la cabeza que se le asignó.
-- Nota: Cruzamos las tablas usando JOINs y filtramos para traer solo la pieza que actúa como Cabeza (id_tipo_pieza = 1).
SELECT 
    m.numero_serie AS codigo_maniqui,
    m.fecha_ensamblaje,
    p.id_pieza AS id_cabeza
FROM maniquies m
JOIN ensamblaje_detalle ed ON m.id_maniqui = ed.id_maniqui
JOIN piezas p ON ed.id_pieza = p.id_pieza
WHERE p.id_tipo_pieza = 1;


-- 6. Disponibilidad Personalizada
-- Buscar todas las piezas (de cualquier tipo) que tengan un color o acabado específico (ej. 'Negro').
SELECT id_pieza, id_tipo_pieza, material, color, estado
FROM piezas
WHERE color = 'Negro';