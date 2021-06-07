// https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne

db = db.getSiblingDB("tienda");

db.products.updateMany(
    { price: { $gte: 60, $lte: 70 } },
    {
        $inc: {
            price: 1000
        }
    }
);