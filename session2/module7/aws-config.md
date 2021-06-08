# Configuración de un Servidor de Linux con Amazon AWS

## Lanzamiento

1. Dirigirnos a [https://aws.amazon.com]

## Instalación de MongoDB en Linux

Docs: [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/]

> Agregar las claves al `APT`

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

> Crear la lista del paquete

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

> Actualizar `apt-get`

```bash
sudo apt-get update
```

> Instalar la última versión de Mongo DB Org

```bash
sudo apt-get install -y mongodb-org
```

## Arranque del demonio de Mongo DB

> Iniciar el servicio `mongod`

* __Nota__: El comando `mongod` es la instancia del servidor de Mongo DB, el cuál lo podemos asociar al _"nodo"_ o _"clúster"_.

```bash
sudo systemctl start mongod
```

> Habilitamos el servicio `mongod` para que se encianda automáticamente aún tras un reinicio

```bash
sudo systemctl enable mongod
```

> Para ver el estatus del servicio `mongod`

```bash
sudo systemctl status mongod
```

> Para detener el servicio `mongod`

```bash
sudo systemctl stop mongod
```

> Para reiniciar el servicio `mongod`

```bash
sudo systemctl restart mongod
```

## Acceder a Mongo DB

> Acceso local

```bash
mongo
```

> Acceso remoto

* __Nota__: El `<uri>` es la cadena de conexión.

```bash
mongo <uri>
```

> Acceso remoto ejemplo

```bash
mongo mongodb://18.117.240.224:27017/test
```


