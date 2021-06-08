// https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot

db = db.getSiblingDB("tienda")

/*
$replaceRoot: { 
    newRoot: <replacementDocument> 
}
*/

const output = db.shoppingCarts.aggregate([
    {
        $addFields: { // { _id, user: {}, products: [], total, productsCount }
            fistProduct: { $first: "$products" },
            lastProduct: { $last: "$products" },
        } // { _id, user: {}, products: [], total, productsCount, firstProduct: {}, lastProduct: {} }
    },
    {
        $project: { // { _id, user: {}, products: [], total, productsCount, firstProduct: { _id, name, price, ... }, lastProduct: {} }
            "firstProduct._id": 0,
            "lastProduct._id": 0,
        } // { _id, user: {}, products: [], total, productsCount, firstProduct: { name, price, ... }, lastProduct: {} }
    },
    {
        $addFields: { // { _id, user: {}, products: [], total, productsCount, firstProduct: { name, price, ... }, lastProduct: {} }
            "firstProduct.shoppingCartId": "$_id",
            "lastProduct.shoppingCartId": "$_id"
            // "lastProduct._id": "$_id"
        } // { _id, user: {}, products: [], total, productsCount, firstProduct: { name, price, ..., shoppingCartId }, lastProduct: {} }
    },
    {
        $replaceRoot: { // { _id, user: {}, products: [], total, productsCount, firstProduct: { name, price, ..., shoppingCartId }, lastProduct: {} }
            newRoot: "$lastProduct"
        } // { name, price, ..., shoppingCartId }
    }
])

printjson(output.next())
printjson(output.next())
printjson(output.next())