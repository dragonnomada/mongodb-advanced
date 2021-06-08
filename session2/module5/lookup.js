// https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup

db = db.getSiblingDB("tienda");

/*
$lookup: {
    from: <collection>,
    localField: <field inside>,
    foreignField: <field outside>,
    as: <field array>
}
*/

const output = db.shoppingCarts.aggregate([
    {
        $match: {
            "user._id": ObjectId("60be588488d829ccbe7c6649")
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "user._id",
            foreignField: "_id",
            as: "users"
        }
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.next());