# Mongo DB Advanced

## Contenido

* Sesión 1 - Fundamentos de Mongodb: Instalación, arquitectura, consultas y actualizaciones
* Sesión 2 - Confuguración de un servidor: Agregaciones, Comandos de Linux e instalación
* Sesión 3 - Configuración de nodos (multi-servidor): Replica Sets, Sharding y Routers
* Sesión 4 - Configuración real de múltiples nodos en Raspberry: Clústers reales y Proyectos

## Sesión 1

### Módulo 1

* Instalación
* Configuración
* Arranque
* Arquitectura
* JSON
* BSON

### Módulo 2

* CRUD
* Modelo Relacional
* Modelo No relacional
* Estrategia de relación externa (referenciado)
* Estrategia de relación interna (embebido)

### Módulo 3

* Consultas escalares
* Consultas en arreglos
* Consultas en objetos
* Consultas geoespaciales
* Consultas regulares
* Proyecciones

### Módulo 4

* Actualización de escalares
* Actualización en Arreglos
* Actualización en objetos
* Upserts (Autoinserciones)
* Proyecto 1

## Sesión 2

### Módulo 5

* Agregación $addFields (`<newField>: <expression>`)
* Agregación $bucket (`groupBy: <field>, boundaries: <array>, output: { <newField>: <$accum expr> }`)
* Agregación $geoNear (`near: <geoJSON>, distanceField: <path>, minDistance: <value>, maxDistance: <value>, query: <query>`)
* Agregación $count (`<field to count>`)
* Agregación $group (`_id: <expression>, <newField>: <$accum expr>`)
* Agregación $lookup (`from: <collection>, localField: <path>, foreignField: <path>, as: <path output-array>`)

### Módulo 6

* Agregación $match (`<query> { <field>: { $operator } | $operator: <expression> }`)
* Agregación $merge (`into: <collection>, on: [<localField>, <foreignField>], whenMatched: <strategy>, whenNotMatched: <strategy>`)
* Agregación $out (`<collection to replace>`)
* Agregación $replaceRoot (`newRoot: <path to field type object>`)
* Agregación $unset (`<field> | [<field1>, <field2>, ...] | [<path1>, <path2>]`)
* Agregación $unwind (`<path to field type array>`)

### Módulo 7

* Comandos de Linux
* Instalación en un servidor Linux
* Creación de usuarios y roles
* Cadenas de Conexión
* Mongod
* Mongoexport
* Mongoimport
* Mongodump
* Mongorestore

### Módulo 8

* Índices
* Búsquedas avanzadas en textos
* Búsquedas en fechas
* Proyecto 2

## Sesión 3

### Módulo 9

* Replica Sets (`primary`, `secondary`, `arbiter` | `mongod` -> `n-mongod` | `redundacy + availability`)
* Sharding (`node -> replica sets` | `data partial distribution`)
* Routers (`node root` | `mongos`)

### Módulo 10

* Configuración e instalación de un Replicas Set
* Configuración e instalación de un Sharding
* Configuración e instalación de un Router