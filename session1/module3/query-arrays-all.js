// https://docs.mongodb.com/manual/reference/operator/query/all/#mongodb-query-op.-all

db = db.getSiblingDB("tienda");

const product1 = db.products.findOne({ _id: ObjectId("60be588e59417d9b6a072333") });
const product2 = db.products.findOne({ _id: ObjectId("60be588c59417d9b6a07210e") });

// La "intersección" de dos productos en todos los carritos
const shoppingCarts = db.shoppingCarts.find({
    products: {
        $all: [product1, product2] // [producto1, producto2, ...]
    }
}).toArray();

print(`Se encontraron ${shoppingCarts.length} carritos que contienen a ${product1.name} y ${product2.name}`);
// printjson(shoppingCarts);