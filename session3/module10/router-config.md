```bash
sudo nano /lib/systemd/system/mongos.service

--

[Unit]
Description=Mongo Cluster Router
After=network.target

[Service]
User=mongodb
Group=mongodb

ExecStart=/usr/bin/mongos --config /etc/mongos.conf

LimitFSIZE=infinity
LimitCPU=infinity
LimitAS=infinity

LimitNOFILE=64000
LimitNPROC=64000

TasksMax=infinity
TasksAccounting=false

[Install]
WantedBy=multi-user.target
```



```bash
sudo nano /etc/mongos.conf

--

# mongos.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0

security:
  keyFile: "/home/ubuntu/replica.key"

sharding:
  configDB: replicaConfigServer/18.223.209.151,13.59.164.177,3.14.129.60

# where to write logging data.
systemLog:
  destination: file
  #logAppend: true
  logAppend: false
  path: /var/log/mongodb/mongos.log
```

```bash
use admin

db.createUser({
    user: "admin",
    pwd: "admin.123",
    roles: [ 
        { role: "clusterAdmin", db: "admin" }, 
        { role: "root", db: "admin" }, 
        { role: "userAdminAnyDatabase", db: "admin" }, 
        { role: "readAnyDatabase", db: "admin" }, 
        { role: "readWriteAnyDatabase", db: "admin" }, 
        { role: "userAdminAnyDatabase", db: "admin" } 
    ]
})
```

```bash
sh.addShard( "replicaShardServer/3.17.28.87:27017")
```