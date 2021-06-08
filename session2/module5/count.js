// https://docs.mongodb.com/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count

db = db.getSiblingDB("tienda");

// $count: <newField>

const output = db.products.aggregate([
    {
        $count: "total"
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.toArray());