# echo "Deteniendo el servicio de Mongo DB (mongod)..."

# sudo systemctl stop mongod

echo "Actualizando la configuración de mongod..."

sudo cp mongod-unsafe.conf /etc/mongod.conf

echo "Encendiendo el servicio de Mongo DB (mongod)..."

sudo systemctl restart mongod

echo "Esperando 5 segundos..."

sleep 5

echo "Creando los usuarios..."

mongo createUser.js

echo "Deteniendo el servicio de Mongo DB (mongod)..."

sudo systemctl stop mongod

echo "Actualizando la configuración de mongod..."

sudo cp mongod-secure.conf /etc/mongod.conf

echo "Encendiendo el servicio de Mongo DB (mongod)..."

sudo systemctl start mongod

echo "Mongo DB configurado correctamente [OK]"