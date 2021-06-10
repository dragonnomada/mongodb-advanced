db = db.getSiblingDB("admin")

db.createUser({
    user: "bottest",
    pwd: "bot.test123",
    roles: [ { role: "readWrite", db: "test" } ]
})