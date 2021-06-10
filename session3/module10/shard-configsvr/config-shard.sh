IP=$1

scp -i "../dragon-aws-keys.pem" replica.key ubuntu@$IP:/home/ubuntu

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chmod 400 replica.key"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo chown mongodb:mongodb replica.key"

scp -i "../dragon-aws-keys.pem" mongod-shard.conf ubuntu@$IP:/home/ubuntu

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cp /etc/mongod.conf /etc/mongod.conf.shard.bak"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cp mongod-shard.conf /etc/mongod.conf"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl restart mongod"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo cat /var/log/mongodb/mongod.log"

ssh -i "../dragon-aws-keys.pem" ubuntu@$IP "sudo systemctl status mongod"