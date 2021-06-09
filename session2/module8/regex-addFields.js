db = db.getSiblingDB("tienda");

const output = db.products.aggregate([
    {
        $addFields: {
            meta: {
                $regexFind: {
                    input: "$description",
                    regex: /^([\w\-]+)\s+([\w\-]+)\s+(\d+)\s+[^\d]+(\d+)\.(\d+)/
                }
            }
        }
    },
    {
        $addFields: {
            "model": { $arrayElemAt: ["$meta.captures", 0] },
            "brand": { $arrayElemAt: ["$meta.captures", 1] },
            "line": { $arrayElemAt: ["$meta.captures", 2] },
            "priceLeft": { $arrayElemAt: ["$meta.captures", 3] },
            "priceRight": { $arrayElemAt: ["$meta.captures", 4] },
        }
    },
    {
        $project: {
            // _id: 0,
            // description: 1,
            // meta: 1,
            model: 1,
            brand: 1,
            line: 1,
            priceLeft: 1,
            priceRight: 1,
        }
    },
    {
        $merge: {
            into: "products",
            on: "_id"
        }
    }
])

printjson(output.toArray())