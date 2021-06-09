echo "Subiendo archivos de instalación y configuración al servidor..."

scp -i "dragon-aws-keys.pem" "hello.sh" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "install.sh" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "config.sh" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "mongod-unsafe.conf" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "mongod-secure.conf" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "createUser.js" ubuntu@18.223.209.151:/home/ubuntu
scp -i "dragon-aws-keys.pem" "18.223.209.151.txt" ubuntu@18.223.209.151:/home/ubuntu

echo "Archivos de instalación y configuración listos [OK]"