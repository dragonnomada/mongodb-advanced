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
    { // products: [ {} ]
        $unwind: "$products"
    }, // { products: {} }
    {
      $group: { // _id, user, products: {}, total, productsCount, ...
        _id: "$products._id",
        productName: { $first: "$products.name" },
        shoppingCarts: {
          $push: { shoppingCartId: "$_id", total: "$total" }
        },
        shoppingCartsCount: { $sum: 1 },
        shoppingCartsPriceTotal: { $sum: "$total" },
      }
    },
    {
      $out: "productsInShoppingCarts"
    }
])

// printjson(output.next())
// printjson(output.next())
// printjson(output.next())