// https://docs.mongodb.com/manual/text-search/

db = db.getSiblingDB("tienda");

db.products.createIndex({ description: "text" });
// db.products.createIndex({ name: "text", description: "text" });

// <query> $text
// { $text: { $search: <text> } }

const products = db.products.find({
    $text: { $search: "Playera nike" }
}, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).toArray();

print(`Se encontraron ${products.length} productos con "nike" en la descripción`);

printjson(products.slice(0, 3));