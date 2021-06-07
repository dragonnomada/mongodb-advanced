// https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne

db = db.getSiblingDB("tienda");

db.products.updateMany({ price: { $gt: 1000 } }, [
    {
        $set: {
            price: {
                $sum: ["$price_unit", 200]
            }
        }
    }
]);