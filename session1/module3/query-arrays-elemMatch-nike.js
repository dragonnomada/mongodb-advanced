// https://docs.mongodb.com/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch

db = db.getSiblingDB("tienda");

const shoppingCarts = db.shoppingCarts.find({
    products: { // Es un arreglo [ { name, ..., existances }, ... ]
        $elemMatch: { // Todos los que coincidan en elemento { name, description, ..., existances }
            name: { $regex: "nike" },
            price: { $gt: 150 }
        }
    }
}).toArray();

print(`Se encontraron ${shoppingCarts.length} carritos que contienen un producto nike`);