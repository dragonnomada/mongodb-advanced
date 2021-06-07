db = db.getSiblingDB("tienda");

function getRandomUser() {
    const totalUsers = db.users.count();
    return db.users.find().limit(1).skip(Math.floor(Math.random() * (totalUsers - 1))).next();
}

function getRandomProduct() {
    const totalProducts = db.products.count();
    return db.products.find().limit(1).skip(Math.floor(Math.random() * (totalProducts - 1))).next();
}

function getRandomProductList(min = 1, max = 20) {
    const totalProductsShopping = Math.floor(Math.random() * (max - min) + min);

    const products = []

    for (let i = 0; i < totalProductsShopping; i++) {
        const product = getRandomProduct();
        products.push(product);
    }

    return products;
}

// collection: shopping-carts
// schema: { _id, user, products, total }

function openShoppingCart(_id) {
    const shoppingCart = db.shoppingCarts.findOne({ _id });

    if (!shoppingCart) {
        const shoppingCartDefault = {
            _id,
            user: null,
            products: [],
            total: 0
        };

        try {
            const result = db.shoppingCarts.insertOne(shoppingCartDefault);
            print(`El carrito ${result.insertedId} ha sido creado`);
        } catch (error) {
            print(`Falló al crear el carrito ${_id}: ${error}`);
        }

        return db.shoppingCarts.findOne({ _id });
    }

    return shoppingCart;
}  

let shoppingCart = openShoppingCart("123");

printjson(shoppingCart);

function updateShoppingCart(shoppingCart) {
    db.shoppingCarts.updateOne({ _id: shoppingCart._id }, {
        $set: shoppingCart
    });

    return db.shoppingCarts.findOne({ _id: shoppingCart._id });
}

if (!shoppingCart.user) {
    shoppingCart.user = getRandomUser();
    shoppingCart = updateShoppingCart(shoppingCart);
}

printjson(shoppingCart);