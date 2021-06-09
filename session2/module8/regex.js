db = db.getSiblingDB("tienda");

const output = db.products.aggregate([
    // {
    //     $match: {
    //         description: { $regex: "Playera\\s+[\\w\\-]+\\s+\\d{2}\\s" }
    //     }
    // },
    // {
    //     $match: {
    //         description: { $regex: "sólo\\s+\\d{3}\\." }
    //     }
    // },
    {
        $match: {
            description: { $regex: "sólo\\s+15\\d\\." }
        }
    },
    {
        $project: {
            _id: 0,
            description: 1
        }
    }
])

printjson(output.toArray())