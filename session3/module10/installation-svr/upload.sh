IP=$1

echo "Subiendo archivos de instalación y configuración al servidor..."

scp -i "../dragon-aws-keys.pem" "hello.sh" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "install.sh" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "config.sh" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "mongod-unsafe.conf" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "mongod-secure.conf" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "createUserAdmin.js" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "createUserTest.js" ubuntu@$IP:/home/ubuntu
scp -i "../dragon-aws-keys.pem" "$IP.txt" ubuntu@$IP:/home/ubuntu

echo "Archivos de instalación y configuración listos [OK]"