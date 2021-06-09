# Indexación en Mongo DB

## Introducción a los Índices

Docs: [https://docs.mongodb.com/manual/indexes/](https://docs.mongodb.com/manual/indexes/)

* Aportan información sobre los valores retenidos en los campos de los documentos en las colecciones
* Sirven para que Mongo DB mejore el rendimiento y optimice las consultas de forma automática
* Definen un tipo de valor y Mongo DB lo utiliza para guardar algunos valores de pivote o regiones (`boundaries`) que agrupan los documentos y al realizar las consultas limita el número de documentos sobre los que se efectuará la consulta.
* Indexar nuestras colecciones es una buena práctica para mejorar la eficiencia de las consultas, el almacenamiento y simplicar las cargas de operaciones, sobre todo al usar `Replica Sets` y ``Shardings` (`Clústers`).

![mongo-21](screenshots/mongo/mongo-21.png)

## Crear índices mediante compás (`Mongo DB Compass`)

### Seleccionar la colección a indexar e ir a la pestaña de índices

![mongo-22](screenshots/mongo/mongo-22.png)

### Crear el índice

![mongo-23](screenshots/mongo/mongo-23.png)

### Seleccionar el campo (`<field>`)

![mongo-24](screenshots/mongo/mongo-24.png)

### Seleccionar el campo (seleccionar el tipo)

![mongo-25](screenshots/mongo/mongo-25.png)

### Ajustar colaciones avanzadas

![mongo-26](screenshots/mongo/mongo-26.png)

## Crear Índices mediante el shell

Docs: [https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/)

```bash
db.<collection>.createIndex(
  {
      <field>: 1 // 1 - asc | -1 - desc | "text" | "2d" | "2dsphere" | "hashed" | ...
  },
  { // https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#options
      unique: true,
      sparse: true,
      expireAfterSeconds: 3600
  }
)
```