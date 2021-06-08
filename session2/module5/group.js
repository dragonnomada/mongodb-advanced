// https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count

db = db.getSiblingDB("tienda");

/*
$group: {
    _id: <expression>
    <newField>: <$accumulator expression>
}
*/

const output = db.shoppingCarts.aggregate([
    {
        $group: {
            _id: "$user._id",
            user: { $first: "$user" },
            shoppingCarts: { $push: { total: "$total", productsCount: "$productsCount" } },
            totalGlobal: { $sum: "$total" },
            totalAvgGlobal: { $avg: "$total" },
            totalMinGlobal: { $min: "$total" },
            totalMaxGlobal: { $max: "$total" },
            count: { $sum: 1 }
        }
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.next());