// https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#mongodb-pipeline-pipe.-unwind

db = db.getSiblingDB("tienda");

/*
{ $unwind: <path to field type array> }

{
  $unwind:
    {
      path: <path to field type array>,
      includeArrayIndex: <string>,
      preserveNullAndEmptyArrays: <boolean>
    }
}
*/

const output = db.shoppingCarts.aggregate([
    {
        $unwind: "$products"
    },
    {
      $group: {
        _id: "$_id",
        productMinPrice: {
          $min: "$products.price"
        },
        productMaxPrice: {
          $max: "$products.price"
        },
      }
    },
    {
      $addFields: {
        productDiffPrice: { $subtract: ["$productMaxPrice", "$productMinPrice"] }
      }
    }
])

printjson(output.next())
printjson(output.next())
printjson(output.next())