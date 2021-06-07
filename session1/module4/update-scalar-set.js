// https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne

// https://docs.mongodb.com/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set

db = db.getSiblingDB("tienda");

const filter = { name: { $regex: "Ana" } };
const update = {
    // $addFields
    $set: {
        esAna: true,
        updateAt: new Date()
    }
}

// const result = db.users.updateOne(filter, update);
const result = db.users.updateMany(filter, update);

printjson(result);