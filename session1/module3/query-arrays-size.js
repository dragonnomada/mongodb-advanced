// https://docs.mongodb.com/manual/reference/operator/query/size/#mongodb-query-op.-size

db = db.getSiblingDB("tienda");

const shoppingCarts = db.shoppingCarts.find({
    products: {
        $size: 1
    }
}).toArray();

print(`Se encontraron ${shoppingCarts.length} carritos que contienen un sólo producto`);