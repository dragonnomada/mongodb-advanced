IP=$1

echo "Subiendo llave de los replicas..."

scp -i "../dragon-aws-keys.pem" replica.key ubuntu@$IP:/home/ubuntu

echo "Asignando permisos a la llave..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chmod 400 replica.key"

echo "Cambiando al propietario de llave por mongodb..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chown mongodb:mongodb replica.key"

echo "Subiendo el archivo de configuración de Mongo DB para el router..."

scp -i "../dragon-aws-keys.pem" mongos-router.conf ubuntu@$IP:/home/ubuntu

echo "Creando un reespaldo del archivo de configuración de Mongo DB"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cp /etc/mongos.conf /etc/mongos.conf.router.bak"

echo "Actualizando el archivo de configuración de Mongo DB para el router..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cp mongos-router.conf /etc/mongos.conf"

echo "Deteniendo el servicio 'mongod'..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl stop mongod"

echo "Quitando el servicio 'mongod'..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl disable mongod"

echo "Agregando el servicio 'mongos'..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl enable mongos"

echo "Iniciando el servicio 'mongos'..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl start mongos"

echo "Comprobando el servicio 'mongos'..."

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl status mongos"