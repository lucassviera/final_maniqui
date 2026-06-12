# Trabajo Práctico: Fábrica de Maniquíes (Parte II)

## Descripción
Este proyecto contiene la implementación técnica de la base de datos para la gestión de una fábrica de maniquíes. Incluye la creación de tablas, relaciones de integridad referencial y una carga inicial de datos para pruebas.

## Estructura del Proyecto
El repositorio está organizado de la siguiente manera:
* `creates.sql`: Sentencias DDL para la creación de la base de datos y sus tablas (`tipos_pieza`, `piezas`, `maniquies`, `ensamblaje_detalle`).
* `inserts.sql`: Sentencias DML para la carga de datos de prueba (40 piezas y 5 maniquíes ensamblados).

## Instrucciones de Ejecución
Para poner en marcha la base de datos, siga este orden en su gestor de SQL (ej. phpMyAdmin):

1. **Ejecutar `creates.sql`**: Esto creará la base de datos `fabrica_maniquies` y su estructura.
2. **Ejecutar `inserts.sql`**: Esto poblará las tablas con la información necesaria para las pruebas.

## Autor
Lucas Viera