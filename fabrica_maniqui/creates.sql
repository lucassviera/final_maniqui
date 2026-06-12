CREATE DATABASE IF NOT EXISTS fabrica_maniquies;
USE fabrica_maniquies;

-- 1. Tabla de categorías (Cabezas, torsos, etc.)
CREATE TABLE tipos_pieza (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 2. Tabla de los maniquíes (Los productos finales)
CREATE TABLE maniquies (
    id_maniqui INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL,
    modelo_nombre VARCHAR(100) NOT NULL,
    fecha_ensamblaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_venta VARCHAR(50) NOT NULL
);

-- 3. Tabla de las piezas individuales
CREATE TABLE piezas (
    id_pieza INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_pieza INT NOT NULL,
    material VARCHAR(50) NOT NULL,
    color VARCHAR(50),
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    FOREIGN KEY (id_tipo_pieza) REFERENCES tipos_pieza(id_tipo)
);

-- 4. Tabla que une qué piezas tiene cada maniquí
CREATE TABLE ensamblaje_detalle (
    id_ensamblaje INT AUTO_INCREMENT PRIMARY KEY,
    id_maniqui INT NOT NULL,
    id_pieza INT NOT NULL,
    FOREIGN KEY (id_maniqui) REFERENCES maniquies(id_maniqui),
    FOREIGN KEY (id_pieza) REFERENCES piezas(id_pieza)
);