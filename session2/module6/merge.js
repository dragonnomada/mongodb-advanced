// https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge

db = db.getSiblingDB("tienda");

/*
$merge: {
    into: <collection> -or- { db: <db>, coll: <collection> },
    on: <identifier field> -or- [ <identifier field1>, ...],  // Optional
    let: <variables>,                                         // Optional
    whenMatched: <replace|keepExisting|merge|fail|pipeline>,  // Optional
    whenNotMatched: <insert|discard|fail>                     // Optional
} 
*/

const output = db.shoppingCarts.aggregate([
    {
        $addFields: {
            priceAvg: {
                $avg: "$products.price"
            }
        }
    },
    { // Mezcla el stage actual con la colección definida
        $merge: {
            into: "shoppingCarts",
            on: "_id", // ["<localField>", "<foreingField>"]
            whenMatched: "merge",
            whenNotMatched: "fail"
        }
    }
]);

printjson(output.toArray())