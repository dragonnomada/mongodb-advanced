db = db.getSiblingDB("admin")

db.createUser({
    user: "botadmin",
    pwd: "bot.admin123",
    roles: [{role: "userAdminAnyDatabase", db: "admin"}, "readWriteAnyDatabase"]
})