# Configurar un servidor de Router

## 1. Registrar el servicio `mongos`

> Registramos el servicio de `mongos`

* __Nota__: El servicio `mongos` a diferencia de `mongod` no retiene datos y es utilizado para solamente recibir las operaciones de escritura y lectura a las bases de datos tipo `sharding`.

```bash
sudo nano /lib/systemd/system/mongos.service

--

[Unit]
Description=Mongo Cluster Router
After=network.target

[Service]
User=mongodb
Group=mongodb

ExecStart=/usr/bin/mongos --config /etc/mongos.conf

LimitFSIZE=infinity
LimitCPU=infinity
LimitAS=infinity

LimitNOFILE=64000
LimitNPROC=64000

TasksMax=infinity
TasksAccounting=false

[Install]
WantedBy=multi-user.target
```

## 2. Definir el archivo de configuración del router `mongos`

> Crear y editar el archivo de configuración

* __Nota__: El archivo podría tener problemas de lectura por parte de `mongos` por lo que hay que asignar los permisos necesarios como `chmod 400` y `chown mongodb:mongodb` como se hizo para `replica.key`.

```bash
sudo nano /etc/mongos.conf

--

# mongos.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0

security:
  keyFile: "/home/ubuntu/replica.key"

sharding:
  configDB: replicaConfigServer/18.223.209.151,13.59.164.177,3.14.129.60

# where to write logging data.
systemLog:
  destination: file
  #logAppend: true
  logAppend: false
  path: /var/log/mongodb/mongos.log
```

## 3. Agregar un usuario de administración para el router `mongos`

> Creamos un usuario de administración (usando el usuario `botadmin`)

* __Nota__: El usuario de administración del clúster debe tener los roles de `clusterAdmin` para poder registrar nuevos nodos tipo `shard`.

```bash
use admin

db.createUser({
    user: "admin",
    pwd: "admin.123",
    roles: [ 
        { role: "clusterAdmin", db: "admin" }, 
        { role: "root", db: "admin" }, 
        { role: "userAdminAnyDatabase", db: "admin" }, 
        { role: "readAnyDatabase", db: "admin" }, 
        { role: "readWriteAnyDatabase", db: "admin" }, 
        { role: "userAdminAnyDatabase", db: "admin" } 
    ]
})
```

## 4. Agregar/registrar el nodo tipo `shard`

> Registrar el nodo `shard` mediante su nombre y ubicación

* __Nota__: Deberemos ingresar al mongo shell sobre el router usando el usuario administrador con el role `clusterAdmin`.

```bash
sh.addShard( "replicaShardServer/3.17.28.87:27017")
```