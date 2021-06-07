// https://docs.mongodb.com/manual/tutorial/query-embedded-documents/

db = db.getSiblingDB("tienda");

const shoppingCarts = db.shoppingCarts.find({
    "user.name": { $regex: "Ana" }
    // "address.street.number": <operator> | <value>
    // "user.picture.thumbnail": <operator> | <value> 
}).toArray();

print(`Se encontraron ${shoppingCarts.length} carritos que contienen un usuario llamado Ana`);