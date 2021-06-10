IP=$1

echo "Desplegando el Servidor $IP..."

./upload.sh $IP

echo "Probando ejecución remota en el servidor..."

ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo chmod +x hello.sh"
ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo ./hello.sh"

echo "Instalando Mongo DB..."

ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo chmod +x install.sh"
ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo ./install.sh"

echo "Configurando Mongo DB..."

ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo chmod +x config.sh"
ssh -i "dragon-aws-keys.pem" ubuntu@$IP "sudo ./config.sh"

echo "Servidor Mongo DB creado en $IP"