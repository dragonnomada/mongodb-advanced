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
    // {
    //     $unwind: "$products"
    // }
    {
        $unwind: {
            path: "$products",
            includeArrayIndex: "productIndex"
        }
    },
    {
      $sort: {
        "products.price": -1
      }
    }
])

printjson(output.next())
printjson(output.next())
printjson(output.next())