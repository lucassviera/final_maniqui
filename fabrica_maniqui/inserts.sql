USE fabrica_maniquies;

-- =============================================
-- 1. CARGA DE TIPOS DE PIEZA
-- =============================================
INSERT INTO tipos_pieza (nombre) VALUES 
('Cabeza'), ('Torso'), ('Brazo'), ('Pierna');

-- =============================================
-- 2. CARGA DE PIEZAS (10 de cada una)
-- =============================================

-- 10 Cabezas (id_tipo 1)
INSERT INTO piezas (id_tipo_pieza, material, color, estado) VALUES 
(1, 'Plástico', 'Blanco', 'Disponible'), (1, 'Plástico', 'Piel', 'Disponible'),
(1, 'Madera', 'Natural', 'Disponible'), (1, 'Plástico', 'Negro', 'Disponible'),
(1, 'Fibra', 'Gris', 'Disponible'), (1, 'Plástico', 'Blanco', 'Dañado'),
(1, 'Madera', 'Marrón', 'Disponible'), (1, 'Plástico', 'Piel', 'Disponible'),
(1, 'Fibra', 'Blanco', 'Disponible'), (1, 'Plástico', 'Negro', 'Disponible');

-- 10 Torsos (id_tipo 2)
INSERT INTO piezas (id_tipo_pieza, material, color, estado) VALUES 
(2, 'Plástico', 'Blanco', 'Disponible'), (2, 'Plástico', 'Piel', 'Disponible'),
(2, 'Madera', 'Natural', 'Disponible'), (2, 'Plástico', 'Negro', 'Disponible'),
(2, 'Fibra', 'Gris', 'Disponible'), (2, 'Plástico', 'Blanco', 'Disponible'),
(2, 'Madera', 'Marrón', 'Disponible'), (2, 'Plástico', 'Piel', 'Disponible'),
(2, 'Fibra', 'Blanco', 'Disponible'), (2, 'Plástico', 'Negro', 'Disponible');

-- 10 Brazos (id_tipo 3)
INSERT INTO piezas (id_tipo_pieza, material, color, estado) VALUES 
(3, 'Plástico', 'Blanco', 'Disponible'), (3, 'Plástico', 'Blanco', 'Disponible'),
(3, 'Plástico', 'Piel', 'Disponible'), (3, 'Plástico', 'Piel', 'Disponible'),
(3, 'Madera', 'Natural', 'Disponible'), (3, 'Madera', 'Natural', 'Disponible'),
(3, 'Plástico', 'Negro', 'Disponible'), (3, 'Plástico', 'Negro', 'Disponible'),
(3, 'Fibra', 'Gris', 'Disponible'), (3, 'Fibra', 'Gris', 'Disponible');

-- 10 Piernas (id_tipo 4)
INSERT INTO piezas (id_tipo_pieza, material, color, estado) VALUES 
(4, 'Plástico', 'Blanco', 'Disponible'), (4, 'Plástico', 'Blanco', 'Disponible'),
(4, 'Plástico', 'Piel', 'Disponible'), (4, 'Plástico', 'Piel', 'Disponible'),
(4, 'Madera', 'Natural', 'Disponible'), (4, 'Madera', 'Natural', 'Disponible'),
(4, 'Plástico', 'Negro', 'Disponible'), (4, 'Plástico', 'Negro', 'Disponible'),
(4, 'Fibra', 'Gris', 'Disponible'), (4, 'Fibra', 'Gris', 'Disponible');

-- =============================================
-- 3. CARGA DE MANIQUÍES (5 registros)
-- =============================================
INSERT INTO maniquies (numero_serie, modelo_nombre, estado_venta) VALUES 
('SERIE-A001', 'Modelo Ejecutivo Masculino', 'Stock'),
('SERIE-B002', 'Modelo Vintage Madera', 'Vendido'),
('SERIE-C003', 'Modelo Deportivo Pro', 'Stock'),
('SERIE-D004', 'Modelo Kids Verano', 'Stock'),
('SERIE-E005', 'Modelo Alta Costura', 'Exhibición');

-- =============================================
-- 4. ENSAMBLAJE (Vincular maniquíes con piezas)
-- =============================================
-- Vamos a armar el Maniquí 1 (id 1) con piezas de plástico blancas
INSERT INTO ensamblaje_detalle (id_maniqui, id_pieza) VALUES 
(1, 1),   -- Cabeza Plástico Blanco
(1, 11),  -- Torso Plástico Blanco
(1, 21),  -- Brazo Izq
(1, 22),  -- Brazo Der
(1, 31),  -- Pierna Izq
(1, 32);  -- Pierna Der

-- Maniquí 2 (id 2) con piezas de madera
INSERT INTO ensamblaje_detalle (id_maniqui, id_pieza) VALUES 
(2, 3),   -- Cabeza Madera
(2, 13),  -- Torso Madera
(2, 25),  -- Brazo
(2, 26),  -- Brazo
(2, 35),  -- Pierna
(2, 36);  -- Pierna
