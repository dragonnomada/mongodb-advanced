IP=$1

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chown ubuntu:ubuntu replica.key"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo rm replica.key"

scp -i "../dragon-aws-keys.pem" replica.key ubuntu@$IP:/home/ubuntu

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chmod 400 replica.key"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chown mongodb:mongodb replica.key"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl restart mongod"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cat /var/log/mongodb/mongod.log"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl status mongod"