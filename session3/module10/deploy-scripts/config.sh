echo "Actualizando la configuración de mongod..."

sudo cp mongod-unsafe.conf /etc/mongod.conf

echo "Reiniciando el servicio de Mongo DB (mongod)..."

sudo systemctl restart mongod

echo "Esperando 2 segundos..."

sleep 2

echo "Creando al usuario de administración..."

mongo createUserAdmin.js

echo "Deteniendo el servicio de Mongo DB (mongod)..."

sudo systemctl stop mongod

echo "Actualizando la configuración de mongod..."

sudo cp mongod-secure.conf /etc/mongod.conf

echo "Encendiendo el servicio de Mongo DB (mongod)..."

sudo systemctl start mongod

echo "Esperando 2 segundos..."

sleep 2

echo "Creando al usuario de pruebas..."

mongo mongodb://botadmin:bot.admin123@localhost/admin --authenticationDatabase "admin" createUserTest.js

echo "Mongo DB configurado correctamente [OK]"