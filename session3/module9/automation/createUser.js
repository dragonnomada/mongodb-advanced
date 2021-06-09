db = db.getSiblingDB("admin")

db.createUser({
    user: "botadmin",
    pwd: "bot.admin123",
    roles: [{role: "userAdminAnyDatabase", db: "admin"}, "readWriteAnyDatabase"]
})

// db.createUser({
//     user: "bottest",
//     pwd: "bot.test123",
//     roles: [ { role: "readWrite", db: "test" } ]
// })