./upload.sh

echo "Probando ejecución remota en el servidor..."

ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo chmod +x hello.sh"
ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo ./hello.sh"

# echo "Instalando Mongo DB..."

# ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo chmod +x install.sh"
# ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo ./install.sh"

echo "Configurando Mongo DB..."

ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo chmod +x config.sh"
ssh -i "dragon-aws-keys.pem" ubuntu@18.223.209.151 "sudo ./config.sh"

echo "Servidor Mongo DB creado en 18.223.209.151"