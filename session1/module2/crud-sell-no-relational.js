db = db.getSiblingDB("tienda");

// db.<coll>.<method>(...<params>) -> TRANSACCIÓN

// QUERY(READ) -> CURSOR (it)
// BULK(WRITE) -> RESULT (doc)

function getRandomUser() {
    const totalUsers = db.users.count();

    // const cursor = db.users.find();
    // cursor.limit(1)
    // cursor.sort(...)
    // const doc = cursor.next(); 
    // const docs = cursor.toArray();

    return db.users.find().limit(1).skip(Math.floor(Math.random() * (totalUsers - 2))).next();
}

function getRandomProduct() {
    const totalProducts = db.products.count();
    return db.products.find().limit(1).skip(Math.floor(Math.random() * (totalProducts - 2))).next();
}

function getRandomProductList(min = 1, max = 20) {
    const totalProductsShopping = Math.floor(Math.random() * (max - min) + min);

    const products = [];

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

function updateShoppingCart(shoppingCart) {
    db.shoppingCarts.updateOne({ _id: shoppingCart._id }, {
        $set: shoppingCart
    });

    return db.shoppingCarts.findOne({ _id: shoppingCart._id });
}


function updateShoppingCartTotal(shoppingCart) {
    const total = shoppingCart.products.reduce((total, product) => total + product.price, 0);
    shoppingCart.total = total;
    shoppingCart.productsCount = shoppingCart.products.length;
    return updateShoppingCart(shoppingCart);
}

for (let i = 0; i < 600; i++) {
    let shoppingCart = openShoppingCart(`shopping-cart-${i}`);

    printjson(shoppingCart);

    if (!shoppingCart.user) {
        shoppingCart.user = getRandomUser();
        shoppingCart = updateShoppingCart(shoppingCart);
        print(`El usuario del carrito ha sido asignado`);
        printjson(shoppingCart);
    }

    // No hay productos en el carrito
    if (shoppingCart.products.length === 0) {
        shoppingCart.products = getRandomProductList();
        shoppingCart = updateShoppingCart(shoppingCart);
        print(`Se han agregado productos al carrito`);
        printjson(shoppingCart);
    }

    shoppingCart = updateShoppingCartTotal(shoppingCart);
    print(`Se ha actualizado el total del carrito`);
    printjson(shoppingCart);
}