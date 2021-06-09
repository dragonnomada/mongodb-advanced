# Reespaldos en Mongo DB

## La instancia `mongod`

El comando instalado en Mongo DB llamado `mongod` nos va a permitir crear una instancia del servidor de la base de datos, con la cuál podremos acceder a la base de datos mediante el shell `mongo` o los _drivers_ para los distintos lenguajes de programación (node.js, python, java, etc.). A través de la cadena de conexión.

La instancia está asociada a un archivo de configuración ubicado en `/etc/mongod.conf`, este archivo especifica las reglas de la instancia como `bindIp` que ajustaremos a `0.0.0.0` para dar acceso remoto y `security` donde colocaremos `authorization: enabled` para activar el control de acceso. El archivo debería quedar como el siguiente.

> /etc/mongod.conf

```bash
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
#  bindIp: 127.0.0.1
  bindIp: 0.0.0.0

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```

## Cadenas de conexión

Una de cadena de conexión establece la ruta completa a nuestra instancia `mongod`. Generalmente vamos a requerir especificar el usuario, la contraseña, el host y la base de datos inicial. Esta cadena tiene la siguiente estructura.

> Sintaxis de la cadena de conexión

* __Nota__: Cuándo el control de acceso no está habilitado podremos omitir `<user>` y `<password>` y cuándo el puerto es el `27017` podremos también omitirlo. Dentro del servidor no es necesaria toda la cadena, podríamos simplemente colocar únicamente el nombre de la base de datos `<database>` e incluso omitirla y acceder a la base de datos _"test"_.

```bash
mongodb://<user>:<password>@<host>:<port>/<database>
```

> Ejemplo de una cadena de conexión

```bash
mongodb://tester:tester123@18.117.240.224:27017/test
```

> Ejemplo de conexión mediante la cadena y Mongo Shell

* Si queremos dar el usuario por afuera

```bash
mongo mongodb://18.117.240.224:27017/test --authenticationDatabase "admin" -u "tester" -p
```

* Si queremos incluir el usuario dentro de la cadena

```bash
mongo mongodb://tester:tester123@18.117.240.224:27017/test --authenticationDatabase "admin"
```

## Reespaldar una base de datos mediante `mongoexport`

