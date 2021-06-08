// https://docs.mongodb.com/manual/reference/operator/aggregation/

db = db.getSiblingDB("tienda");

// $addFields: { <newField|replaceField>: <expression> }

// <expression> { $sum: <array> } | { $min: <array> } | { $avg: <array> } | <value> | ...

// $products [{ ... }, { ... }, { ... }, ...]
// $products.existances -> [15, 42, 41, 77, ...]

const output = db.shoppingCarts.aggregate([
    { // Stage 1 { _id, user, products, total, productsCount }
        $addFields: {
            minExistances: { $min: "$products.existances" }
        }
    },
    { // Stage 2 { _id, user, products, total, productsCount, minExistances }
        $addFields: {
            hasProductOff: { $eq: ["$minExistances", 0] }
        }
    },
    { // Stage 3 { _id, user, products, total, productsCount, minExistances, hasProductOff, priceAvg }
        $addFields: {
            priceAvg: { $avg: "$products.price" }
        }
    }
]);

// Stage Output { _id, user, products, total, productsCount, minExistances, hasProductOff, priceAvg }

let i = 0;
while (i < 20 && output.hasNext()) {
    const doc = output.next();
    printjson(doc);
    i++;
}