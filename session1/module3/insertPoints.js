db = db.getSiblingDB("tienda");

db.places.insertMany([
    {
        name: "Plaza 1",
        location: {
            type: "Point",
            coordinates: [-99.580395, 19.221843]
        }
    },
    {
        name: "Plaza 2",
        location: {
            type: "Point",
            coordinates: [-99.596360, 19.255392]
        }
    },
    {
        name: "Plaza 3",
        location: {
            type: "Point",
            coordinates: [-99.600233, 19.258025]
        }
    },
    {
        name: "Plaza 4",
        location: {
            type: "Point",
            coordinates: [-99.604653, 19.257367]
        }
    },
]);

db.places.createIndex({ "location": "2dsphere" });

// 19.257367, -99.6068417