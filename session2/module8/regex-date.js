db = db.getSiblingDB("tienda");

const output = db.shoppingCarts.aggregate([
    {
        $addFields: {
            userUpdateAt: {
                $dateToString: {
                    date: "$user.updateAt",
                }
            }
        }
    },
    {
        $addFields: {
            updateAtMeta: {
                $regexFind: {
                    input: "$userUpdateAt",
                    regex: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
                }
            }
        }
    },
    {
        $addFields: {
            "user.updateAt.year": { $arrayElemAt: ["$updateAtMeta.captures", 0] },
            "user.updateAt.month": { $arrayElemAt: ["$updateAtMeta.captures", 1] },
            "user.updateAt.day": { $arrayElemAt: ["$updateAtMeta.captures", 2] },
            "user.updateAt.hour": { $arrayElemAt: ["$updateAtMeta.captures", 3] },
            "user.updateAt.minute": { $arrayElemAt: ["$updateAtMeta.captures", 4] },
            "user.updateAt.seconds": { $arrayElemAt: ["$updateAtMeta.captures", 5] },
        }
    },
    {
        $unset: ["products", "updateAtMeta", "userUpdateAt"]
    }
])

printjson(output.next())