// https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset

db = db.getSiblingDB("tienda");

/*
{ $unset: "<field>" }
{ $unset: [ "<field1>", "<field2>", ... ] }
*/

const output = db.shoppingCarts.aggregate([
    {
        $unset: ["user", "products._id", "products.description", "products.price_unit"]
    }
])

printjson(output.next())