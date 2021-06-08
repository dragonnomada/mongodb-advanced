// https://docs.mongodb.com/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge

db = db.getSiblingDB("tienda");

/*
$out: { 
    db: "<output-db>"
    coll: "<output-collection>" 
}
*/

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const weekday = date.getDay();

const monthLabels = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const output = db.products.aggregate([
    {
        $match: {
            existances: 0
        }
    },
    {
        $addFields: {
            weekDay: weekday
        }
    },
    {
        $project: {
            description: 0,
            price: 0,
            price_unit: 0
        }
    },
    // {
    //     $count: "total"
    // }
    {
        $out: `productsOff_${year}_${monthLabels[month]}_${day}`
    }
]);

printjson(output.toArray());