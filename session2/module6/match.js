// https://docs.mongodb.com/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match

db = db.getSiblingDB("tienda");

/* 
$match: <query>

<query>
{
    <field>: <value> -- { $eq: ["$field", <value>]
}

{
    <field>: <expression>

    <expression> { <field>: { $gt: <value>, $lt: <value> } }
    <expression> { <field>: { $regex: <regex>, $options: <flags> } }
    <expression> { <field>: { $in: [<value1>, <value2>, ...] } }
    <expression> { <field>: { $nin: [<value1>, <value2>, ...] } }
    <expression> { <field>: { $exists: 1|0 } }
    
    -- Arrays
    <expression> { <field array>: { $all: [<value1>, <value2>, ...] } }
    // https://docs.mongodb.com/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch
    <expression> { <field array>: { $elemMatch: { <subField>: <expression> } } }
    // https://docs.mongodb.com/manual/reference/operator/query/all/#use--all-with--elemmatch
    <expression> { <field array>: { $all: [{ $elemMatch: { <subField>: <expression> } }] } }

    -- Objects
    // path: user.name | address.location.tag
    <expression> { <field object | path>: <value> | <expression> }
}

{
    $or: [
        { <field1>: <expression2> },
        { <field2>: <expression2> },
        ...
    ]
}

{
    $and: [
        { <field1>: <expression2> },
        { <field2>: <expression2> },
        ...
    ]
}

{
    <field>: { $not: <expression> }
}


*/

const output = db.shoppingCarts.aggregate([
    {
        $match: {
            products: {
                $all: [ // Algún producto que cumple todas las condiciones
                    { $elemMatch: { price: { $gte: 50, $lt: 100 } } },
                    { $elemMatch: { existances: { $gt: 98 } } },
                ]
            }
        }
    },
    // {
    //     $count: "total"
    // }
]);

printjson(output.next())
