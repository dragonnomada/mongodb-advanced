db = db.getSiblingDB("tienda");

db.shoppingCarts.updateMany({}, [
    {
        $set: {
            "user.updateAt": new Date()
        }
    }
])