db = db.getSiblingDB("tienda");

// Seleccionar un usuario aleatorio
const totalUsers = db.users.count();

print(`Total de usuarios: ${totalUsers}`);

const user = db.users.find().limit(1).skip(Math.floor(Math.random() * (totalUsers - 1))).next();

printjson(user);

// Seleccionar entre 1 y 20 productos aleatorios 
// * para simular que el usuario los quiere comprar
function getRandomProduct() {
    const totalProducts = db.products.count();
    return db.products.find().limit(1).skip(Math.floor(Math.random() * (totalProducts - 1))).next();
}

const totalProductsShopping = Math.floor(Math.random() * 19 + 1); // 1-20

const products = []

// for (<initilizer>; <condition>; <increment>) { ... }
for (let i = 0; i < totalProductsShopping; i++) {
    const product = getRandomProduct();
    products.push(product);
}

print(`El usuario ${user.name} ${user.lastname} quiere comprar ${products.length} (${totalProductsShopping}) productos:`);
printjson(products);

// collection: sells
// schema: { sellId, userId, productId, sellAt, rating }

const sellId = Math.random().toString(32).slice(2); // abc234j456f (11 caracteres)

// collection: sells_meta
// schema: { sellId, userId, user_name, user_lastname, totalProductsShopping, totalPrice }

db.sells_meta.insertOne({
    sellId,
    userId: user._id,
    user_name: user.name,
    user_lastname: user.lastname,
    totalProductsShopping,
    totalPrice: products.reduce((total, product) => total + product.price, 0)
});

// for (let <item> of <array>) { ... }
for (let product of products) {
    const sell = {
        sellId,
        userId: user._id,
        productId: product._id,
        price: product.price,
        sellAt: new Date().toISOString(),
        ranting: Math.floor(Math.random() * 5)
    };

    const result = db.sells.insertOne(sell);
    printjson(result);
}

