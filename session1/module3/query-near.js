// https://docs.mongodb.com/manual/reference/operator/query/near/#mongodb-query-op.-near

db = db.getSiblingDB("tienda");

const places = db.places.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-99.6068417, 19.257367]
            },
            $maxDistance: 500,
            $minDistance: 0
        }
    }
}, { _id: 0 }).toArray();

printjson(places);

// 19.257367, -99.6068417