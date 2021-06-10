# Configuración de un servidor Replica Set

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

> Activamos la instancia `mongod` como un _"Replica Set"_ de tipo _"Config Server"_ con el nombre de replica `"replicaConfigServer"`

```bash
nano /etc/mongod.conf

--

# mongod.conf

security:
  keyFile: "/home/ubuntu/<keyfile>"

replication:
  replSetName: "replicaConfigServer"

sharding:
  clusterRole: configsvr
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

## Iniciar el enlace de los Replica Sets (config servers)

Docs: [https://docs.mongodb.com/manual/reference/method/rs.initiate/](https://docs.mongodb.com/manual/reference/method/rs.initiate/)

> Ejecutamos la orden en cualquier replica

* __Nota__: Esta es la activación real de nuestro `Replica Set`

```bash
rs.initiate({
    _id: "replicaConfigServer",
    configsvr: true,
    members: [
      { _id : 0, host : "18.223.209.151", priority: 100, tags: { name: "config-server-1" } },
      { _id : 1, host : "13.59.164.177", priority: 10, tags: { name: "config-server-2" } },
      { _id : 2, host : "3.14.129.60", priority: 1, tags: { name: "config-server-3" } }
    ]
  }
)
```

