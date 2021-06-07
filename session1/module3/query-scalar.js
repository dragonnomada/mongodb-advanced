// https://docs.mongodb.com/manual/tutorial/query-documents/

db = db.getSiblingDB("tienda");

// db.<collection>.find(<query>, <projection>)

// <query> [scalar]
// { <field>: <operator> | <value> }

// <operator>
// { $gt: <value> }
// { $gte: <value> }
// { $lt: <value> }
// { $lte: <value> }
// { $eq: <value> }
// { $neq: <value> }
// ... https://docs.mongodb.com/manual/reference/operator/query/

// <projection>
// { <field>: 1 } -- activa/muestra
// { <field>: 0 } -- desactiva/oculta

// <collection> products
// <field> existances
// { $lte: <value> } 10
const productsLimited = db.products.find({ existances: { $lte: 10, $gt: 0 } }, { _id: 0, name: 1, price: 1, existances: 1 }).toArray();

const priceAvgLimited = productsLimited.reduce((total, product) => total + product.price, 0) / productsLimited.length;

print(`Se encontraron ${productsLimited.length} productos próximos a agotarse (Precio medio: $${priceAvgLimited})`);
// printjson(productsLimited);

const productsLock = db.products.find({ existances: 0 }, { _id: 0, name: 1, price: 1, existances: 1 }).toArray();
// const productsLock = db.products.find({ existances: { $eq: 0 } }, { _id: 0, name: 1, price: 1, existances: 1 }).toArray();

const priceAvgLock = productsLock.reduce((total, product) => total + product.price, 0) / productsLock.length;

print(`Se encontraron ${productsLock.length} productos agotados (Precio medio: $${priceAvgLock})`);
// printjson(productsLock);

