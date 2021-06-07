// https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne

// https://docs.mongodb.com/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset

db = db.getSiblingDB("tienda");

const filter = { name: { $regex: "Ana" } };
const update = {
    // $addFields
    $unset: {
        esAna: 1
    }
}

// const result = db.users.updateOne(filter, update);
const result = db.users.updateMany(filter, update);

printjson(result);