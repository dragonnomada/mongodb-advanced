# Configuración de un servidor Sharding

## Configurar el servidor

### 1. Creamos un archivo con la clave de las replicas

> Generar una clave `Base64` de 1024 bytes como `<keyfile>`

```bash
sudo openssl rand -base64 756 > <keyfile>
```

### 2. Cambiamos los permisos a propietario

> Actualizar los permisos al `<keyfile>`

* __Nota__: Si la llave `<keyfile>` fue generada fuera del servidor, debemos copiarla mediante `scp -i <serverkey.pem> <keyfile> <user>@<host>:/<path>`.

```bash
sudo chmod 400 <keyfile>
```

### 3. Cambiamos al propietario a `mongodb`

> Cambiar al propietario del `<keyfile>` a `mongodb:mongodb`

```bash
sudo chown mongodb:mongodb <keyfile>
```

### 4. Actualizamos la configuración de la instancia `mongod` para agregar la configuración

> Activamos la instancia `mongod` como un _"Replica Set"_ de tipo _"Shard Server"_ con el nombre de replica `"replicaShardServer"`

* __Nota__: Por cada nodo `Shard` que queramos, necesitamos 3 replicas al menos (podrían ser 2 pero no se recomienda en productivo).

```bash
nano /etc/mongod.conf

--

# mongod.conf

security:
  keyFile: "/home/ubuntu/<keyfile>"

replication:
  replSetName: "replicaShardServer<N>"

sharding:
  clusterRole: shardsvr
```

### 5. Reiniciamos la instancia para que aplique la nueva configuración

```bash
sudo systemctl restart mongod
```

### 6. Verificamos que esté activa nuestra instancia

```bash
sudo systemctl status mongod
```

### 7. Si algo falla revisamos los logs

```bash
sudo more /var/log/mongodb/mongod.log
```

## Activar todas las replicas que consideremos

* __NOTA IMPORTANTE__: Debemos configurar todos los otros servidores con el mismo `<keyfile>` y el mismo nombre de replica set `"replicaConfigServer"`. En cualquier instancia que tengamos acceso al role `root` debemos iniciar la instancia `rs.initiate`.

> Asignar el role `root` a `botadmin`

```bash
db.grantRolesToUser("botadmin", [{ role: "root", db: "admin" }])
```

## Iniciar el enlace de los Replica Sets (shard servers)

Docs: [https://docs.mongodb.com/manual/reference/method/rs.initiate/](https://docs.mongodb.com/manual/reference/method/rs.initiate/)

> Ejecutamos la orden en cualquier replica

* __Nota__: Esta es la activación real de nuestro `Replica Set`

```bash
rs.initiate({
    _id: "replicaShardServer",
    members: [
      { _id : 0, host : "3.17.28.87", priority: 100, tags: { name: "shard-server-1" } },
      { _id : 1, host : "3.21.163.95", priority: 10, tags: { name: "shard-server-2" } },
      { _id : 2, host : "18.222.69.63", priority: 1, tags: { name: "shard-server-3" } }
    ]
  }
)
```

