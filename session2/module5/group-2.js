// https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count

db = db.getSiblingDB("tienda");

const output = db.shoppingCarts.aggregate([
    {
        $bucket: {
            groupBy: "$total",
            boundaries: [0, 500, 1000, 1500, 2000, 2500],
            output: {
                shoppingCarts: { 
                    $push: { 
                        user_id: "$user._id",
                        total: "$total",
                        productsCount: "$productsCount",
                        priceAvg: { $avg: "$products.price" }
                    } 
                },
            }
        }
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.next());