echo "Descargando las claves de Mongo DB para APT..."

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "Registrando las claves en APT..."

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

echo "Actualizando APT..."

sudo apt-get update

echo "Instalando Mongo DB..."

sudo apt-get install -y mongodb-org

echo "Iniciando Mongo DB..."

sudo systemctl start mongod

echo "Registrando el servicio Mongo DB (mongod)..."

sudo systemctl enable mongod

echo "Reespaldando la configuración de mongod..."

sudo cp /etc/mongod.conf /etc/mongod.conf.bak

echo "Mongo DB instalado correctamente [OK]"