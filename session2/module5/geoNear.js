// https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#mongodb-pipeline-pipe.-geoNear

db = db.getSiblingDB("tienda");

/* 
$geoNear: {
    near: <geoJSON point>
    distanceField: <path/newField calculated-value>
    minDistance: <value>
    maxDistance: <value meters>
    query: <filter>
    includeLocs: <path/newField calculated-location>
}
*/

const output = db.places.aggregate([
    {
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [-99.6068417, 19.257367]
            },
            distanceField: "distance",
            // distanceField: "meta.distance",
            // includeLocs: "meta.location",
            maxDistance: 2000
        }
    }
]);

// print(`Se han encontrado ${output.count()} lugares cercanos`);
printjson(output.toArray());