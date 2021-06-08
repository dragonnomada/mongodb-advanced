// https://docs.mongodb.com/manual/reference/operator/aggregation/

// Operadores de acumulación
// https://docs.mongodb.com/manual/reference/operator/aggregation/#std-label-agg-operators-group-accumulators

db = db.getSiblingDB("tienda");

/* 
$bucket: {
    groupBy: <field>
    boundaries: <array>
    default: <value>
    output: {
        <newField>: <$accumulator expression>
    }
}
*/

const output = db.products.aggregate([
    {
        $bucket: {
            groupBy: "$price",
            boundaries: [0, 5, 10, 15, 20, 25, 30, 50, 100, 150, 200, 1000],
            default: -1,
            output: {
                products: { $push: { name: "$name", price: "$price", existances: "$existances" } },
                priceAvg: { $avg: "$price" },
                existanceAvg: { $avg: "$existances" },
                count: { $sum: 1 },
            }
        }
    }
]);

printjson(output.next());