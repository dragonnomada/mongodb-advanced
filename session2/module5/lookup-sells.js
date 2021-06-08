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

const output = db.sells_meta.aggregate([
    {
        $lookup: {
            from: "sells",
            localField: "sellId",
            foreignField: "sellId",
            as: "sales"
        }
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.next());