Docs: [https://docs.mongodb.com/database-tools/mongoexport/](https://docs.mongodb.com/database-tools/mongoexport/)

### Instalación de las Herramientas de Mongo DB

* Descargar las herramientas desde [https://docs.mongodb.com/database-tools/installation/installation/](https://docs.mongodb.com/database-tools/installation/installation/)

### 1. Instalar las herramientas

![mongo-11](screenshots/mongo/mongo-11.png)

### 2. Iniciamos el proceso de instalación

![mongo-12](screenshots/mongo/mongo-12.png)

### 3. Anotamos dónde querán instaladas las herramientas

![mongo-13](screenshots/mongo/mongo-13.png)

### 4. Verificamos que se hayan instalado las herramientas

![mongo-14](screenshots/mongo/mongo-14.png)

### 5. Ubicamos la carpeta `bin` dónde están las herramientas

![mongo-15](screenshots/mongo/mongo-15.png)

### 6. Abrimos las propiedades avanzadas del sistema

![win-1](screenshots/win/win-1.png)

### 7. En windows se conoce como "Configuración Avanzada del Sistema"

![win-2](screenshots/win/win-2.png)

### 8. Abrimos las "Variables de Entorno"

![win-3](screenshots/win/win-3.png)

### 9. Modificamos el "Path"

* __Nota__: Tiene que ser el _"Path"_ de _"Variables del Sistema"_

![win-4](screenshots/win/win-4.png)

### 9. Agregamos la entrada con nuestra ruta a la carpeta `bin`

![win-5](screenshots/win/win-5.png)

### 10. En una _nueva_ terminal verificamos la versión de `mongoexport`

```bash
mongoexport --version
```

![mongo-16](screenshots/mongo/mongo-16.png)

## Reespaldo en CSV/JSON mediante `mongoexport`

Docs: [https://docs.mongodb.com/database-tools/mongoexport/](https://docs.mongodb.com/database-tools/mongoexport/)

> Exportar una colección

```bash
mongoexport --collection=<collection> <connection-string>
```

> Ejemplo de un respaldo

```bash
mongoexport --collection="dragon" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin" > backup.json
```

> Ejemplo de un respaldo con `query`

* __Nota__: Podemos usar la opción `--query=<query>` dónde `<query>` es la consulta en formato JSON.

```bash
mongoexport --query='{"name":"Dragon Nomada"}' --collection="dragon" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin" > backup_dragon.json
```

> Ejemplo de un respaldo con `fields`

* __Nota__: Podemos usar la opción `--fields=<field1>,<field2>,...`

```bash
mongoexport --fields=email --collection="dragon" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin" > backup_small.json
```

> Ejemplo de un respaldo en `csv`

```bash
mongoexport --type=csv --fields=name,email --out="backup.csv" --collection="dragon" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin"
```

> Ejemplo de un respaldo en `JSON Array`

```bash
mongoexport --jsonArray --pretty --out="backup-pretty.json" --collection="dragon" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin"
```

![mongo-17](screenshots/mongo/mongo-17.png)

### Límites de un registro JSON en Mongo DB

![mongo-18](screenshots/mongo/mongo-18.png)

### Límites generales de JSON (depende de la arquitectura)

![mongo-19](screenshots/mongo/mongo-19.png)

### __NOTA IMPORTANTE__: El comando `mongoexport` devuelve un _JSON Stream_

Esto significa que podemos obtener todos los registros en un stream y esto significaría que cada línea del archivo de reespaldo devuelto contendría un registro JSON, haciendo posible obtener millones de registros sin importar los límites de JSON, ya que el _stream_ devuelto no es un JSON como tal, sino es un JSON en cada línea solamente.

## Importación mediante `mongoimport`

Docs: [https://docs.mongodb.com/database-tools/mongoimport/](https://docs.mongodb.com/database-tools/mongoimport/)

> Importar una colección

```bash
<stdin> | mongoimport --collection=<collection> <connection-string>
```

> Ejemplo de una importación desde `stdin`

```bash
cat backup.json | mongoimport --collection="dragon-restored" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin"
```

> Ejemplo de una importación desde un archivo

```bash
mongoimport --file="backup.json" --collection="dragon-restored" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin"
```

## Respaldo binario usando `mongodump`

Docs: [https://docs.mongodb.com/database-tools/mongodump/](https://docs.mongodb.com/database-tools/mongodump/)

Un reespaldo binario tiene la caracterísitica de volcar nuestros datos naturalmente en BSON en lugar de JSON. Tiene ventajas en el tamñano final del reespaldo (pesa menos) y también tiene la venta de darnos datos binarios incorruptibles, ya que al modificarlos cambiaría el tamaño de bytes y no coincidiría su firma __SHA__ (_hash_).

> Reespaldar una base de datos

* __Nota__: Si sólo queremos reespaldar una colección usamos la opción `--collection=<colection>`

```bash
mongodump <connection-string>
```

> Ejemplo de un respaldo

* __Nota__: El reespaldo nos creará la carpeta indicada en el parámetro `--out`, sino directamente en nuestro directorio de trabajo.

```bash
mongodump --out="backup-2021-06-09.13-10" mongodb://tester:tester123@18.117.240.224/test --authenticationDatabase "admin"
```

![mongo-20](screenshots/mongo/mongo-20.png)

## Restauración de un respaldo binario usando `mongorestore`

Docs: [https://docs.mongodb.com/database-tools/mongorestore/](https://docs.mongodb.com/database-tools/mongorestore/)

> Restaurar el respaldo de una base de datos

* __Nota__: El parámetro `<backup>` es la ruta hacia la carpeta de reespaldo (ejemplo `backup-2021-06-09.13-10/`)

```bash
mongorestore <connection-string> <backup>
```

> Ejemplo de una restauración cambiando el nombre de la base de datos

```bash
mongorestore mongodb://localhost/ --nsFrom="test.*" --nsTo="test-restored.*" backup-2021-06-09.13-10/
```